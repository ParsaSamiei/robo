"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/slug";
import type { FormState } from "@/lib/member-actions";

// Docs/18_MEDIA_AND_GALLERY.md §7-10: Gallery -> Albums -> Items. An album
// is a title/slug/description/cover/order/published record; each selected
// image becomes its own GalleryItem row (order preserved from selection
// order), reusing the same media the item points at rather than duplicating
// files (§10).
async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
}

function parseAlbum(formData: FormData) {
  const titleEn = String(formData.get("titleEn") ?? "").trim();
  return {
    titleEn,
    titleFa: String(formData.get("titleFa") ?? "").trim() || null,
    slug: slugify(String(formData.get("slug") ?? "").trim() || titleEn),
    descriptionEn: String(formData.get("descriptionEn") ?? "").trim() || null,
    descriptionFa: String(formData.get("descriptionFa") ?? "").trim() || null,
    coverMediaId: String(formData.get("coverMediaId") ?? "").trim() || null,
    order: Number(formData.get("order") ?? 0) || 0,
    published: formData.get("published") === "on",
    mediaIds: formData.getAll("mediaIds").map(String),
  };
}

export async function createAlbum(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const data = parseAlbum(formData);
  if (!data.titleEn || !data.slug) return { error: "Title is required." };

  const { mediaIds, ...fields } = data;

  try {
    const album = await prisma.galleryAlbum.create({
      data: {
        ...fields,
        items: { create: mediaIds.map((mediaId, order) => ({ mediaId, order })) },
      },
    });
    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
    redirect(`/admin/gallery/${album.id}/edit?saved=Album created.`);
  } catch (err: any) {
    if (err?.code === "P2002") return { error: "An album with this slug already exists." };
    if (err?.digest?.startsWith("NEXT_REDIRECT")) throw err;
    return { error: "Failed to save album." };
  }
}

export async function updateAlbum(id: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const data = parseAlbum(formData);
  if (!data.titleEn || !data.slug) return { error: "Title is required." };

  const { mediaIds, ...fields } = data;

  try {
    await prisma.$transaction([
      prisma.galleryItem.deleteMany({ where: { albumId: id } }),
      prisma.galleryAlbum.update({
        where: { id },
        data: {
          ...fields,
          items: { create: mediaIds.map((mediaId, order) => ({ mediaId, order })) },
        },
      }),
    ]);
    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
  } catch (err: any) {
    if (err?.code === "P2002") return { error: "An album with this slug already exists." };
    return { error: "Failed to save album." };
  }

  return { error: undefined };
}

export async function deleteAlbum(id: string) {
  await requireAdmin();
  await prisma.galleryAlbum.delete({ where: { id } });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  redirect("/admin/gallery");
}
