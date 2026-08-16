import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { MemberForm } from "@/components/admin/MemberForm";
import { ToastFlash } from "@/components/admin/ToastFlash";
import { DeleteConfirmButton } from "@/components/admin/DeleteConfirmButton";
import { updateMember, deleteMember } from "@/lib/member-actions";

export const metadata = { title: "Edit Member — Admin" };

export default async function EditMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [member, departments, technologies] = await Promise.all([
    prisma.member.findUnique({
      where: { id },
      include: { departments: true, technologies: true, photo: true },
    }),
    prisma.department.findMany({ orderBy: { order: "asc" } }),
    prisma.technology.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!member) notFound();

  const boundUpdate = updateMember.bind(null, member.id);
  const boundDelete = deleteMember.bind(null, member.id);

  return (
    <AdminShell>
      <ToastFlash />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Edit Member — {member.name}</h1>
        <DeleteConfirmButton label="member" action={boundDelete} />
      </div>
      <div className="mt-6">
        <MemberForm member={member} departments={departments} technologies={technologies} action={boundUpdate} />
      </div>
    </AdminShell>
  );
}
