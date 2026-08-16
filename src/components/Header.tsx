import Link from "next/link";
// TODO: re-enable once translations are ready -- see MobileMenu.tsx for the
// matching change.
// import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LinkButton } from "@/components/Button";
import { MobileMenu } from "@/components/MobileMenu";
import { prisma } from "@/lib/prisma";
import { type Locale, t } from "@/lib/i18n";

// Docs/10_INFORMATION_ARCHITECTURE.md #1: WORK / TEAM / COMPETITIONS /
// JOURNAL / ABOUT + a prominent JOIN THE TEAM CTA. Kept intentionally small
// per #2 ("Do not put every page in the main navigation").
// Docs/23_RESPONSIVE_DESIGN.md #23-27: below md, the header collapses to
// Logo + Menu button (not a shrunken desktop nav), stays compact, and the
// primary CTA stays reachable outside the menu too.
export async function Header({ locale, theme }: { locale: Locale; theme: "dark" | "light" }) {
  const dict = t(locale);
  const links = [
    { href: "/work", label: dict.nav.work },
    { href: "/team", label: dict.nav.team },
    { href: "/competitions", label: dict.nav.competitions },
    { href: "/journal", label: dict.nav.journal },
    { href: "/about", label: dict.nav.about },
  ];

  const socialLinks = await prisma.socialLink
    .findMany({ where: { isEnabled: true }, orderBy: { order: "asc" } })
    .catch(() => []);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg/85 backdrop-blur">
      <div className="mx-auto flex max-w-container items-center justify-between px-md py-3 md:py-4 md:px-xl">
        <Link href="/" className="font-mono text-sm font-semibold tracking-widest text-text-primary">
          IUST ROBOTICS
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md border border-transparent px-3.5 py-2 text-sm font-medium text-text-secondary transition-all duration-150 ease-out hover:-translate-y-px hover:border-border hover:bg-surface hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle theme={theme} />
            {/* TODO: re-enable once translations are ready */}
            {/* <LanguageSwitcher locale={locale} /> */}
          </div>
          <LinkButton href="/join" variant="primary" className="hidden text-xs md:inline-flex md:text-sm">
            {dict.nav.join}
          </LinkButton>

          <MobileMenu
            links={links}
            locale={locale}
            theme={theme}
            joinLabel={dict.nav.join}
            socialLinks={socialLinks}
          />
        </div>
      </div>
    </header>
  );
}
