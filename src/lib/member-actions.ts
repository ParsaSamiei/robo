"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/slug";
import type { MembershipStatus } from "@prisma/client";

// Docs/06_ADMIN_PANEL.md #17-19, §48-49: member create/edit form fields,
// human-readable duplicate-slug error, auto-suggested slug.
export type FormState = { error?: string } | undefined;

async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}

function parseMemberForm(formData: FormData) {
  const departmentIds = formData.getAll("departmentIds").map(String);
  const technologyIds = formData.getAll("technologyIds").map(String);

  return {
    name: String(formData.get("name") ?? "").trim(),
    slug: slugify(String(formData.get("slug") ?? formData.get("name") ?? "")),
    roleEn: String(formData.get("roleEn") ?? "").trim() || null,
    roleFa: String(formData.get("roleFa") ?? "").trim() || null,
    bioEn: String(formData.get("bioEn") ?? "").trim() || null,
    bioFa: String(formData.get("bioFa") ?? "").trim() || null,
    educationEn: String(formData.get("educationEn") ?? "").trim() || null,
    educationFa: String(formData.get("educationFa") ?? "").trim() || null,
    githubUrl: String(formData.get("githubUrl") ?? "").trim() || null,
    personalWebsiteUrl: String(formData.get("personalWebsiteUrl") ?? "").trim() || null,
    membershipStatus: (String(formData.get("membershipStatus") ?? "CURRENT") as MembershipStatus),
    isPublished: formData.get("isPublished") === "on",
    photoId: String(formData.get("photoId") ?? "").trim() || null,
    departmentIds,
    technologyIds,
  };
}

export async function createMember(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const data = parseMemberForm(formData);

  if (!data.name || !data.slug) {
    return { error: "Name is required." };
  }

  try {
    const member = await prisma.member.create({
      data: {
        name: data.name,
        slug: data.slug,
        roleEn: data.roleEn,
        roleFa: data.roleFa,
        bioEn: data.bioEn,
        bioFa: data.bioFa,
        educationEn: data.educationEn,
        educationFa: data.educationFa,
        githubUrl: data.githubUrl,
        personalWebsiteUrl: data.personalWebsiteUrl,
        membershipStatus: data.membershipStatus,
        isPublished: data.isPublished,
        photoId: data.photoId,
        departments: { create: data.departmentIds.map((departmentId) => ({ departmentId })) },
        technologies: { create: data.technologyIds.map((technologyId) => ({ technologyId })) },
      },
    });
    revalidatePath("/admin/members");
    revalidatePath("/team/current");
    revalidatePath("/team/alumni");
    redirect(`/admin/members/${member.id}/edit?saved=Member created.`);
  } catch (err: any) {
    // Docs/06 #48: human-readable, not raw Prisma error codes.
    if (err?.code === "P2002") return { error: "A member with this slug already exists." };
    if (err?.digest?.startsWith("NEXT_REDIRECT")) throw err;
    return { error: "Failed to save member." };
  }
}

export async function updateMember(id: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const data = parseMemberForm(formData);

  if (!data.name || !data.slug) {
    return { error: "Name is required." };
  }

  try {
    await prisma.$transaction([
      prisma.memberDepartment.deleteMany({ where: { memberId: id } }),
      prisma.memberTechnology.deleteMany({ where: { memberId: id } }),
      prisma.member.update({
        where: { id },
        data: {
          name: data.name,
          slug: data.slug,
          roleEn: data.roleEn,
          roleFa: data.roleFa,
          bioEn: data.bioEn,
          bioFa: data.bioFa,
          educationEn: data.educationEn,
          educationFa: data.educationFa,
          githubUrl: data.githubUrl,
          personalWebsiteUrl: data.personalWebsiteUrl,
          membershipStatus: data.membershipStatus,
          isPublished: data.isPublished,
          photoId: data.photoId,
          departments: { create: data.departmentIds.map((departmentId) => ({ departmentId })) },
          technologies: { create: data.technologyIds.map((technologyId) => ({ technologyId })) },
        },
      }),
    ]);
    revalidatePath("/admin/members");
    revalidatePath(`/team/members/${data.slug}`);
  } catch (err: any) {
    if (err?.code === "P2002") return { error: "A member with this slug already exists." };
    return { error: "Failed to save member." };
  }

  return { error: undefined };
}

export async function deleteMember(id: string) {
  await requireAdmin();
  await prisma.member.delete({ where: { id } });
  revalidatePath("/admin/members");
  redirect("/admin/members");
}
