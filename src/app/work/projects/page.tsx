import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Section } from "@/components/Section";
import { EmptyState } from "@/components/EmptyState";
import { Reveal } from "@/components/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Projects", path: "/work/projects" });

export default async function ProjectsPage() {
  const projects = await prisma.project
    .findMany({
      where: { publicationStatus: "PUBLISHED" },
      orderBy: { updatedAt: "desc" },
      include: { technologies: { include: { technology: true } } },
    })
    .catch(() => []);

  return (
    <Section className="pt-3xl">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">Work / Projects</p>
      <h1 className="mt-4 text-h1 font-bold">Projects</h1>

      {projects.length === 0 ? (
        <div className="mt-10">
          <EmptyState message="No published projects yet." />
        </div>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.id} delayMs={Math.min(i, 5) * 60}>
              <Link
                href={`/work/projects/${project.slug}`}
                className="flex h-full flex-col rounded-lg border border-border bg-surface p-6 transition hover:border-accent"
              >
                <p className="font-mono text-xs uppercase tracking-widest text-text-faint">
                  {project.status}
                </p>
                <p className="mt-2 text-lg font-semibold">{project.titleEn}</p>
                {project.excerptEn && (
                  <p className="mt-2 flex-1 text-sm text-text-muted">{project.excerptEn}</p>
                )}
                {project.technologies.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((pt) => (
                      <span
                        key={pt.technologyId}
                        className="rounded-sm border border-border px-2 py-1 font-mono text-[11px] text-text-secondary"
                      >
                        {pt.technology.name}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
