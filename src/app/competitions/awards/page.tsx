import { prisma } from "@/lib/prisma";
import { Section } from "@/components/Section";
import { EmptyState } from "@/components/EmptyState";
import { Reveal } from "@/components/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Awards", path: "/competitions/awards" });

export default async function AwardsPage() {
  const awards = await prisma.award
    .findMany({
      where: { isPublished: true },
      orderBy: { year: "desc" },
      include: { competition: true },
    })
    .catch(() => []);

  return (
    <Section className="pt-3xl">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">Competitions / Awards</p>
      <h1 className="mt-4 text-h1 font-bold">Awards</h1>

      {awards.length === 0 ? (
        <div className="mt-10">
          <EmptyState message="No published awards yet." />
        </div>
      ) : (
        <div className="mt-10 space-y-4">
          {awards.map((a, i) => (
            <Reveal key={a.id} delayMs={Math.min(i, 5) * 60}>
              <div className="rounded-lg border border-border bg-surface p-5">
                <div className="flex items-baseline justify-between">
                  <p className="font-semibold">{a.titleEn}</p>
                  {a.year && <span className="font-mono text-sm text-text-faint">{a.year}</span>}
                </div>
                {a.descriptionEn && <p className="mt-2 text-sm text-text-muted">{a.descriptionEn}</p>}
                {a.competition && (
                  <p className="mt-2 font-mono text-xs uppercase tracking-wide text-text-faint">
                    {a.competition.nameEn}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
