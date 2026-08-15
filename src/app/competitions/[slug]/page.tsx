import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Section } from "@/components/Section";
import { pageMetadata } from "@/lib/seo";
import { ImageGrid } from "@/components/ImageGrid";
import { MarkdownContent } from "@/components/MarkdownContent";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const competition = await prisma.competition.findUnique({ where: { slug } });
  if (!competition) return pageMetadata({ title: "Competition", path: `/competitions/${slug}` });
  return pageMetadata({
    title: competition.nameEn,
    description: competition.descriptionEn ?? undefined,
    path: `/competitions/${slug}`,
  });
}

// Docs/10 #31-34: competition page shows description, results (structured,
// per 05 §26-27), robots/projects fielded, and any awards won.
export default async function CompetitionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const competition = await prisma.competition.findUnique({
    where: { slug },
    include: {
      results: true,
      awards: { where: { isPublished: true } },
      robots: { include: { robot: true } },
      projects: { include: { project: true } },
      media: { include: { media: true }, orderBy: { order: "asc" } },
    },
  });

  if (!competition || competition.publicationStatus !== "PUBLISHED") notFound();

  return (
    <Section className="pt-3xl">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        Competitions {competition.year ? `/ ${competition.year}` : ""}
      </p>
      <h1 className="mt-4 max-w-3xl text-h1 font-bold">{competition.nameEn}</h1>
      {competition.descriptionEn && (
        <p className="mt-4 max-w-prose text-lg text-text-secondary">{competition.descriptionEn}</p>
      )}

      <div className="mt-10 flex flex-wrap gap-4 text-sm text-text-muted">
        {competition.organizationEn && <span>Organized by {competition.organizationEn}</span>}
        {competition.locationEn && <span>· {competition.locationEn}</span>}
      </div>

      {competition.contentEn && (
        <div className="mt-10">
          <MarkdownContent content={competition.contentEn} />
        </div>
      )}

      {competition.results.length > 0 && (
        <div className="mt-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-text-faint">Results</p>
          <div className="mt-4 divide-y divide-border rounded-lg border border-border bg-surface">
            {competition.results.map((r) => (
              <div key={r.id} className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="font-medium">{r.titleEn ?? r.stage ?? "Result"}</p>
                  {r.descriptionEn && <p className="text-sm text-text-muted">{r.descriptionEn}</p>}
                </div>
                <div className="text-right font-mono text-sm text-text-secondary">
                  {r.placement ? `#${r.placement}` : r.score}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {competition.awards.length > 0 && (
        <div className="mt-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-text-faint">Awards</p>
          <ul className="mt-4 space-y-2">
            {competition.awards.map((a) => (
              <li key={a.id} className="rounded-md border border-border bg-surface px-4 py-3">
                {a.titleEn}
              </li>
            ))}
          </ul>
        </div>
      )}

      {competition.media.length > 0 && (
        <div className="mt-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-text-faint">Gallery</p>
          <div className="mt-4">
            <ImageGrid media={competition.media.map((m) => m.media)} altFallback={competition.nameEn} />
          </div>
        </div>
      )}

      {(competition.robots.length > 0 || competition.projects.length > 0) && (
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {competition.robots.length > 0 && (
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-text-faint">Robots fielded</p>
              <ul className="mt-3 space-y-2">
                {competition.robots.map((r) => (
                  <li key={r.robotId}>
                    <Link href={`/work/robots/${r.robot.slug}`} className="text-accent hover:underline">
                      {r.robot.nameEn}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {competition.projects.length > 0 && (
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-text-faint">Related projects</p>
              <ul className="mt-3 space-y-2">
                {competition.projects.map((p) => (
                  <li key={p.projectId}>
                    <Link href={`/work/projects/${p.project.slug}`} className="text-accent hover:underline">
                      {p.project.titleEn}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </Section>
  );
}
