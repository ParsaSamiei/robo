import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Section } from "@/components/Section";
import { pageMetadata } from "@/lib/seo";
import { ImageGrid } from "@/components/ImageGrid";
import { MarkdownContent } from "@/components/MarkdownContent";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) return pageMetadata({ title: "Project", path: `/work/projects/${slug}` });
  return pageMetadata({
    title: project.seoTitleEn ?? project.titleEn,
    description: project.seoDescriptionEn ?? project.excerptEn ?? undefined,
    path: `/work/projects/${slug}`,
  });
}

// Docs/10_INFORMATION_ARCHITECTURE.md #19-20: project detail with members,
// technologies, robots, competitions used, and a GitHub link when available.
export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      members: { include: { member: true } },
      technologies: { include: { technology: true } },
      robots: { include: { robot: true } },
      competitions: { include: { competition: true } },
      media: { include: { media: true }, orderBy: { order: "asc" } },
    },
  });

  if (!project || project.publicationStatus !== "PUBLISHED") notFound();

  return (
    <Section className="pt-3xl">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        Work / Projects / {project.status}
      </p>
      <h1 className="mt-4 max-w-3xl text-h1 font-bold">{project.titleEn}</h1>
      {project.excerptEn && (
        <p className="mt-4 max-w-prose text-lg text-text-secondary">{project.excerptEn}</p>
      )}

      {project.media.length > 0 && (
        <div className="mt-8">
          <ImageGrid media={project.media.map((m) => m.media)} altFallback={project.titleEn} />
        </div>
      )}

      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium hover:border-accent"
        >
          View on GitHub →
        </a>
      )}

      <div className="mt-12 grid gap-10 md:grid-cols-3">
        <div className="md:col-span-2">
          {project.contentEn && (
            <MarkdownContent content={project.contentEn} />
          )}

          {project.robots.length > 0 && (
            <div className="mt-10">
              <p className="text-sm font-semibold uppercase tracking-wide text-text-faint">Robots</p>
              <ul className="mt-3 space-y-2">
                {project.robots.map((r) => (
                  <li key={r.robotId}>
                    <Link href={`/work/robots/${r.robot.slug}`} className="text-accent hover:underline">
                      {r.robot.nameEn}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.competitions.length > 0 && (
            <div className="mt-10">
              <p className="text-sm font-semibold uppercase tracking-wide text-text-faint">
                Competitions
              </p>
              <ul className="mt-3 space-y-2">
                {project.competitions.map((c) => (
                  <li key={c.competitionId}>
                    <Link
                      href={`/competitions/${c.competition.slug}`}
                      className="text-accent hover:underline"
                    >
                      {c.competition.nameEn}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className="space-y-8">
          {project.members.length > 0 && (
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-text-faint">Team</p>
              <ul className="mt-3 space-y-2">
                {project.members.map((pm) => (
                  <li key={pm.memberId}>
                    <Link href={`/team/members/${pm.member.slug}`} className="text-text-secondary hover:text-text-primary">
                      {pm.member.name}
                      {pm.roleEn && <span className="text-text-faint"> — {pm.roleEn}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.technologies.length > 0 && (
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-text-faint">
                Technologies
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((pt) => (
                  <span
                    key={pt.technologyId}
                    className="rounded-sm border border-border px-2 py-1 font-mono text-[11px] text-text-secondary"
                  >
                    {pt.technology.name}
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
