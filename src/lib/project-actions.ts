"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/slug";
import type { ProjectStatus, PublicationStatus } from "@prisma/client";
import type { FormState } from "@/lib/member-actions";

// Docs/06_ADMIN_PANEL.md #20-21: project form fields. Robots/Competitions/
// Media/SEO relations are viewable on the list but not yet editable here --
// see README; Members and Technologies (the two most-used relations) are
// fully wired.
async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}

function parseProjectForm(formData: FormData) {
  const memberIds = formData.getAll("memberIds").map(String);
  const technologyIds = formData.getAll("technologyIds").map(String);
  const mediaIds = formData.getAll("mediaIds").map(String);

  return {
    titleEn: String(formData.get("titleEn") ?? "").trim(),
    titleFa: String(formData.get("titleFa") ?? "").trim() || null,
    slug: slugify(String(formData.get("slug") ?? formData.get("titleEn") ?? "")),
    excerptEn: String(formData.get("excerptEn") ?? "").trim() || null,
    excerptFa: String(formData.get("excerptFa") ?? "").trim() || null,
    contentEn: String(formData.get("contentEn") ?? "").trim() || null,
    contentFa: String(formData.get("contentFa") ?? "").trim() || null,
    status: String(formData.get("status") ?? "ACTIVE") as ProjectStatus,
    githubUrl: String(formData.get("githubUrl") ?? "").trim() || null,
    ogImageId: String(formData.get("ogImageId") ?? "").trim() || null,
    publicationStatus: String(formData.get("publicationStatus") ?? "DRAFT") as PublicationStatus,
    memberIds,
    technologyIds,
    mediaIds,
  };
}

export async function createProject(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const data = parseProjectForm(formData);

  if (!data.titleEn || !data.slug) return { error: "Title is required." };

  try {
    const project = await prisma.project.create({
      data: {
        titleEn: data.titleEn,
        titleFa: data.titleFa,
        slug: data.slug,
        excerptEn: data.excerptEn,
        excerptFa: data.excerptFa,
        contentEn: data.contentEn,
        contentFa: data.contentFa,
        status: data.status,
        githubUrl: data.githubUrl,
        ogImageId: data.ogImageId,
        publicationStatus: data.publicationStatus,
        publishedAt: data.publicationStatus === "PUBLISHED" ? new Date() : null,
        members: { create: data.memberIds.map((memberId) => ({ memberId })) },
        technologies: { create: data.technologyIds.map((technologyId) => ({ technologyId })) },
        media: { create: data.mediaIds.map((mediaId, order) => ({ mediaId, order })) },
      },
    });
    revalidatePath("/admin/projects");
    revalidatePath("/work/projects");
    redirect(`/admin/projects/${project.id}/edit?saved=Project created.`);
  } catch (err: any) {
    if (err?.code === "P2002") return { error: "A project with this slug already exists." };
    if (err?.digest?.startsWith("NEXT_REDIRECT")) throw err;
    return { error: "Failed to save project." };
  }
}

export async function updateProject(id: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const data = parseProjectForm(formData);

  if (!data.titleEn || !data.slug) return { error: "Title is required." };

  try {
    const existing = await prisma.project.findUnique({ where: { id }, select: { publicationStatus: true, publishedAt: true } });
    const newlyPublished = data.publicationStatus === "PUBLISHED" && existing?.publicationStatus !== "PUBLISHED";

    await prisma.$transaction([
      prisma.projectMember.deleteMany({ where: { projectId: id } }),
      prisma.projectTechnology.deleteMany({ where: { projectId: id } }),
      prisma.projectMedia.deleteMany({ where: { projectId: id } }),
      prisma.project.update({
        where: { id },
        data: {
          titleEn: data.titleEn,
          titleFa: data.titleFa,
          slug: data.slug,
          excerptEn: data.excerptEn,
          excerptFa: data.excerptFa,
          contentEn: data.contentEn,
          contentFa: data.contentFa,
          status: data.status,
          githubUrl: data.githubUrl,
          ogImageId: data.ogImageId,
          publicationStatus: data.publicationStatus,
          publishedAt: newlyPublished ? new Date() : existing?.publishedAt,
          members: { create: data.memberIds.map((memberId) => ({ memberId })) },
          technologies: { create: data.technologyIds.map((technologyId) => ({ technologyId })) },
          media: { create: data.mediaIds.map((mediaId, order) => ({ mediaId, order })) },
        },
      }),
    ]);
    revalidatePath("/admin/projects");
    revalidatePath(`/work/projects/${data.slug}`);
  } catch (err: any) {
    if (err?.code === "P2002") return { error: "A project with this slug already exists." };
    return { error: "Failed to save project." };
  }

  return { error: undefined };
}

export async function deleteProject(id: string) {
  await requireAdmin();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}
