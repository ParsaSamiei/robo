import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { DataTable } from "@/components/admin/DataTable";
import { ToastFlash } from "@/components/admin/ToastFlash";

export const metadata = { title: "Timeline — Admin" };

export default async function AdminTimelinePage() {
  const events = await prisma.timelineEvent.findMany({ orderBy: { order: "asc" } });

  return (
    <AdminShell>
      <ToastFlash />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Timeline</h1>
        <Link href="/admin/timeline/new" className="rounded-md bg-[#d7a84b] px-3 py-1.5 text-xs font-medium text-[#11161b] hover:brightness-110">
          New Event
        </Link>
      </div>
      <div className="mt-6">
        <DataTable
          emptyMessage="No timeline events yet."
          rows={events}
          columns={[
            { header: "Title", cell: (e) => <Link href={`/admin/timeline/${e.id}/edit`} className="font-medium hover:text-[#d7a84b]">{e.titleEn}</Link> },
            { header: "Date", cell: (e) => (e.date ? e.date.toLocaleDateString("en-US") : "—") },
            { header: "Published", cell: (e) => (e.isPublished ? "Yes" : "No") },
          ]}
        />
      </div>
    </AdminShell>
  );
}
