import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";

export const metadata = { title: "Robots — Admin" };

export default async function AdminRobotsPage() {
  const robots = await prisma.robot.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Robots</h1>
        <Link
          href="/admin/robots/new"
          className="rounded-md bg-[#d7a84b] px-3 py-1.5 text-xs font-medium text-[#11161b] hover:brightness-110"
        >
          New Robot
        </Link>
      </div>
      <div className="mt-6">
        <DataTable
          emptyMessage="No robots yet."
          rows={robots}
          columns={[
            {
              header: "Name",
              cell: (r) => (
                <Link href={`/admin/robots/${r.id}/edit`} className="font-medium hover:text-[#d7a84b]">
                  {r.nameEn}
                </Link>
              ),
            },
            { header: "Status", cell: (r) => r.status },
            { header: "Publication", cell: (r) => <StatusBadge status={r.publicationStatus} /> },
            { header: "Updated", cell: (r) => r.updatedAt.toLocaleDateString("en-US") },
          ]}
        />
      </div>
    </AdminShell>
  );
}
