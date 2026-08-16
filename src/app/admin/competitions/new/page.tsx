import { AdminShell } from "@/components/admin/AdminShell";
import { CompetitionForm } from "@/components/admin/CompetitionForm";
import { createCompetition } from "@/lib/competition-actions";

export const metadata = { title: "New Competition — Admin" };

export default function NewCompetitionPage() {
  return (
    <AdminShell>
      <h1 className="text-xl font-semibold">New Competition</h1>
      <div className="mt-6">
        <CompetitionForm action={createCompetition} />
      </div>
    </AdminShell>
  );
}
