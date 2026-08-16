import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Section } from "@/components/Section";
import { EmptyState } from "@/components/EmptyState";
import { Reveal } from "@/components/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Robots", path: "/work/robots" });

// Docs/10_INFORMATION_ARCHITECTURE.md #21-23: robot listing + spec-sheet
// style detail pages.
export default async function RobotsPage() {
  const robots = await prisma.robot
    .findMany({ where: { publicationStatus: "PUBLISHED" }, orderBy: { updatedAt: "desc" } })
    .catch(() => []);

  return (
    <Section className="pt-3xl">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">Work / Robots</p>
      <h1 className="mt-4 text-h1 font-bold">Robots</h1>

      {robots.length === 0 ? (
        <div className="mt-10">
          <EmptyState message="No published robots yet." />
        </div>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {robots.map((robot, i) => (
            <Reveal key={robot.id} delayMs={Math.min(i, 5) * 60}>
              <Link
                href={`/work/robots/${robot.slug}`}
                className="flex h-full flex-col rounded-lg border border-border bg-surface p-6 transition hover:border-accent"
              >
                <p className="font-mono text-xs uppercase tracking-widest text-text-faint">{robot.status}</p>
                <p className="mt-2 text-lg font-semibold">{robot.nameEn}</p>
                {robot.descriptionEn && (
                  <p className="mt-2 text-sm text-text-muted">{robot.descriptionEn}</p>
                )}
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
