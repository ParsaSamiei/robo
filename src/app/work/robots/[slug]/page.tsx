import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Section } from "@/components/Section";
import { pageMetadata } from "@/lib/seo";
import { ImageGrid } from "@/components/ImageGrid";
import { MarkdownContent } from "@/components/MarkdownContent";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const robot = await prisma.robot.findUnique({ where: { slug } });
  if (!robot) return pageMetadata({ title: "Robot", path: `/work/robots/${slug}` });
  return pageMetadata({
    title: robot.seoTitleEn ?? robot.nameEn,
    description: robot.seoDescriptionEn ?? robot.descriptionEn ?? undefined,
    path: `/work/robots/${slug}`,
  });
}

export default async function RobotDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const robot = await prisma.robot.findUnique({
    where: { slug },
    include: {
      members: { include: { member: true } },
      technologies: { include: { technology: true } },
      projects: { include: { project: true } },
      competitions: { include: { competition: true } },
      media: { include: { media: true }, orderBy: { order: "asc" } },
    },
  });

  if (!robot || robot.publicationStatus !== "PUBLISHED") notFound();

  const specRows: [string, string][] = [
    ["Status", robot.status],
    ...(robot.projects.length ? ([["Projects", robot.projects.map((p) => p.project.titleEn).join(", ")]] as [string, string][]) : []),
  ];

  return (
    <Section className="pt-3xl">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">Work / Robots</p>
      <h1 className="mt-4 max-w-3xl text-h1 font-bold">{robot.nameEn}</h1>
      {robot.descriptionEn && (
        <p className="mt-4 max-w-prose text-lg text-text-secondary">{robot.descriptionEn}</p>
      )}

      {robot.media.length > 0 && (
        <div className="mt-8">
          <ImageGrid media={robot.media.map((m) => m.media)} altFallback={robot.nameEn} />
        </div>
      )}

      <div className="mt-12 grid gap-10 md:grid-cols-3">
        <div className="md:col-span-2">
          {robot.contentEn && (
            <MarkdownContent content={robot.contentEn} />
          )}

          {robot.competitions.length > 0 && (
            <div className="mt-10">
              <p className="text-sm font-semibold uppercase tracking-wide text-text-faint">
                Competitions
              </p>
              <ul className="mt-3 space-y-2">
                {robot.competitions.map((c) => (
                  <li key={c.competitionId}>
                    <Link href={`/competitions/${c.competition.slug}`} className="text-accent hover:underline">
                      {c.competition.nameEn}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className="space-y-8">
          {/* Spec sheet, per §23 "Robot Specification Layout" */}
          <div className="rounded-lg border border-border bg-surface p-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-text-faint">Spec</p>
            <dl className="mt-3 space-y-2 text-sm">
              {specRows.map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 border-b border-border/60 pb-2">
                  <dt className="text-text-muted">{label}</dt>
                  <dd className="text-right text-text-secondary">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {robot.members.length > 0 && (
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-text-faint">Team</p>
              <ul className="mt-3 space-y-2">
                {robot.members.map((rm) => (
                  <li key={rm.memberId}>
                    <Link href={`/team/members/${rm.member.slug}`} className="text-text-secondary hover:text-text-primary">
                      {rm.member.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {robot.technologies.length > 0 && (
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-text-faint">
                Technologies
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {robot.technologies.map((rt) => (
                  <span
                    key={rt.technologyId}
                    className="rounded-sm border border-border px-2 py-1 font-mono text-[11px] text-text-secondary"
                  >
                    {rt.technology.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </Section>
  );
}
