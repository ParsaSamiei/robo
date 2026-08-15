import type { Metadata } from "next";

// Docs/19_SEO.md #5: production URL comes from NEXT_PUBLIC_SITE_URL, never
// hardcoded, and drives canonical URLs, sitemap, and Open Graph.
export function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

const siteName = "IUST Robotics";
const defaultDescription =
  "A robotics club at Iran University of Science and Technology focused on engineering, competition, research, education, and community.";

// Docs/19 #15-16: global fallback metadata + "[Page Name] | [Team Name]"
// title format (homepage uses the standalone tagline instead).
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title?: string;
  description?: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `${siteUrl()}${path}`;
  const resolvedTitle = title ? `${title} | ${siteName}` : `${siteName} — Robotics Club at IUST`;
  const resolvedDescription = description ?? defaultDescription;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: { canonical: url },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url,
      siteName,
      images: image ? [{ url: image }] : undefined,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: image ? [image] : undefined,
    },
  };
}
