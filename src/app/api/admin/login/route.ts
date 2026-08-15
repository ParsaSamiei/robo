import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyPassword, createSession, checkRateLimit, resetRateLimit } from "@/lib/auth";

const loginSchema = z.object({
  username: z.string().trim().min(1).max(100),
  password: z.string().min(1).max(200),
});

// Docs/06_ADMIN_PANEL.md #3-4: username/password auth, hashed passwords,
// rate-limited attempts, generic error message on failure (don't reveal
// whether the username exists).
export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Try again later." },
      { status: 429 }
    );
  }

  const json = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  const { username, password } = parsed.data;
  const admin = await prisma.admin.findUnique({ where: { username } });

  if (!admin || !(await verifyPassword(password, admin.passwordHash))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  resetRateLimit(ip);
  await createSession({ sub: admin.id, username: admin.username, role: admin.role });
  await prisma.admin.update({ where: { id: admin.id }, data: { lastLoginAt: new Date() } });

  return NextResponse.json({ ok: true });
}
