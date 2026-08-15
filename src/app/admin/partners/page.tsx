import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ToastFlash } from "@/components/admin/ToastFlash";

export const metadata = { title: "Partners — Admin" };

export default async function AdminPartnersPage() {
  const partners = await prisma.partner.findMany({ orderBy: { order: "asc" } });

  return (
    <AdminShell>
      <ToastFlash />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Partners</h1>
        <Link href="/admin/partners/new" className="rounded-md bg-[#d7a84b] px-3 py-1.5 text-xs font-medium text-[#11161b] hover:brightness-110">
          New Partner
        </Link>
      </div>
      <div className="mt-6">
        <DataTable
          emptyMessage="No partners yet."
          rows={partners}
          columns={[
            { header: "Name", cell: (p) => <Link href={`/admin/partners/${p.id}/edit`} className="font-medium hover:text-[#d7a84b]">{p.name}</Link> },
            { header: "Status", cell: (p) => <StatusBadge status={p.publicationStatus} /> },
          ]}
        />
      </div>
    </AdminShell>
  );
}
