import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ToastFlash } from "@/components/admin/ToastFlash";

export const metadata = { title: "News — Admin" };

export default async function AdminNewsPage() {
  const posts = await prisma.newsPost.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <AdminShell>
      <ToastFlash />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">News</h1>
        <Link href="/admin/news/new" className="rounded-md bg-[#d7a84b] px-3 py-1.5 text-xs font-medium text-[#11161b] hover:brightness-110">
          New Post
        </Link>
      </div>
      <div className="mt-6">
        <DataTable
          emptyMessage="No news posts yet."
          rows={posts}
          columns={[
            { header: "Title", cell: (p) => <Link href={`/admin/news/${p.id}/edit`} className="font-medium hover:text-[#d7a84b]">{p.titleEn}</Link> },
            { header: "Status", cell: (p) => <StatusBadge status={p.publicationStatus} /> },
          ]}
        />
      </div>
    </AdminShell>
  );
}
