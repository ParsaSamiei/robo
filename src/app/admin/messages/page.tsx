import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { DataTable } from "@/components/admin/DataTable";
import { StatusSelect } from "@/components/admin/StatusSelect";
import { updateContactStatus } from "@/lib/admin-actions";
import type { ContactStatus } from "@prisma/client";

export const metadata = { title: "Contact Messages — Admin" };

// Docs/06_ADMIN_PANEL.md #38-39: inbox listing (name/email/subject/date/
// status), status is admin-only (never exposed via public API — enforced by
// middleware.ts (now proxy.ts, per Next 16) protecting /api/admin/* and this
// page requiring auth).
export default async function AdminMessagesPage() {
  const messages = await prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <AdminShell>
      <h1 className="text-xl font-semibold">Contact Messages</h1>
      <div className="mt-6">
        <DataTable
          emptyMessage="No messages yet."
          rows={messages}
          columns={[
            { header: "Name", cell: (m) => m.name },
            { header: "Email", cell: (m) => m.email },
            { header: "Subject", cell: (m) => m.subject ?? "—" },
            { header: "Message", cell: (m) => <span className="line-clamp-1 max-w-xs text-[#7e8995]">{m.message}</span> },
            { header: "Date", cell: (m) => m.createdAt.toLocaleDateString("en-US") },
            {
              header: "Status",
              cell: (m) => (
                <StatusSelect<ContactStatus>
                  id={m.id}
                  value={m.status}
                  options={["NEW", "REVIEWED", "ARCHIVED"]}
                  action={updateContactStatus}
                />
              ),
            },
          ]}
        />
      </div>
    </AdminShell>
  );
}
