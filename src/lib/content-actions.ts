"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/slug";
import type { PublicationStatus } from "@prisma/client";
import type { FormState } from "@/lib/member-actions";

async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
}

// ---------- Blog ----------

function parseBlog(formData: FormData) {
  const titleEn = String(formData.get("titleEn") ?? "").trim();
  return {
    titleEn,
    titleFa: String(formData.get("titleFa") ?? "").trim() || null,
    slug: slugify(String(formData.get("slug") ?? "").trim() || titleEn),
    excerptEn: String(formData.get("excerptEn") ?? "").trim() || null,
    excerptFa: String(formData.get("excerptFa") ?? "").trim() || null,
    contentEn: String(formData.get("contentEn") ?? "").trim() || null,
    contentFa: String(formData.get("contentFa") ?? "").trim() || null,
    authorId: String(formData.get("authorId") ?? "").trim() || null,
    coverMediaId: String(formData.get("coverMediaId") ?? "").trim() || null,
    publicationStatus: String(formData.get("publicationStatus") ?? "DRAFT") as PublicationStatus,
  };
}

export async function createBlogPost(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const data = parseBlog(formData);
  if (!data.titleEn || !data.slug) return { error: "Title is required." };

  try {
    const post = await prisma.blogPost.create({
      data: { ...data, publishedAt: data.publicationStatus === "PUBLISHED" ? new Date() : null },
    });
    revalidatePath("/admin/blog");
    revalidatePath("/journal/blog");
    redirect(`/admin/blog/${post.id}/edit?saved=Post created.`);
  } catch (err: any) {
    if (err?.code === "P2002") return { error: "A post with this slug already exists." };
    if (err?.digest?.startsWith("NEXT_REDIRECT")) throw err;
    return { error: "Failed to save post." };
  }
}

export async function updateBlogPost(id: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const data = parseBlog(formData);
  if (!data.titleEn || !data.slug) return { error: "Title is required." };

  try {
    const existing = await prisma.blogPost.findUnique({ where: { id }, select: { publicationStatus: true, publishedAt: true } });
    const newlyPublished = data.publicationStatus === "PUBLISHED" && existing?.publicationStatus !== "PUBLISHED";
    await prisma.blogPost.update({
      where: { id },
      data: { ...data, publishedAt: newlyPublished ? new Date() : existing?.publishedAt },
    });
    revalidatePath("/admin/blog");
    revalidatePath(`/journal/blog/${data.slug}`);
  } catch (err: any) {
    if (err?.code === "P2002") return { error: "A post with this slug already exists." };
    return { error: "Failed to save post." };
  }
  return { error: undefined };
}

export async function deleteBlogPost(id: string) {
  await requireAdmin();
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

// ---------- News ----------

function parseNews(formData: FormData) {
  const titleEn = String(formData.get("titleEn") ?? "").trim();
  return {
    titleEn,
    titleFa: String(formData.get("titleFa") ?? "").trim() || null,
    slug: slugify(String(formData.get("slug") ?? "").trim() || titleEn),
    excerptEn: String(formData.get("excerptEn") ?? "").trim() || null,
    excerptFa: String(formData.get("excerptFa") ?? "").trim() || null,
    contentEn: String(formData.get("contentEn") ?? "").trim() || null,
    contentFa: String(formData.get("contentFa") ?? "").trim() || null,
    coverMediaId: String(formData.get("coverMediaId") ?? "").trim() || null,
    publicationStatus: String(formData.get("publicationStatus") ?? "DRAFT") as PublicationStatus,
  };
}

export async function createNewsPost(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const data = parseNews(formData);
  if (!data.titleEn || !data.slug) return { error: "Title is required." };

  try {
    const post = await prisma.newsPost.create({
      data: { ...data, publishedAt: data.publicationStatus === "PUBLISHED" ? new Date() : null },
    });
    revalidatePath("/admin/news");
    revalidatePath("/journal/news");
    redirect(`/admin/news/${post.id}/edit?saved=News post created.`);
  } catch (err: any) {
    if (err?.code === "P2002") return { error: "A post with this slug already exists." };
    if (err?.digest?.startsWith("NEXT_REDIRECT")) throw err;
    return { error: "Failed to save post." };
  }
}

export async function updateNewsPost(id: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const data = parseNews(formData);
  if (!data.titleEn || !data.slug) return { error: "Title is required." };

  try {
    const existing = await prisma.newsPost.findUnique({ where: { id }, select: { publicationStatus: true, publishedAt: true } });
    const newlyPublished = data.publicationStatus === "PUBLISHED" && existing?.publicationStatus !== "PUBLISHED";
    await prisma.newsPost.update({
      where: { id },
      data: { ...data, publishedAt: newlyPublished ? new Date() : existing?.publishedAt },
    });
    revalidatePath("/admin/news");
    revalidatePath("/journal/news");
  } catch (err: any) {
    if (err?.code === "P2002") return { error: "A post with this slug already exists." };
    return { error: "Failed to save post." };
  }
  return { error: undefined };
}

export async function deleteNewsPost(id: string) {
  await requireAdmin();
  await prisma.newsPost.delete({ where: { id } });
  revalidatePath("/admin/news");
  redirect("/admin/news");
}
