import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { SimpleEntityForm } from "@/components/admin/SimpleEntityForm";
import { DeleteConfirmButton } from "@/components/admin/DeleteConfirmButton";
import { updateBlogPost, deleteBlogPost } from "@/lib/content-actions";

export const metadata = { title: "Edit Blog Post — Admin" };

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [post, members] = await Promise.all([
    prisma.blogPost.findUnique({ where: { id } }),
    prisma.member.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!post) notFound();

  const coverMedia = post.coverMediaId
    ? await prisma.media.findUnique({ where: { id: post.coverMediaId } })
    : null;

  const boundUpdate = updateBlogPost.bind(null, post.id);
  const boundDelete = deleteBlogPost.bind(null, post.id);

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Edit Blog Post — {post.titleEn}</h1>
        <DeleteConfirmButton label="post" action={boundDelete} />
      </div>
      <div className="mt-6">
        <SimpleEntityForm
          action={boundUpdate}
          submitLabel="Save post"
          fields={[
            { name: "titleEn", label: "Title (English)", type: "text", required: true, defaultValue: post.titleEn },
            { name: "titleFa", label: "Title (Persian)", type: "text", dir: "rtl", defaultValue: post.titleFa ?? "" },
            { name: "slug", label: "Slug", type: "text", defaultValue: post.slug },
            { name: "excerptEn", label: "Excerpt (English)", type: "textarea", defaultValue: post.excerptEn ?? "" },
            { name: "excerptFa", label: "Excerpt (Persian)", type: "textarea", dir: "rtl", defaultValue: post.excerptFa ?? "" },
            { name: "contentEn", label: "Content (English)", type: "richtext", defaultValue: post.contentEn ?? "" },
            { name: "contentFa", label: "Content (Persian)", type: "richtext", dir: "rtl", defaultValue: post.contentFa ?? "" },
            { name: "coverMediaId", label: "Cover image", type: "media", mediaPurpose: "blogImage", initialMedia: coverMedia },
            {
              name: "authorId",
              label: "Author",
              type: "select",
              defaultValue: post.authorId ?? "",
              options: [{ value: "", label: "No author" }, ...members.map((m) => ({ value: m.id, label: m.name }))],
            },
            {
              name: "publicationStatus",
              label: "Publication status",
              type: "select",
              defaultValue: post.publicationStatus,
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
