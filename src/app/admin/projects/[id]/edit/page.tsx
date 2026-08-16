import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { ToastFlash } from "@/components/admin/ToastFlash";
import { DeleteConfirmButton } from "@/components/admin/DeleteConfirmButton";
import { updateProject, deleteProject } from "@/lib/project-actions";

export const metadata = { title: "Edit Project — Admin" };

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [project, members, technologies] = await Promise.all([
    prisma.project.findUnique({
      where: { id },
      include: { members: true, technologies: true, ogImage: true, media: { include: { media: true }, orderBy: { order: "asc" } } },
    }),
    prisma.member.findMany({ orderBy: { name: "asc" } }),
    prisma.technology.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!project) notFound();

  const boundUpdate = updateProject.bind(null, project.id);
  const boundDelete = deleteProject.bind(null, project.id);

  return (
    <AdminShell>
      <ToastFlash />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Edit Project — {project.titleEn}</h1>
        <DeleteConfirmButton label="project" action={boundDelete} />
      </div>
      <div className="mt-6">
        <ProjectForm project={project} members={members} technologies={technologies} action={boundUpdate} />
      </div>
    </AdminShell>
  );
}
