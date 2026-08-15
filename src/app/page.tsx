import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Section } from "@/components/Section";
import { LinkButton } from "@/components/Button";
import { EmptyState } from "@/components/EmptyState";
import { Reveal } from "@/components/Reveal";
import { RobotViewerLazy as RobotViewer } from "@/components/RobotViewerLazy";
import { getLocaleFromCookies, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

// Docs/19_SEO.md #16: homepage uses the standalone tagline format rather
// than "[Page] | [Team Name]".
export const metadata = pageMetadata({
  title: undefined,
  description:
    "IUST Robotics is the student robotics club at Iran University of Science and Technology — designing, building, and competing with autonomous machines.",
  path: "/",
});

// Docs/10_INFORMATION_ARCHITECTURE.md #4: Hero -> Who We Are -> What We Build
// -> Featured Project/Robot -> Capabilities -> Competition -> Team -> Latest
// Work -> Sponsors -> Join -> Footer.
export default async function HomePage() {
  const locale = await getLocaleFromCookies();
  const dict = t(locale);

  const [featuredProject, featuredRobot, latestPosts, sponsors, currentMembersCount] =
    await Promise.all([
      prisma.project.findFirst({
        where: { publicationStatus: "PUBLISHED" },
        orderBy: { updatedAt: "desc" },
      }),
      prisma.robot.findFirst({
        where: { publicationStatus: "PUBLISHED" },
        orderBy: { updatedAt: "desc" },
      }),
      prisma.blogPost.findMany({
        where: { publicationStatus: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
        take: 3,
      }),
      prisma.sponsor.findMany({
        where: { publicationStatus: "PUBLISHED" },
        orderBy: [{ tier: { order: "asc" } }, { order: "asc" }],
        take: 8,
        include: { tier: true },
      }),
      prisma.member.count({ where: { membershipStatus: "CURRENT", isPublished: true } }),
    ]).catch(() => [null, null, [], [], 0] as const);

  return (
    <>
      {/* Hero — Docs/10 #5-7 */}
      <Section className="pt-3xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              Iran University of Science and Technology
            </p>
            <h1 className="mt-4 text-h1 font-bold leading-[0.95] text-text-primary">
              We build robots.
              <br />
              We compete.
              <br />
              We learn.
            </h1>
            <p className="mt-6 max-w-md text-base text-text-secondary">
              IUST Robotics is the university&apos;s student robotics club — designing,
              building, and competing with autonomous machines.
            </p>
            <p className="mt-3 font-mono text-xs uppercase tracking-widest text-text-faint">
              Currently competing in the Smart Manufacturing League — RoboCup Industrial
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <LinkButton href="/work" variant="primary">Explore our work</LinkButton>
              <LinkButton href="/join" variant="secondary">{dict.nav.join}</LinkButton>
            </div>
          </div>
          <div className="flex justify-center">
            <RobotViewer />
          </div>
        </div>
      </Section>

      {/* Who we are */}
      <Section className="border-t border-border">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-h3 font-semibold">Who we are</h2>
          </div>
          <div className="md:col-span-2">
            <p className="max-w-prose text-text-secondary">
              A student-run engineering team of {currentMembersCount || "—"} current members
              spanning mechanical, hardware, software, and management —
              designing real machines and competing on the international stage.
            </p>
            <Link href="/about" className="mt-4 inline-block text-sm font-medium text-accent hover:underline">
              About the club →
            </Link>
          </div>
        </div>
      </Section>

      {/* Featured project / robot */}
      <Section className="border-t border-border">
        <h2 className="text-h3 font-semibold">Featured work</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {featuredProject ? (
            <Reveal delayMs={0}>
              <Link
                href={`/work/projects/${featuredProject.slug}`}
                className="block rounded-lg border border-border bg-surface p-6 transition hover:border-accent"
              >
                <p className="font-mono text-xs uppercase tracking-widest text-text-faint">Project</p>
                <p className="mt-2 text-lg font-semibold">{featuredProject.titleEn}</p>
                {featuredProject.excerptEn && (
                  <p className="mt-2 text-sm text-text-muted">{featuredProject.excerptEn}</p>
                )}
              </Link>
            </Reveal>
          ) : (
            <EmptyState message={dict.common.empty} />
          )}
          {featuredRobot ? (
            <Reveal delayMs={60}>
              <Link
                href={`/work/robots/${featuredRobot.slug}`}
                className="block rounded-lg border border-border bg-surface p-6 transition hover:border-accent"
              >
                <p className="font-mono text-xs uppercase tracking-widest text-text-faint">Robot</p>
                <p className="mt-2 text-lg font-semibold">{featuredRobot.nameEn}</p>
                {featuredRobot.descriptionEn && (
                  <p className="mt-2 text-sm text-text-muted">{featuredRobot.descriptionEn}</p>
                )}
              </Link>
            </Reveal>
          ) : (
            <EmptyState message={dict.common.empty} />
          )}
        </div>
      </Section>

      {/* Latest work / journal */}
      <Section className="border-t border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-h3 font-semibold">Latest from the journal</h2>
          <Link href="/journal" className="text-sm font-medium text-accent hover:underline">
            {dict.common.viewAll}
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {latestPosts.length ? (
            latestPosts.map((post, i) => (
              <Reveal key={post.id} delayMs={i * 60}>
                <Link
                  href={`/journal/blog/${post.slug}`}
                  className="block rounded-lg border border-border bg-surface p-5 transition hover:border-accent"
                >
                  <p className="font-semibold">{post.titleEn}</p>
                  {post.excerptEn && (
                    <p className="mt-2 text-sm text-text-muted line-clamp-3">{post.excerptEn}</p>
                  )}
                </Link>
              </Reveal>
            ))
          ) : (
            <EmptyState message={dict.common.empty} />
          )}
        </div>
      </Section>

      {/* Sponsors */}
      <Section className="border-t border-border">
        <h2 className="text-h3 font-semibold">Sponsors &amp; partners</h2>
        {sponsors.length ? (
          <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-6 opacity-90">
            {sponsors.map((s) => (
              <span key={s.id} className="text-sm font-medium text-text-secondary">
                {s.name}
              </span>
            ))}
          </div>
        ) : (
          <div className="mt-8">
            <EmptyState message={dict.common.empty} />
          </div>
        )}
        <Link href="/sponsors" className="mt-4 inline-block text-sm font-medium text-accent hover:underline">
          {dict.common.viewAll} →
        </Link>
      </Section>

      {/* Join */}
      <Section className="border-t border-border">
        <div className="rounded-lg border border-border bg-gradient-to-br from-surface to-surface-elevated p-10 text-center">
          <h2 className="text-h3 font-semibold">Want to build with us?</h2>
          <p className="mx-auto mt-3 max-w-md text-text-secondary">
            We recruit across mechanical, hardware, software, and management every term.
          </p>
          <LinkButton href="/join" variant="primary" className="mt-6">
            {dict.nav.join}
          </LinkButton>
        </div>
      </Section>
    </>
  );
}
