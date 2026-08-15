import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { CompetitionForm } from "@/components/admin/CompetitionForm";
import { ResultsAndAwardsPanel } from "@/components/admin/ResultsAndAwardsPanel";
import { ToastFlash } from "@/components/admin/ToastFlash";
import { DeleteConfirmButton } from "@/components/admin/DeleteConfirmButton";
import { updateCompetition, deleteCompetition } from "@/lib/competition-actions";

export const metadata = { title: "Edit Competition — Admin" };

export default async function EditCompetitionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const competition = await prisma.competition.findUnique({
    where: { id },
    include: { results: true, awards: true, media: { include: { media: true }, orderBy: { order: "asc" } } },
  });
  if (!competition) notFound();

  const boundUpdate = updateCompetition.bind(null, competition.id);
  const boundDelete = deleteCompetition.bind(null, competition.id);

  return (
    <AdminShell>
      <ToastFlash />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Edit Competition — {competition.nameEn}</h1>
        <DeleteConfirmButton label="competition" action={boundDelete} />
      </div>
      <div className="mt-6">
        <CompetitionForm competition={competition} action={boundUpdate} />
      </div>
      <ResultsAndAwardsPanel competitionId={competition.id} results={competition.results} awards={competition.awards} />
    </AdminShell>
  );
}
