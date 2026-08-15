import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { DataTable } from "@/components/admin/DataTable";
import { ToastFlash } from "@/components/admin/ToastFlash";

export const metadata = { title: "Sponsor Tiers — Admin" };

export default async function AdminSponsorTiersPage() {
  const tiers = await prisma.sponsorTier.findMany({ orderBy: { order: "asc" }, include: { sponsors: true } });

  return (
    <AdminShell>
      <ToastFlash />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Sponsor Tiers</h1>
        <Link href="/admin/sponsor-tiers/new" className="rounded-md bg-[#d7a84b] px-3 py-1.5 text-xs font-medium text-[#11161b] hover:brightness-110">
          New Tier
        </Link>
      </div>
      <div className="mt-6">
        <DataTable
          emptyMessage="No sponsor tiers yet."
          rows={tiers}
          columns={[
            { header: "Name", cell: (t) => <Link href={`/admin/sponsor-tiers/${t.id}/edit`} className="font-medium hover:text-[#d7a84b]">{t.nameEn}</Link> },
            { header: "Order", cell: (t) => t.order },
            { header: "Sponsors", cell: (t) => t.sponsors.length },
          ]}
        />
      </div>
    </AdminShell>
  );
}
