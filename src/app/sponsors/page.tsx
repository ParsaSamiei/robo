import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Section } from "@/components/Section";
import { EmptyState } from "@/components/EmptyState";
import { LinkButton } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Sponsors", path: "/sponsors" });

// Docs/10 #45-49: Why we work with sponsors -> tiers -> current sponsors ->
// partners -> become a sponsor. Sponsors and Partners are kept as distinct
// sections (05 §41: "Sponsors and partners should remain distinct").
export default async function SponsorsPage() {
  const [tiers, partners] = await Promise.all([
    prisma.sponsorTier.findMany({
      orderBy: { order: "asc" },
      include: {
        sponsors: {
          where: { publicationStatus: "PUBLISHED" },
          orderBy: { order: "asc" },
          include: { logo: true },
        },
      },
    }),
    prisma.partner.findMany({ where: { publicationStatus: "PUBLISHED" }, orderBy: { order: "asc" }, include: { logo: true } }),
  ]).catch(() => [[], []] as const);

  const hasSponsors = tiers.some((t) => t.sponsors.length > 0);

  return (
    <Section className="pt-3xl">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">Sponsors</p>
      <h1 className="mt-4 text-h1 font-bold">Sponsors &amp; Partners</h1>
      <p className="mt-4 max-w-prose text-text-secondary">
        Our sponsors make it possible to design, build, and travel to compete with real
        hardware. In return, they get visibility with one of the strongest engineering
        teams at the university.
      </p>

      {!hasSponsors ? (
        <div className="mt-12">
          <EmptyState message="No published sponsors yet." />
        </div>
      ) : (
        <div className="mt-12 space-y-12">
          {tiers.map((tier) =>
            tier.sponsors.length === 0 ? null : (
              <div key={tier.id}>
                <p className="text-sm font-semibold uppercase tracking-wide text-text-faint">
                  {tier.nameEn}
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {tier.sponsors.map((s, i) => (
                    <Reveal key={s.id} delayMs={Math.min(i, 5) * 60}>
                      <a
                        href={s.websiteUrl ?? "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-full flex-col items-center justify-center rounded-lg border border-border bg-surface p-6 text-center transition hover:border-accent"
                      >
                        {s.logo?.mediumPath ? (
                          <div className="relative h-12 w-full max-w-[140px]">
                            <Image
                              src={s.logo.mediumPath}
                              alt={s.logo.altTextEn ?? s.name}
                              fill
                              sizes="140px"
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <span className="font-semibold">{s.name}</span>
                        )}
                        {s.descriptionEn && (
                          <span className="mt-1 text-xs text-text-muted">{s.descriptionEn}</span>
                        )}
                      </a>
                    </Reveal>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}

      {partners.length > 0 && (
        <div className="mt-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-text-faint">
            Partner organizations
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            {partners.map((p) => (
              <a
                key={p.id}
                href={p.websiteUrl ?? "#"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm hover:border-accent"
              >
                {p.logo?.thumbnailPath && (
                  <span className="relative h-6 w-6 flex-shrink-0">
                    <Image src={p.logo.thumbnailPath} alt="" fill sizes="24px" className="object-contain" />
                  </span>
                )}
                {p.name}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="mt-16 rounded-lg border border-border bg-gradient-to-br from-surface to-surface-elevated p-10 text-center">
        <h2 className="text-h3 font-semibold">Become a sponsor</h2>
        <p className="mx-auto mt-3 max-w-md text-text-secondary">
          Reach out to talk about sponsorship tiers and what we can offer in return.
        </p>
        <LinkButton href="/contact" variant="primary" className="mt-6">
          Contact us
        </LinkButton>
      </div>
    </Section>
  );
}
