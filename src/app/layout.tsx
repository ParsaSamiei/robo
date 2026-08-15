import type { Metadata } from "next";
import { cookies } from "next/headers";
import "@/styles/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CircuitBackground } from "@/components/CircuitBackground";
import { getLocaleFromCookies, dirFor } from "@/lib/i18n";
import { siteUrl } from "@/lib/seo";

// Docs/19_SEO.md #5, #15: metadataBase drives every relative OG/canonical
// URL from NEXT_PUBLIC_SITE_URL; global fallback title/description here.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "IUST Robotics — Robotics Club at IUST",
    template: "%s | IUST Robotics",
  },
  description:
    "A robotics club at Iran University of Science and Technology focused on engineering, competition, research, education, and community.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocaleFromCookies();
  const dir = dirFor(locale);
  const cookieStore = await cookies();
  const theme = (cookieStore.get("iust_theme")?.value === "light" ? "light" : "dark") as
    | "light"
    | "dark";

  return (
    <html lang={locale} dir={dir} data-theme={theme}>
      <body className="min-h-screen bg-bg text-text-primary">
        <CircuitBackground />
        {/* relative + z-10: an explicit stacking context for all page
            content, so it reliably paints above the fixed background
            layer above regardless of position/transform used deeper in
            the tree (page sections, sticky header, etc). */}
        <div className="relative z-10">
          {/* Docs/21_ACCESSIBILITY.md #17: skip link, visible on focus */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[#11161B]"
          >
            Skip to main content
          </a>
          {/* Header and Footer are async server components (query SocialLink);
              React 19 types support this natively, no cast needed. */}
          <Header locale={locale} theme={theme} />
          <main id="main-content">{children}</main>
          <Footer locale={locale} />
        </div>
      </body>
    </html>
  );
}
