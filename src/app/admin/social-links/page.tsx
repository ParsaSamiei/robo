import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { DataTable } from "@/components/admin/DataTable";
import { ToastFlash } from "@/components/admin/ToastFlash";

export const metadata = { title: "Social Links — Admin" };

export default async function AdminSocialLinksPage() {
  const links = await prisma.socialLink.findMany({ orderBy: { order: "asc" } });

  return (
    <AdminShell>
      <ToastFlash />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Social Links</h1>
        <Link href="/admin/social-links/new" className="rounded-md bg-[#d7a84b] px-3 py-1.5 text-xs font-medium text-[#11161b] hover:brightness-110">
          New Link
        </Link>
      </div>
      <div className="mt-6">
        <DataTable
          emptyMessage="No social links yet."
          rows={links}
          columns={[
            { header: "Platform", cell: (l) => <Link href={`/admin/social-links/${l.id}/edit`} className="font-medium hover:text-[#d7a84b]">{l.platform}</Link> },
            { header: "URL", cell: (l) => <span className="text-[#7e8995]">{l.url}</span> },
            { header: "Enabled", cell: (l) => (l.isEnabled ? "Yes" : "No") },
          ]}
        />
      </div>
    </AdminShell>
  );
}
