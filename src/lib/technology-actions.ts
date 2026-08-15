"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/slug";
import type { FormState } from "@/lib/member-actions";

async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
}

function parse(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const rawSlug = String(formData.get("slug") ?? "").trim();
  return {
    name,
    slug: slugify(rawSlug || name),
    descriptionEn: String(formData.get("descriptionEn") ?? "").trim() || null,
    descriptionFa: String(formData.get("descriptionFa") ?? "").trim() || null,
    category: String(formData.get("category") ?? "").trim() || null,
    websiteUrl: String(formData.get("websiteUrl") ?? "").trim() || null,
    order: Number(formData.get("order") ?? 0) || 0,
    isPublished: formData.get("isPublished") === "on",
  };
}

export async function createTechnology(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const data = parse(formData);
  if (!data.name || !data.slug) return { error: "Name is required." };

  try {
    await prisma.technology.create({ data });
    revalidatePath("/admin/technologies");
  } catch (err: any) {
    if (err?.code === "P2002") return { error: "A technology with this slug already exists." };
    return { error: "Failed to save technology." };
  }
  redirect("/admin/technologies?saved=Technology created.");
}

export async function updateTechnology(id: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const data = parse(formData);
  if (!data.name || !data.slug) return { error: "Name is required." };

  try {
    await prisma.technology.update({ where: { id }, data });
    revalidatePath("/admin/technologies");
  } catch (err: any) {
    if (err?.code === "P2002") return { error: "A technology with this slug already exists." };
    return { error: "Failed to save technology." };
  }
  return { error: undefined };
}

export async function deleteTechnology(id: string) {
  await requireAdmin();
  await prisma.technology.delete({ where: { id } });
  revalidatePath("/admin/technologies");
  redirect("/admin/technologies");
}
