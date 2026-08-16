import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { DataTable } from "@/components/admin/DataTable";
import { ToastFlash } from "@/components/admin/ToastFlash";

export const metadata = { title: "Gallery — Admin" };

export default async function AdminGalleryPage() {
  const albums = await prisma.galleryAlbum.findMany({
    orderBy: { order: "asc" },
    include: { items: true },
  });

  return (
    <AdminShell>
      <ToastFlash />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Gallery</h1>
        <Link href="/admin/gallery/new" className="rounded-md bg-[#d7a84b] px-3 py-1.5 text-xs font-medium text-[#11161b] hover:brightness-110">
          New Album
        </Link>
      </div>
      <div className="mt-6">
        <DataTable
          emptyMessage="No albums yet."
          rows={albums}
          columns={[
            { header: "Title", cell: (a) => <Link href={`/admin/gallery/${a.id}/edit`} className="font-medium hover:text-[#d7a84b]">{a.titleEn}</Link> },
            { header: "Items", cell: (a) => a.items.length },
            { header: "Published", cell: (a) => (a.published ? "Yes" : "No") },
          ]}
        />
      </div>
    </AdminShell>
  );
}
