"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import type { FormState } from "@/lib/member-actions";

async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
}

function parseEvent(formData: FormData) {
  const dateValue = String(formData.get("date") ?? "").trim();
  return {
    titleEn: String(formData.get("titleEn") ?? "").trim(),
    titleFa: String(formData.get("titleFa") ?? "").trim() || null,
    descriptionEn: String(formData.get("descriptionEn") ?? "").trim() || null,
    descriptionFa: String(formData.get("descriptionFa") ?? "").trim() || null,
    date: dateValue ? new Date(dateValue) : null,
    mediaId: String(formData.get("mediaId") ?? "").trim() || null,
    order: Number(formData.get("order") ?? 0) || 0,
    isPublished: formData.get("isPublished") === "on",
  };
}

export async function createTimelineEvent(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const data = parseEvent(formData);
  if (!data.titleEn) return { error: "Title is required." };

  await prisma.timelineEvent.create({ data });
  revalidatePath("/admin/timeline");
  redirect("/admin/timeline?saved=Event created.");
}

export async function updateTimelineEvent(id: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const data = parseEvent(formData);
  if (!data.titleEn) return { error: "Title is required." };

  await prisma.timelineEvent.update({ where: { id }, data });
  revalidatePath("/admin/timeline");
  return { error: undefined };
}

export async function deleteTimelineEvent(id: string) {
  await requireAdmin();
  await prisma.timelineEvent.delete({ where: { id } });
  revalidatePath("/admin/timeline");
  redirect("/admin/timeline");
}
