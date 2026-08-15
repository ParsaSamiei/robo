import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ToastFlash } from "@/components/admin/ToastFlash";

export const metadata = { title: "Blog — Admin" };

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { updatedAt: "desc" }, include: { author: true } });

  return (
    <AdminShell>
      <ToastFlash />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Blog</h1>
        <Link href="/admin/blog/new" className="rounded-md bg-[#d7a84b] px-3 py-1.5 text-xs font-medium text-[#11161b] hover:brightness-110">
          New Post
        </Link>
      </div>
      <div className="mt-6">
        <DataTable
          emptyMessage="No blog posts yet."
          rows={posts}
          columns={[
            { header: "Title", cell: (p) => <Link href={`/admin/blog/${p.id}/edit`} className="font-medium hover:text-[#d7a84b]">{p.titleEn}</Link> },
            { header: "Author", cell: (p) => p.author?.name ?? "—" },
            { header: "Status", cell: (p) => <StatusBadge status={p.publicationStatus} /> },
          ]}
        />
      </div>
    </AdminShell>
  );
}
