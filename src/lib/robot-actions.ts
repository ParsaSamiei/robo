"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/slug";
import type { RobotStatus, PublicationStatus } from "@prisma/client";
import type { FormState } from "@/lib/member-actions";

// Docs/06_ADMIN_PANEL.md #22: robot form fields. Competitions/Gallery
// relations deferred -- same pattern as Project (see README).
async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}

function parseRobotForm(formData: FormData) {
  const memberIds = formData.getAll("memberIds").map(String);
  const technologyIds = formData.getAll("technologyIds").map(String);
  const projectIds = formData.getAll("projectIds").map(String);
  const mediaIds = formData.getAll("mediaIds").map(String);

  return {
    nameEn: String(formData.get("nameEn") ?? "").trim(),
    nameFa: String(formData.get("nameFa") ?? "").trim() || null,
    slug: slugify(String(formData.get("slug") ?? formData.get("nameEn") ?? "")),
    descriptionEn: String(formData.get("descriptionEn") ?? "").trim() || null,
    descriptionFa: String(formData.get("descriptionFa") ?? "").trim() || null,
    contentEn: String(formData.get("contentEn") ?? "").trim() || null,
    contentFa: String(formData.get("contentFa") ?? "").trim() || null,
    status: String(formData.get("status") ?? "DEVELOPMENT") as RobotStatus,
    publicationStatus: String(formData.get("publicationStatus") ?? "DRAFT") as PublicationStatus,
    memberIds,
    technologyIds,
    projectIds,
    mediaIds,
  };
}

export async function createRobot(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const data = parseRobotForm(formData);
  if (!data.nameEn || !data.slug) return { error: "Name is required." };

  try {
    const robot = await prisma.robot.create({
      data: {
        nameEn: data.nameEn,
        nameFa: data.nameFa,
        slug: data.slug,
        descriptionEn: data.descriptionEn,
        descriptionFa: data.descriptionFa,
        contentEn: data.contentEn,
        contentFa: data.contentFa,
        status: data.status,
        publicationStatus: data.publicationStatus,
        publishedAt: data.publicationStatus === "PUBLISHED" ? new Date() : null,
        members: { create: data.memberIds.map((memberId) => ({ memberId })) },
        technologies: { create: data.technologyIds.map((technologyId) => ({ technologyId })) },
        projects: { create: data.projectIds.map((projectId) => ({ projectId })) },
        media: { create: data.mediaIds.map((mediaId, order) => ({ mediaId, order })) },
      },
    });
    revalidatePath("/admin/robots");
    revalidatePath("/work/robots");
    redirect(`/admin/robots/${robot.id}/edit?saved=Robot created.`);
  } catch (err: any) {
    if (err?.code === "P2002") return { error: "A robot with this slug already exists." };
    if (err?.digest?.startsWith("NEXT_REDIRECT")) throw err;
    return { error: "Failed to save robot." };
  }
}

export async function updateRobot(id: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const data = parseRobotForm(formData);
  if (!data.nameEn || !data.slug) return { error: "Name is required." };

  try {
    const existing = await prisma.robot.findUnique({ where: { id }, select: { publicationStatus: true, publishedAt: true } });
    const newlyPublished = data.publicationStatus === "PUBLISHED" && existing?.publicationStatus !== "PUBLISHED";

    await prisma.$transaction([
      prisma.robotMember.deleteMany({ where: { robotId: id } }),
      prisma.robotTechnology.deleteMany({ where: { robotId: id } }),
      prisma.robotProject.deleteMany({ where: { robotId: id } }),
      prisma.robotMedia.deleteMany({ where: { robotId: id } }),
      prisma.robot.update({
        where: { id },
        data: {
          nameEn: data.nameEn,
          nameFa: data.nameFa,
          slug: data.slug,
          descriptionEn: data.descriptionEn,
          descriptionFa: data.descriptionFa,
          contentEn: data.contentEn,
          contentFa: data.contentFa,
          status: data.status,
          publicationStatus: data.publicationStatus,
          publishedAt: newlyPublished ? new Date() : existing?.publishedAt,
          members: { create: data.memberIds.map((memberId) => ({ memberId })) },
          technologies: { create: data.technologyIds.map((technologyId) => ({ technologyId })) },
          projects: { create: data.projectIds.map((projectId) => ({ projectId })) },
          media: { create: data.mediaIds.map((mediaId, order) => ({ mediaId, order })) },
        },
      }),
    ]);
    revalidatePath("/admin/robots");
    revalidatePath(`/work/robots/${data.slug}`);
  } catch (err: any) {
    if (err?.code === "P2002") return { error: "A robot with this slug already exists." };
    return { error: "Failed to save robot." };
  }

  return { error: undefined };
}

export async function deleteRobot(id: string) {
  await requireAdmin();
  await prisma.robot.delete({ where: { id } });
  revalidatePath("/admin/robots");
  redirect("/admin/robots");
}
