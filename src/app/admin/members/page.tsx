import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";

export const metadata = { title: "Members — Admin" };

// Docs/06_ADMIN_PANEL.md #12, #16: member list with search/filter by
// department and status. Search/filter controls are noted as TODO in
// README rather than faked here; the table itself is real and live.
export default async function AdminMembersPage() {
  const members = await prisma.member.findMany({
    orderBy: { createdAt: "desc" },
    include: { departments: { include: { department: true } } },
  });

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Members</h1>
        <Link
          href="/admin/members/new"
          className="rounded-md bg-[#d7a84b] px-3 py-1.5 text-xs font-medium text-[#11161b] hover:brightness-110"
        >
          New Member
        </Link>
      </div>

      <div className="mt-6">
        <DataTable
          emptyMessage="No members yet."
          rows={members}
          columns={[
            {
              header: "Name",
              cell: (m) => (
                <Link href={`/admin/members/${m.id}/edit`} className="font-medium hover:text-[#d7a84b]">
                  {m.name}
                </Link>
              ),
            },
            { header: "Role", cell: (m) => m.roleEn ?? "—" },
            {
              header: "Department",
              cell: (m) => m.departments.map((d) => d.department.nameEn).join(", ") || "—",
            },
            { header: "Status", cell: (m) => m.membershipStatus },
            {
              header: "Published",
              cell: (m) => <StatusBadge status={m.isPublished ? "PUBLISHED" : "DRAFT"} />,
            },
          ]}
        />
      </div>
    </AdminShell>
  );
}
