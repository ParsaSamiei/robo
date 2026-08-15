import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";

export const metadata = { title: "Competitions — Admin" };

export default async function AdminCompetitionsPage() {
  const competitions = await prisma.competition.findMany({ orderBy: { year: "desc" } });

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Competitions</h1>
        <Link
          href="/admin/competitions/new"
          className="rounded-md bg-[#d7a84b] px-3 py-1.5 text-xs font-medium text-[#11161b] hover:brightness-110"
        >
          New Competition
        </Link>
      </div>
      <div className="mt-6">
        <DataTable
          emptyMessage="No competitions yet."
          rows={competitions}
          columns={[
            {
              header: "Name",
              cell: (c) => (
                <Link href={`/admin/competitions/${c.id}/edit`} className="font-medium hover:text-[#d7a84b]">
                  {c.nameEn}
                </Link>
              ),
            },
            { header: "Year", cell: (c) => c.year ?? "—" },
            { header: "Publication", cell: (c) => <StatusBadge status={c.publicationStatus} /> },
          ]}
        />
      </div>
    </AdminShell>
  );
}
