import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { MemberForm } from "@/components/admin/MemberForm";
import { createMember } from "@/lib/member-actions";

export const metadata = { title: "New Member — Admin" };

export default async function NewMemberPage() {
  const [departments, technologies] = await Promise.all([
    prisma.department.findMany({ orderBy: { order: "asc" } }),
    prisma.technology.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <AdminShell>
      <h1 className="text-xl font-semibold">New Member</h1>
      <div className="mt-6">
        <MemberForm departments={departments} technologies={technologies} action={createMember} />
      </div>
    </AdminShell>
  );
}
