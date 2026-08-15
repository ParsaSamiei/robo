import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { SimpleEntityForm } from "@/components/admin/SimpleEntityForm";
import { DeleteConfirmButton } from "@/components/admin/DeleteConfirmButton";
import { updateAlbum, deleteAlbum } from "@/lib/gallery-actions";

export const metadata = { title: "Edit Album — Admin" };

export default async function EditAlbumPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const album = await prisma.galleryAlbum.findUnique({
    where: { id },
    include: { cover: true, items: { include: { media: true }, orderBy: { order: "asc" } } },
  });
  if (!album) notFound();

  const boundUpdate = updateAlbum.bind(null, album.id);
  const boundDelete = deleteAlbum.bind(null, album.id);

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Edit Album — {album.titleEn}</h1>
        <DeleteConfirmButton label="album" action={boundDelete} />
      </div>
      <div className="mt-6">
        <SimpleEntityForm
          action={boundUpdate}
          submitLabel="Save album"
          fields={[
            { name: "titleEn", label: "Title (English)", type: "text", required: true, defaultValue: album.titleEn },
            { name: "titleFa", label: "Title (Persian)", type: "text", dir: "rtl", defaultValue: album.titleFa ?? "" },
            { name: "slug", label: "Slug", type: "text", defaultValue: album.slug },
            { name: "descriptionEn", label: "Description (English)", type: "textarea", defaultValue: album.descriptionEn ?? "" },
            { name: "descriptionFa", label: "Description (Persian)", type: "textarea", dir: "rtl", defaultValue: album.descriptionFa ?? "" },
            { name: "coverMediaId", label: "Cover image", type: "media", mediaPurpose: "galleryImage", initialMedia: album.cover },
            {
              name: "mediaIds",
              label: "Photos",
              type: "multi-media",
              mediaPurpose: "galleryImage",
              initialMediaList: album.items.map((item) => item.media),
            },
            { name: "order", label: "Order", type: "number", defaultValue: album.order },
            { name: "published", label: "Published", type: "checkbox", defaultValue: album.published },
          ]}
        />
      </div>
    </AdminShell>
  );
}
