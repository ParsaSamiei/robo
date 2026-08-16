"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/slug";
import type { PublicationStatus } from "@prisma/client";
import type { FormState } from "@/lib/member-actions";

// Docs/06_ADMIN_PANEL.md #23-24: competition form fields + inline
// Results/Awards management. Robots/Projects/Gallery relations deferred to
// a later pass -- README.
async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
}

function parseCompetition(formData: FormData) {
  const nameEn = String(formData.get("nameEn") ?? "").trim();
  const mediaIds = formData.getAll("mediaIds").map(String);
  return {
    nameEn,
    nameFa: String(formData.get("nameFa") ?? "").trim() || null,
    slug: slugify(String(formData.get("slug") ?? "").trim() || nameEn),
    organizationEn: String(formData.get("organizationEn") ?? "").trim() || null,
    leagueEn: String(formData.get("leagueEn") ?? "").trim() || null,
    year: formData.get("year") ? Number(formData.get("year")) : null,
    locationEn: String(formData.get("locationEn") ?? "").trim() || null,
    websiteUrl: String(formData.get("websiteUrl") ?? "").trim() || null,
    startDate: formData.get("startDate") ? new Date(String(formData.get("startDate"))) : null,
    endDate: formData.get("endDate") ? new Date(String(formData.get("endDate"))) : null,
    descriptionEn: String(formData.get("descriptionEn") ?? "").trim() || null,
    descriptionFa: String(formData.get("descriptionFa") ?? "").trim() || null,
    contentEn: String(formData.get("contentEn") ?? "").trim() || null,
    contentFa: String(formData.get("contentFa") ?? "").trim() || null,
    publicationStatus: String(formData.get("publicationStatus") ?? "DRAFT") as PublicationStatus,
    mediaIds,
  };
}

export async function createCompetition(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const data = parseCompetition(formData);
  if (!data.nameEn || !data.slug) return { error: "Name is required." };

  const { mediaIds, ...fields } = data;

  try {
    const competition = await prisma.competition.create({
      data: {
        ...fields,
        publishedAt: data.publicationStatus === "PUBLISHED" ? new Date() : null,
        media: { create: mediaIds.map((mediaId, order) => ({ mediaId, order })) },
      },
    });
    revalidatePath("/admin/competitions");
    revalidatePath("/competitions");
    redirect(`/admin/competitions/${competition.id}/edit?saved=Competition created.`);
  } catch (err: any) {
    if (err?.code === "P2002") return { error: "A competition with this slug already exists." };
    if (err?.digest?.startsWith("NEXT_REDIRECT")) throw err;
    return { error: "Failed to save competition." };
  }
}

export async function updateCompetition(id: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const data = parseCompetition(formData);
  if (!data.nameEn || !data.slug) return { error: "Name is required." };

  const { mediaIds, ...fields } = data;

  try {
    const existing = await prisma.competition.findUnique({ where: { id }, select: { publicationStatus: true, publishedAt: true } });
    const newlyPublished = data.publicationStatus === "PUBLISHED" && existing?.publicationStatus !== "PUBLISHED";

    await prisma.$transaction([
      prisma.competitionMedia.deleteMany({ where: { competitionId: id } }),
      prisma.competition.update({
        where: { id },
        data: {
          ...fields,
          publishedAt: newlyPublished ? new Date() : existing?.publishedAt,
          media: { create: mediaIds.map((mediaId, order) => ({ mediaId, order })) },
        },
      }),
    ]);
    revalidatePath("/admin/competitions");
    revalidatePath(`/competitions/${data.slug}`);
  } catch (err: any) {
    if (err?.code === "P2002") return { error: "A competition with this slug already exists." };
    return { error: "Failed to save competition." };
  }

  return { error: undefined };
}

export async function deleteCompetition(id: string) {
  await requireAdmin();
  await prisma.competition.delete({ where: { id } });
  revalidatePath("/admin/competitions");
  redirect("/admin/competitions");
}

// ---------- Results ----------

export async function addResult(competitionId: string, formData: FormData) {
  await requireAdmin();
  await prisma.competitionResult.create({
    data: {
      competitionId,
      titleEn: String(formData.get("titleEn") ?? "").trim() || null,
      stage: String(formData.get("stage") ?? "").trim() || null,
      placement: formData.get("placement") ? Number(formData.get("placement")) : null,
      score: String(formData.get("score") ?? "").trim() || null,
      descriptionEn: String(formData.get("descriptionEn") ?? "").trim() || null,
    },
  });
  revalidatePath(`/admin/competitions/${competitionId}/edit`);
}

export async function deleteResult(competitionId: string, resultId: string) {
  await requireAdmin();
  await prisma.competitionResult.delete({ where: { id: resultId } });
  revalidatePath(`/admin/competitions/${competitionId}/edit`);
}

// ---------- Awards ----------

export async function addAward(competitionId: string, formData: FormData) {
  await requireAdmin();
  await prisma.award.create({
    data: {
      competitionId,
      titleEn: String(formData.get("titleEn") ?? "").trim(),
      year: formData.get("year") ? Number(formData.get("year")) : null,
      descriptionEn: String(formData.get("descriptionEn") ?? "").trim() || null,
      isPublished: true,
    },
  });
  revalidatePath(`/admin/competitions/${competitionId}/edit`);
  revalidatePath("/competitions/awards");
}

export async function deleteAward(competitionId: string, awardId: string) {
  await requireAdmin();
  await prisma.award.delete({ where: { id: awardId } });
  revalidatePath(`/admin/competitions/${competitionId}/edit`);
  revalidatePath("/competitions/awards");
}
