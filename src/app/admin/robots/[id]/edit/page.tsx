import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { RobotForm } from "@/components/admin/RobotForm";
import { ToastFlash } from "@/components/admin/ToastFlash";
import { DeleteConfirmButton } from "@/components/admin/DeleteConfirmButton";
import { updateRobot, deleteRobot } from "@/lib/robot-actions";

export const metadata = { title: "Edit Robot — Admin" };

export default async function EditRobotPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [robot, members, technologies, projects] = await Promise.all([
    prisma.robot.findUnique({
      where: { id },
      include: { members: true, technologies: true, projects: true, media: { include: { media: true }, orderBy: { order: "asc" } } },
    }),
    prisma.member.findMany({ orderBy: { name: "asc" } }),
    prisma.technology.findMany({ orderBy: { name: "asc" } }),
    prisma.project.findMany({ orderBy: { titleEn: "asc" } }),
  ]);

  if (!robot) notFound();

  const boundUpdate = updateRobot.bind(null, robot.id);
  const boundDelete = deleteRobot.bind(null, robot.id);

  return (
    <AdminShell>
      <ToastFlash />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Edit Robot — {robot.nameEn}</h1>
        <DeleteConfirmButton label="robot" action={boundDelete} />
      </div>
      <div className="mt-6">
        <RobotForm robot={robot} members={members} technologies={technologies} projects={projects} action={boundUpdate} />
      </div>
    </AdminShell>
  );
}
