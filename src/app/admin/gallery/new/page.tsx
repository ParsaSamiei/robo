import { AdminShell } from "@/components/admin/AdminShell";
import { SimpleEntityForm } from "@/components/admin/SimpleEntityForm";
import { createAlbum } from "@/lib/gallery-actions";

export const metadata = { title: "New Album — Admin" };

export default function NewAlbumPage() {
  return (
    <AdminShell>
      <h1 className="text-xl font-semibold">New Album</h1>
      <div className="mt-6">
        <SimpleEntityForm
          action={createAlbum}
          fields={[
            { name: "titleEn", label: "Title (English)", type: "text", required: true },
            { name: "titleFa", label: "Title (Persian)", type: "text", dir: "rtl" },
            { name: "slug", label: "Slug (leave blank to auto-generate)", type: "text" },
            { name: "descriptionEn", label: "Description (English)", type: "textarea" },
            { name: "descriptionFa", label: "Description (Persian)", type: "textarea", dir: "rtl" },
            { name: "coverMediaId", label: "Cover image", type: "media", mediaPurpose: "galleryImage" },
            { name: "mediaIds", label: "Photos", type: "multi-media", mediaPurpose: "galleryImage" },
            { name: "order", label: "Order", type: "number", defaultValue: 0 },
            { name: "published", label: "Published", type: "checkbox" },
          ]}
        />
      </div>
    </AdminShell>
  );
}
