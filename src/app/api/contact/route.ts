import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validation";

// Docs/09_TECHNICAL_ARCHITECTURE.md #3: contact submission is dynamic, not
// statically cached. Docs/05 §43-44: ContactSubmission { status: NEW, ... }.
export async function POST(request: NextRequest) {
  const json = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  const { name, email, subject, message } = parsed.data;

  await prisma.contactSubmission.create({
    data: {
      name,
      email,
      subject: subject || null,
      message,
    },
  });

  return NextResponse.json({ ok: true });
}
