import { AdminShell } from "@/components/admin/AdminShell";
import { SimpleEntityForm } from "@/components/admin/SimpleEntityForm";
import { createNewsPost } from "@/lib/content-actions";

export const metadata = { title: "New News Post — Admin" };

export default function NewNewsPostPage() {
  return (
    <AdminShell>
      <h1 className="text-xl font-semibold">New News Post</h1>
      <div className="mt-6">
        <SimpleEntityForm
          action={createNewsPost}
          fields={[
            { name: "titleEn", label: "Title (English)", type: "text", required: true },
            { name: "titleFa", label: "Title (Persian)", type: "text", dir: "rtl" },
            { name: "slug", label: "Slug (leave blank to auto-generate)", type: "text" },
            { name: "excerptEn", label: "Excerpt (English)", type: "textarea" },
            { name: "excerptFa", label: "Excerpt (Persian)", type: "textarea", dir: "rtl" },
            { name: "contentEn", label: "Content (English)", type: "richtext" },
            { name: "contentFa", label: "Content (Persian)", type: "richtext", dir: "rtl" },
            { name: "coverMediaId", label: "Cover image", type: "media", mediaPurpose: "blogImage" },
            {
              name: "publicationStatus",
              label: "Publication status",
              type: "select",
              defaultValue: "DRAFT",
              options: [
                { value: "DRAFT", label: "Draft" },
                { value: "PUBLISHED", label: "Published" },
                { value: "ARCHIVED", label: "Archived" },
              ],
            },
          ]}
        />
      </div>
    </AdminShell>
  );
}
