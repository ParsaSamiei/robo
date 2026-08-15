import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { pageMetadata } from "@/lib/seo";

// Docs/10_INFORMATION_ARCHITECTURE.md #8-16: club identity, IUST
// relationship, mission across Engineering / Competition / Education /
// Research / Community. Static/cached page (09 §3).
export const metadata = pageMetadata({ title: "About", path: "/about" });

const pillars = [
  { title: "Engineering", body: "Designing and building real robotic systems, end to end." },
  { title: "Competition", body: "Testing our work against the world's best student teams." },
  { title: "Education", body: "Teaching each new generation of members the skills to build." },
  { title: "Research", body: "Exploring problems that don't have off-the-shelf answers yet." },
  { title: "Community", body: "A team that grows engineers as much as it grows robots." },
];

// Docs/10 #35: "Once the club has several years of activity, the
// competition timeline can become a dedicated history page" -- until then
// it lives here as a section on About.
export default async function AboutPage() {
  const timelineEvents = await prisma.timelineEvent
    .findMany({ where: { isPublished: true }, orderBy: { order: "asc" }, include: { media: true } })
    .catch(() => []);

  return (
    <>
      <Section className="pt-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">About</p>
        <h1 className="mt-4 max-w-2xl text-h1 font-bold leading-tight">
          A student robotics club at Iran University of Science and Technology.
        </h1>
        <p className="mt-6 max-w-prose text-text-secondary">
          IUST Robotics operates within the university, bringing together students across
          mechanical, hardware, software, and management to design and build competition-grade
          robots.
        </p>
      </Section>

      <Section className="border-t border-border">
        <h2 className="text-h3 font-semibold">Mission</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delayMs={i * 60}>
              <div className="h-full rounded-lg border border-border bg-surface p-5">
                <p className="font-semibold">{p.title}</p>
                <p className="mt-2 text-sm text-text-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {timelineEvents.length > 0 && (
        <Section className="border-t border-border">
          <h2 className="text-h3 font-semibold">History</h2>
          <div className="mt-8 space-y-8 border-l border-border pl-6">
            {timelineEvents.map((event, i) => (
              <Reveal key={event.id} delayMs={Math.min(i, 5) * 60}>
                <div className="relative">
                  <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
                  {event.date && (
                    <p className="font-mono text-xs uppercase tracking-wide text-text-faint">
                      {event.date.toLocaleDateString("en-US", { year: "numeric", month: "long" })}
                    </p>
                  )}
                  <p className="mt-1 font-semibold">{event.titleEn}</p>
                  {event.descriptionEn && <p className="mt-1 text-sm text-text-muted">{event.descriptionEn}</p>}
                  {event.media?.mediumPath && (
                    <div className="relative mt-3 aspect-video w-full max-w-sm overflow-hidden rounded-md">
                      <Image
                        src={event.media.mediumPath}
                        alt={event.media.altTextEn ?? event.titleEn}
                        fill
                        sizes="384px"
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
