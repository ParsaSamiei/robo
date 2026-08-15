import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { siteUrl } from "@/lib/seo";

// Docs/19_SEO.md #5: sitemap URLs derived from the configured production
// domain, never hardcoded. Static routes + every published dynamic entity.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();

  const staticRoutes = [
    "",
    "/about",
    "/work",
    "/work/projects",
    "/work/robots",
    "/team",
    "/team/current",
    "/team/alumni",
    "/competitions",
    "/competitions/awards",
    "/journal",
    "/journal/news",
    "/journal/blog",
    "/gallery",
    "/sponsors",
    "/join",
    "/contact",
  ].map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));

  const [projects, robots, competitions, members, posts] = await Promise.all([
    prisma.project.findMany({ where: { publicationStatus: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
    prisma.robot.findMany({ where: { publicationStatus: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
    prisma.competition.findMany({ where: { publicationStatus: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
    prisma.member.findMany({ where: { isPublished: true }, select: { slug: true, updatedAt: true } }),
    prisma.blogPost.findMany({ where: { publicationStatus: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
  ]).catch(() => [[], [], [], [], []] as const);

  const dynamicRoutes = [
    ...projects.map((p) => ({ url: `${base}/work/projects/${p.slug}`, lastModified: p.updatedAt })),
    ...robots.map((r) => ({ url: `${base}/work/robots/${r.slug}`, lastModified: r.updatedAt })),
    ...competitions.map((c) => ({ url: `${base}/competitions/${c.slug}`, lastModified: c.updatedAt })),
    ...members.map((m) => ({ url: `${base}/team/members/${m.slug}`, lastModified: m.updatedAt })),
    ...posts.map((p) => ({ url: `${base}/journal/blog/${p.slug}`, lastModified: p.updatedAt })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
