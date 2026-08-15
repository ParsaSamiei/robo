import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { DataTable } from "@/components/admin/DataTable";
import { ToastFlash } from "@/components/admin/ToastFlash";

export const metadata = { title: "Departments — Admin" };

export default async function AdminDepartmentsPage() {
  const departments = await prisma.department.findMany({ orderBy: { order: "asc" } });

  return (
    <AdminShell>
      <ToastFlash />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Departments</h1>
        <Link href="/admin/departments/new" className="rounded-md bg-[#d7a84b] px-3 py-1.5 text-xs font-medium text-[#11161b] hover:brightness-110">
          New Department
        </Link>
      </div>
      <div className="mt-6">
        <DataTable
          emptyMessage="No departments yet."
          rows={departments}
          columns={[
            { header: "Name", cell: (d) => <Link href={`/admin/departments/${d.id}/edit`} className="font-medium hover:text-[#d7a84b]">{d.nameEn}</Link> },
            { header: "Persian", cell: (d) => d.nameFa },
            { header: "Order", cell: (d) => d.order },
            { header: "Active", cell: (d) => (d.isActive ? "Yes" : "No") },
          ]}
        />
      </div>
    </AdminShell>
  );
}
