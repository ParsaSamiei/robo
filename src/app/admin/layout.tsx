import type { Metadata } from "next";

// Docs/19_SEO.md doesn't call this out explicitly, but §5-7 (canonical
// production domain, one indexable identity per URL) implies admin/back-
// office routes should never be indexed. Applies to every /admin/* page,
// including /admin/login.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminSectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
