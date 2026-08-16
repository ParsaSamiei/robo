import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { type Locale, t } from "@/lib/i18n";

export async function Footer({ locale }: { locale: Locale }) {
  const dict = t(locale);

  // Docs/05_DATABASE_SCHEMA.md #48-49: SocialLink { platform, url, isEnabled, order }
  const socialLinks = await prisma.socialLink
    .findMany({
      where: { isEnabled: true },
      orderBy: { order: "asc" },
    })
    .catch(() => []);

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-secondary/60">
      <div className="mx-auto max-w-container px-md py-xl md:px-xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-mono text-sm font-semibold tracking-widest text-text-primary">
              IUST ROBOTICS
            </p>
            <p className="mt-2 max-w-sm text-sm text-text-muted">
              Iran University of Science and Technology — student robotics club.
            </p>
          </div>

          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-text-faint">
                {dict.nav.work}
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link className="text-text-secondary hover:text-text-primary" href="/work/projects">Projects</Link></li>
                <li><Link className="text-text-secondary hover:text-text-primary" href="/work/robots">Robots</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-text-faint">
                {dict.nav.journal}
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link className="text-text-secondary hover:text-text-primary" href="/journal/news">News</Link></li>
                <li><Link className="text-text-secondary hover:text-text-primary" href="/journal/blog">Blog</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-text-faint">
                {dict.nav.contact}
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link className="text-text-secondary hover:text-text-primary" href="/contact">{dict.nav.contact}</Link></li>
                <li><Link className="text-text-secondary hover:text-text-primary" href="/join">{dict.nav.join}</Link></li>
                {socialLinks.map((s) => (
                  <li key={s.id}>
                    <a
                      className="text-text-secondary hover:text-text-primary"
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {s.platform.charAt(0) + s.platform.slice(1).toLowerCase()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-xl border-t border-border pt-6 text-xs text-text-faint">
          © {year} IUST Robotics. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
