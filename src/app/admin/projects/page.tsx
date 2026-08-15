import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";

export const metadata = { title: "Projects — Admin" };

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { updatedAt: "desc" },
    include: { members: { include: { member: true } } },
  });

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="rounded-md bg-[#d7a84b] px-3 py-1.5 text-xs font-medium text-[#11161b] hover:brightness-110"
        >
          New Project
        </Link>
      </div>
      <div className="mt-6">
        <DataTable
          emptyMessage="No projects yet."
          rows={projects}
          columns={[
            {
              header: "Title",
              cell: (p) => (
                <Link href={`/admin/projects/${p.id}/edit`} className="font-medium hover:text-[#d7a84b]">
                  {p.titleEn}
                </Link>
              ),
            },
            { header: "Status", cell: (p) => p.status },
            { header: "Team", cell: (p) => p.members.map((m) => m.member.name).join(", ") || "—" },
            { header: "Publication", cell: (p) => <StatusBadge status={p.publicationStatus} /> },
            {
              header: "Updated",
              cell: (p) => p.updatedAt.toLocaleDateString("en-US"),
            },
          ]}
        />
      </div>
    </AdminShell>
  );
}
