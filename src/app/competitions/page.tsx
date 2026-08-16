import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Section } from "@/components/Section";
import { EmptyState } from "@/components/EmptyState";
import { Reveal } from "@/components/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Competitions", path: "/competitions" });

// Docs/10_INFORMATION_ARCHITECTURE.md #30-37: competitions listing, with a
// separate awards page and timeline/stats. RoboCup/SML are just data here,
// never hard-coded (per 05 §23).
export default async function CompetitionsPage() {
  const competitions = await prisma.competition
    .findMany({ where: { publicationStatus: "PUBLISHED" }, orderBy: { year: "desc" } })
    .catch(() => []);

  return (
    <Section className="pt-3xl">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">Competitions</p>
      <div className="mt-4 flex items-baseline justify-between">
        <h1 className="text-h1 font-bold">Competitions</h1>
        <Link href="/competitions/awards" className="text-sm font-medium text-accent hover:underline">
          Awards →
        </Link>
      </div>

      {competitions.length === 0 ? (
        <div className="mt-10">
          <EmptyState message="No published competitions yet." />
        </div>
      ) : (
        <div className="mt-10 space-y-4">
          {competitions.map((c, i) => (
            <Reveal key={c.id} delayMs={Math.min(i, 5) * 60}>
              <Link
                href={`/competitions/${c.slug}`}
                className="flex items-center justify-between rounded-lg border border-border bg-surface p-6 transition hover:border-accent"
              >
                <div>
                  <p className="font-semibold">{c.nameEn}</p>
                  {c.leagueEn && <p className="text-sm text-text-muted">{c.leagueEn}</p>}
                </div>
                <span className="font-mono text-sm text-text-faint">{c.year ?? ""}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
