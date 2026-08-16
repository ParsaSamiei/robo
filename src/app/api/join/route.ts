import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { joinSchema } from "@/lib/validation";

// Docs/10_INFORMATION_ARCHITECTURE.md #54: v1 application status is simply
// SUBMITTED (mapped here to ApplicationStatus.NEW) then reviewed by admins.
// No resume upload (§53) by design -- applicants who want to share a resume
// are pointed to the club's phone number on the Join page instead.
export async function POST(request: NextRequest) {
  const json = await request.json().catch(() => null);
  const parsed = joinSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  const { name, email, educationEn, departmentId, messageEn, githubUrl, portfolioUrl } =
    parsed.data;

  await prisma.joinApplication.create({
    data: {
      name,
      email,
      educationEn: educationEn || null,
      departmentId: departmentId || null,
      messageEn: messageEn || null,
      githubUrl: githubUrl || null,
      portfolioUrl: portfolioUrl || null,
    },
  });

  return NextResponse.json({ ok: true });
}
