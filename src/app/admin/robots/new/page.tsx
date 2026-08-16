import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { RobotForm } from "@/components/admin/RobotForm";
import { createRobot } from "@/lib/robot-actions";

export const metadata = { title: "New Robot — Admin" };

export default async function NewRobotPage() {
  const [members, technologies, projects] = await Promise.all([
    prisma.member.findMany({ orderBy: { name: "asc" } }),
    prisma.technology.findMany({ orderBy: { name: "asc" } }),
    prisma.project.findMany({ orderBy: { titleEn: "asc" } }),
  ]);

  return (
    <AdminShell>
      <h1 className="text-xl font-semibold">New Robot</h1>
      <div className="mt-6">
        <RobotForm members={members} technologies={technologies} projects={projects} action={createRobot} />
      </div>
    </AdminShell>
  );
}
