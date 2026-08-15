"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import type { ApplicationStatus, ContactStatus } from "@prisma/client";

// Docs/06_ADMIN_PANEL.md #38, #41: admin can change ContactSubmission and
// JoinApplication status. Guarded server-side (not just by middleware) so
// these actions are never callable without a valid admin session even if
// invoked directly.
export async function updateContactStatus(id: string, status: ContactStatus) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.contactSubmission.update({
    where: { id },
    data: { status, reviewedAt: status === "REVIEWED" ? new Date() : undefined },
  });
  revalidatePath("/admin/messages");
}

export async function updateApplicationStatus(id: string, status: ApplicationStatus) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.joinApplication.update({ where: { id }, data: { status } });
  revalidatePath("/admin/applications");
}
