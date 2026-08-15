import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { DataTable } from "@/components/admin/DataTable";
import { StatusSelect } from "@/components/admin/StatusSelect";
import { updateApplicationStatus } from "@/lib/admin-actions";
import type { ApplicationStatus } from "@prisma/client";

export const metadata = { title: "Join Applications — Admin" };

// Docs/06_ADMIN_PANEL.md #40-41: recruitment inbox with name/department/
// status/date, status changeable inline.
export default async function AdminApplicationsPage() {
  const applications = await prisma.joinApplication.findMany({
    orderBy: { createdAt: "desc" },
    include: { department: true },
  });

  return (
    <AdminShell>
      <h1 className="text-xl font-semibold">Join Applications</h1>
      <div className="mt-6">
        <DataTable
          emptyMessage="No applications yet."
          rows={applications}
          columns={[
            { header: "Name", cell: (a) => a.name },
            { header: "Email", cell: (a) => a.email },
            { header: "Department", cell: (a) => a.department?.nameEn ?? "—" },
            { header: "Date", cell: (a) => a.createdAt.toLocaleDateString("en-US") },
            {
              header: "Status",
              cell: (a) => (
                <StatusSelect<ApplicationStatus>
                  id={a.id}
                  value={a.status}
                  options={["NEW", "REVIEWING", "ACCEPTED", "REJECTED", "ARCHIVED"]}
                  action={updateApplicationStatus}
                />
              ),
            },
          ]}
        />
      </div>
    </AdminShell>
  );
}
