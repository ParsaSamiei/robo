import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { createProject } from "@/lib/project-actions";

export const metadata = { title: "New Project — Admin" };

export default async function NewProjectPage() {
  const [members, technologies] = await Promise.all([
    prisma.member.findMany({ orderBy: { name: "asc" } }),
    prisma.technology.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <AdminShell>
      <h1 className="text-xl font-semibold">New Project</h1>
      <div className="mt-6">
        <ProjectForm members={members} technologies={technologies} action={createProject} />
      </div>
    </AdminShell>
  );
}
