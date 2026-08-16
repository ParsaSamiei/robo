import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { DataTable } from "@/components/admin/DataTable";
import { ToastFlash } from "@/components/admin/ToastFlash";

export const metadata = { title: "Technologies — Admin" };

export default async function AdminTechnologiesPage() {
  const technologies = await prisma.technology.findMany({ orderBy: { order: "asc" } });

  return (
    <AdminShell>
      <ToastFlash />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Technologies</h1>
        <Link href="/admin/technologies/new" className="rounded-md bg-[#d7a84b] px-3 py-1.5 text-xs font-medium text-[#11161b] hover:brightness-110">
          New Technology
        </Link>
      </div>
      <div className="mt-6">
        <DataTable
          emptyMessage="No technologies yet."
          rows={technologies}
          columns={[
            { header: "Name", cell: (t) => <Link href={`/admin/technologies/${t.id}/edit`} className="font-medium hover:text-[#d7a84b]">{t.name}</Link> },
            { header: "Category", cell: (t) => t.category ?? "—" },
            { header: "Published", cell: (t) => (t.isPublished ? "Yes" : "No") },
          ]}
        />
      </div>
    </AdminShell>
  );
}
