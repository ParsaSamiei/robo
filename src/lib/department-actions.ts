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
  const nameEn = String(formData.get("nameEn") ?? "").trim();
  const rawSlug = String(formData.get("slug") ?? "").trim();
  return {
    nameEn,
    nameFa: String(formData.get("nameFa") ?? "").trim(),
    slug: slugify(rawSlug || nameEn),
    descriptionEn: String(formData.get("descriptionEn") ?? "").trim() || null,
    descriptionFa: String(formData.get("descriptionFa") ?? "").trim() || null,
    order: Number(formData.get("order") ?? 0) || 0,
    isActive: formData.get("isActive") === "on",
  };
}

export async function createDepartment(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const data = parse(formData);
  if (!data.nameEn || !data.nameFa || !data.slug) return { error: "English name, Persian name, and slug are required." };

  try {
    await prisma.department.create({ data });
    revalidatePath("/admin/departments");
  } catch (err: any) {
    if (err?.code === "P2002") return { error: "A department with this slug already exists." };
    return { error: "Failed to save department." };
  }
  redirect("/admin/departments?saved=Department created.");
}

export async function updateDepartment(id: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const data = parse(formData);
  if (!data.nameEn || !data.nameFa || !data.slug) return { error: "English name, Persian name, and slug are required." };

  try {
    await prisma.department.update({ where: { id }, data });
    revalidatePath("/admin/departments");
  } catch (err: any) {
    if (err?.code === "P2002") return { error: "A department with this slug already exists." };
    return { error: "Failed to save department." };
  }
  return { error: undefined };
}

export async function deleteDepartment(id: string) {
  await requireAdmin();
  await prisma.department.delete({ where: { id } });
  revalidatePath("/admin/departments");
  redirect("/admin/departments");
}
