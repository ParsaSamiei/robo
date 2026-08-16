"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/slug";
import type { PublicationStatus, SocialPlatform } from "@prisma/client";
import type { FormState } from "@/lib/member-actions";

async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
}

// ---------- Sponsor Tier ----------

function parseTier(formData: FormData) {
  return {
    nameEn: String(formData.get("nameEn") ?? "").trim(),
    nameFa: String(formData.get("nameFa") ?? "").trim() || null,
    descriptionEn: String(formData.get("descriptionEn") ?? "").trim() || null,
    descriptionFa: String(formData.get("descriptionFa") ?? "").trim() || null,
    order: Number(formData.get("order") ?? 0) || 0,
  };
}

export async function createSponsorTier(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const data = parseTier(formData);
  if (!data.nameEn) return { error: "Name is required." };
  await prisma.sponsorTier.create({ data });
  revalidatePath("/admin/sponsor-tiers");
  redirect("/admin/sponsor-tiers?saved=Sponsor tier created.");
}

export async function updateSponsorTier(id: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const data = parseTier(formData);
  if (!data.nameEn) return { error: "Name is required." };
  await prisma.sponsorTier.update({ where: { id }, data });
  revalidatePath("/admin/sponsor-tiers");
  return { error: undefined };
}

export async function deleteSponsorTier(id: string) {
  await requireAdmin();
  await prisma.sponsorTier.delete({ where: { id } });
  revalidatePath("/admin/sponsor-tiers");
  redirect("/admin/sponsor-tiers");
}

// ---------- Sponsor ----------

function parseSponsor(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const rawSlug = String(formData.get("slug") ?? "").trim();
  return {
    name,
    slug: slugify(rawSlug || name),
    descriptionEn: String(formData.get("descriptionEn") ?? "").trim() || null,
    descriptionFa: String(formData.get("descriptionFa") ?? "").trim() || null,
    websiteUrl: String(formData.get("websiteUrl") ?? "").trim() || null,
    tierId: String(formData.get("tierId") ?? "").trim() || null,
    logoMediaId: String(formData.get("logoMediaId") ?? "").trim() || null,
    order: Number(formData.get("order") ?? 0) || 0,
    publicationStatus: String(formData.get("publicationStatus") ?? "DRAFT") as PublicationStatus,
  };
}

export async function createSponsor(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const data = parseSponsor(formData);
  if (!data.name || !data.slug) return { error: "Name is required." };
  try {
    await prisma.sponsor.create({ data });
  } catch (err: any) {
    if (err?.code === "P2002") return { error: "A sponsor with this slug already exists." };
    return { error: "Failed to save sponsor." };
  }
  revalidatePath("/admin/sponsors");
  revalidatePath("/sponsors");
  redirect("/admin/sponsors?saved=Sponsor created.");
}

export async function updateSponsor(id: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const data = parseSponsor(formData);
  if (!data.name || !data.slug) return { error: "Name is required." };
  try {
    await prisma.sponsor.update({ where: { id }, data });
  } catch (err: any) {
    if (err?.code === "P2002") return { error: "A sponsor with this slug already exists." };
    return { error: "Failed to save sponsor." };
  }
  revalidatePath("/admin/sponsors");
  revalidatePath("/sponsors");
  return { error: undefined };
}

export async function deleteSponsor(id: string) {
  await requireAdmin();
  await prisma.sponsor.delete({ where: { id } });
  revalidatePath("/admin/sponsors");
  redirect("/admin/sponsors");
}

// ---------- Partner ----------

function parsePartner(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const rawSlug = String(formData.get("slug") ?? "").trim();
  return {
    name,
    slug: slugify(rawSlug || name),
    descriptionEn: String(formData.get("descriptionEn") ?? "").trim() || null,
    descriptionFa: String(formData.get("descriptionFa") ?? "").trim() || null,
    websiteUrl: String(formData.get("websiteUrl") ?? "").trim() || null,
    logoMediaId: String(formData.get("logoMediaId") ?? "").trim() || null,
    order: Number(formData.get("order") ?? 0) || 0,
    publicationStatus: String(formData.get("publicationStatus") ?? "DRAFT") as PublicationStatus,
  };
}

export async function createPartner(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const data = parsePartner(formData);
  if (!data.name || !data.slug) return { error: "Name is required." };
  try {
    await prisma.partner.create({ data });
  } catch (err: any) {
    if (err?.code === "P2002") return { error: "A partner with this slug already exists." };
    return { error: "Failed to save partner." };
  }
  revalidatePath("/admin/partners");
  revalidatePath("/sponsors");
  redirect("/admin/partners?saved=Partner created.");
}

export async function updatePartner(id: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const data = parsePartner(formData);
  if (!data.name || !data.slug) return { error: "Name is required." };
  try {
    await prisma.partner.update({ where: { id }, data });
  } catch (err: any) {
    if (err?.code === "P2002") return { error: "A partner with this slug already exists." };
    return { error: "Failed to save partner." };
  }
  revalidatePath("/admin/partners");
  revalidatePath("/sponsors");
  return { error: undefined };
}

export async function deletePartner(id: string) {
  await requireAdmin();
  await prisma.partner.delete({ where: { id } });
  revalidatePath("/admin/partners");
  redirect("/admin/partners");
}

// ---------- Social Link ----------

function parseSocialLink(formData: FormData) {
  return {
    platform: String(formData.get("platform") ?? "INSTAGRAM") as SocialPlatform,
    url: String(formData.get("url") ?? "").trim(),
    order: Number(formData.get("order") ?? 0) || 0,
    isEnabled: formData.get("isEnabled") === "on",
  };
}

export async function createSocialLink(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const data = parseSocialLink(formData);
  if (!data.url) return { error: "URL is required." };
  await prisma.socialLink.create({ data });
  revalidatePath("/admin/social-links");
  revalidatePath("/contact");
  redirect("/admin/social-links?saved=Social link created.");
}

export async function updateSocialLink(id: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const data = parseSocialLink(formData);
  if (!data.url) return { error: "URL is required." };
  await prisma.socialLink.update({ where: { id }, data });
  revalidatePath("/admin/social-links");
  revalidatePath("/contact");
  return { error: undefined };
}

export async function deleteSocialLink(id: string) {
  await requireAdmin();
  await prisma.socialLink.delete({ where: { id } });
  revalidatePath("/admin/social-links");
  redirect("/admin/social-links");
}
