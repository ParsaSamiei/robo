import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Section } from "@/components/Section";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = await prisma.member.findUnique({ where: { slug } });
  if (!member) return pageMetadata({ title: "Member", path: `/team/members/${slug}` });
  return pageMetadata({
    title: member.seoTitleEn ?? member.name,
    description: member.seoDescriptionEn ?? undefined,
    path: `/team/members/${slug}`,
  });
}

export default async function MemberDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = await prisma.member.findUnique({
    where: { slug },
    include: {
      departments: { include: { department: true } },
      technologies: { include: { technology: true } },
      projects: { include: { project: true } },
      robots: { include: { robot: true } },
      photo: true,
    },
  });

  if (!member || !member.isPublished) notFound();

  return (
    <Section className="pt-3xl">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        Team / {member.membershipStatus === "CURRENT" ? "Current" : "Alumni"}
      </p>
      <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-start">
        <div className="relative h-40 w-40 flex-shrink-0 overflow-hidden rounded-lg bg-surface-elevated">
          {member.photo?.mediumPath && (
            <Image
              src={member.photo.mediumPath}
              alt={member.photo.altTextEn ?? member.name}
              fill
              sizes="160px"
              className="object-cover"
            />
          )}
        </div>
        <div>
          <h1 className="text-h1 font-bold">{member.name}</h1>
          {member.roleEn && <p className="mt-1 text-lg text-text-secondary">{member.roleEn}</p>}
          {member.departments.length > 0 && (
            <p className="mt-2 font-mono text-xs uppercase tracking-wide text-text-faint">
              {member.departments.map((d) => d.department.nameEn).join(" · ")}
            </p>
          )}
          <div className="mt-4 flex gap-4 text-sm">
            {member.githubUrl && (
              <a href={member.githubUrl} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                GitHub
              </a>
            )}
            {member.personalWebsiteUrl && (
              <a href={member.personalWebsiteUrl} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                Website
              </a>
            )}
          </div>
        </div>
      </div>

      {member.bioEn && (
        <p className="prose-measure mt-10 whitespace-pre-line text-text-secondary">{member.bioEn}</p>
      )}

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {member.projects.length > 0 && (
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-text-faint">Projects</p>
            <ul className="mt-3 space-y-2">
              {member.projects.map((pm) => (
                <li key={pm.projectId}>
                  <Link href={`/work/projects/${pm.project.slug}`} className="text-accent hover:underline">
                    {pm.project.titleEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {member.robots.length > 0 && (
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-text-faint">Robots</p>
            <ul className="mt-3 space-y-2">
              {member.robots.map((rm) => (
                <li key={rm.robotId}>
                  <Link href={`/work/robots/${rm.robot.slug}`} className="text-accent hover:underline">
                    {rm.robot.nameEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Section>
  );
}
