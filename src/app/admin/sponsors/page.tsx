import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ToastFlash } from "@/components/admin/ToastFlash";

export const metadata = { title: "Sponsors — Admin" };

export default async function AdminSponsorsPage() {
  const sponsors = await prisma.sponsor.findMany({ orderBy: { order: "asc" }, include: { tier: true } });

  return (
    <AdminShell>
      <ToastFlash />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Sponsors</h1>
        <Link href="/admin/sponsors/new" className="rounded-md bg-[#d7a84b] px-3 py-1.5 text-xs font-medium text-[#11161b] hover:brightness-110">
          New Sponsor
        </Link>
      </div>
      <div className="mt-6">
        <DataTable
          emptyMessage="No sponsors yet."
          rows={sponsors}
          columns={[
            { header: "Name", cell: (s) => <Link href={`/admin/sponsors/${s.id}/edit`} className="font-medium hover:text-[#d7a84b]">{s.name}</Link> },
            { header: "Tier", cell: (s) => s.tier?.nameEn ?? "—" },
            { header: "Status", cell: (s) => <StatusBadge status={s.publicationStatus} /> },
          ]}
        />
      </div>
    </AdminShell>
  );
}
