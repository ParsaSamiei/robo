import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { SimpleEntityForm } from "@/components/admin/SimpleEntityForm";
import { createBlogPost } from "@/lib/content-actions";

export const metadata = { title: "New Blog Post — Admin" };

export default async function NewBlogPostPage() {
  const members = await prisma.member.findMany({ orderBy: { name: "asc" } });

  return (
    <AdminShell>
      <h1 className="text-xl font-semibold">New Blog Post</h1>
      <p className="mt-1 text-xs text-[#56616c]">
        Content fields are plain text for now — a rich text editor isn&apos;t wired in yet (see README).
      </p>
      <div className="mt-6">
        <SimpleEntityForm
          action={createBlogPost}
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
              name: "authorId",
              label: "Author",
              type: "select",
              defaultValue: "",
              options: [{ value: "", label: "No author" }, ...members.map((m) => ({ value: m.id, label: m.name }))],
            },
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
