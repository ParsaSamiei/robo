import { addResult, deleteResult, addAward, deleteAward } from "@/lib/competition-actions";
import { DeleteConfirmButton } from "@/components/admin/DeleteConfirmButton";
import type { CompetitionResult, Award } from "@prisma/client";

// Docs/06_ADMIN_PANEL.md #24: Results and Awards are managed inline within
// the competition editor rather than as separate top-level sections.
export function ResultsAndAwardsPanel({
  competitionId,
  results,
  awards,
}: {
  competitionId: string;
  results: CompetitionResult[];
  awards: Award[];
}) {
  const boundAddResult = addResult.bind(null, competitionId);
  const boundAddAward = addAward.bind(null, competitionId);

  return (
    <div className="mt-10 max-w-2xl space-y-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#7e8995]">Results</p>
        {results.length > 0 && (
          <div className="mt-3 divide-y divide-[#27323d] rounded-md border border-[#27323d]">
            {results.map((r) => (
              <div key={r.id} className="flex items-center justify-between px-4 py-3 text-sm">
                <div>
                  <p className="font-medium">{r.titleEn ?? r.stage ?? "Result"}</p>
                  <p className="text-xs text-[#7e8995]">
                    {r.placement ? `#${r.placement}` : ""} {r.score}
                  </p>
                </div>
                <DeleteConfirmButton label="result" action={deleteResult.bind(null, competitionId, r.id)} />
              </div>
            ))}
          </div>
        )}
        <form action={boundAddResult} className="mt-3 grid grid-cols-2 gap-2 rounded-md border border-dashed border-[#27323d] p-4">
          <input name="titleEn" placeholder="Title" className={inputClass} />
          <input name="stage" placeholder="Stage" className={inputClass} />
          <input name="placement" type="number" placeholder="Placement" className={inputClass} />
          <input name="score" placeholder="Score" className={inputClass} />
          <textarea name="descriptionEn" placeholder="Description" className={`${inputClass} col-span-2`} rows={2} />
          <button type="submit" className="col-span-2 rounded-md bg-[#27323d] px-3 py-1.5 text-xs font-medium hover:bg-[#33404c]">
            Add result
          </button>
        </form>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#7e8995]">Awards</p>
        {awards.length > 0 && (
          <div className="mt-3 divide-y divide-[#27323d] rounded-md border border-[#27323d]">
            {awards.map((a) => (
              <div key={a.id} className="flex items-center justify-between px-4 py-3 text-sm">
                <div>
                  <p className="font-medium">{a.titleEn}</p>
                  {a.year && <p className="text-xs text-[#7e8995]">{a.year}</p>}
                </div>
                <DeleteConfirmButton label="award" action={deleteAward.bind(null, competitionId, a.id)} />
              </div>
            ))}
          </div>
        )}
        <form action={boundAddAward} className="mt-3 grid grid-cols-2 gap-2 rounded-md border border-dashed border-[#27323d] p-4">
          <input name="titleEn" placeholder="Award title" required className={`${inputClass} col-span-2`} />
          <input name="year" type="number" placeholder="Year" className={inputClass} />
          <textarea name="descriptionEn" placeholder="Description" className={`${inputClass} col-span-2`} rows={2} />
          <button type="submit" className="col-span-2 rounded-md bg-[#27323d] px-3 py-1.5 text-xs font-medium hover:bg-[#33404c]">
            Add award
          </button>
        </form>
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-md border border-[#27323d] bg-[#0d1117] px-3 py-2 text-sm text-[#e6edf3] outline-none focus:border-[#d7a84b]";
