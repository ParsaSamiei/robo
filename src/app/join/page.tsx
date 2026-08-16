import { prisma } from "@/lib/prisma";
import { Section } from "@/components/Section";
import { JoinForm } from "@/components/JoinForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Join the Team", path: "/join" });

const areas = [
  { title: "Mechanical", body: "CAD, manufacturing, structural design, and mechanisms." },
  { title: "Hardware / Electronics", body: "PCB design, sensors, actuators, wiring, embedded systems." },
  { title: "Software", body: "Perception, control, planning, simulation, and tooling." },
  { title: "Management", body: "Sponsorship, logistics, media, and team operations." },
];

// Docs/10 #51-53: explain who should apply / what areas exist / selection
// process, then the form. Beginners explicitly welcome, no gatekeeping tone.
// No resume upload -- applicants who want to share one (or just talk to a
// person) are given the club's phone number instead, sourced from
// SiteSetting (key: contact_phone, editable at /admin/settings).
export default async function JoinPage() {
  const [departments, contactPhoneSetting] = await Promise.all([
    prisma.department.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
    prisma.siteSetting.findUnique({ where: { key: "contact_phone" } }),
  ]).catch(
    (): [
      Awaited<ReturnType<typeof prisma.department.findMany>>,
      Awaited<ReturnType<typeof prisma.siteSetting.findUnique>>,
    ] => [[], null]
  );

  return (
    <>
      <Section className="pt-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Join</p>
        <h1 className="mt-4 max-w-2xl text-h1 font-bold">Build something real with us.</h1>
        <p className="mt-6 max-w-prose text-text-secondary">
          We recruit students at every skill level — from first-years who want to learn to
          weld and solder, to experienced engineers who want to lead a subsystem. No prior
          robotics experience is required.
        </p>
        {contactPhoneSetting?.value && (
          <p className="mt-4 text-sm text-text-muted">
            Prefer to talk it through first — or share a resume directly? Call us at{" "}
            <a href={`tel:${contactPhoneSetting.value}`} className="font-medium text-accent hover:underline">
              {contactPhoneSetting.value}
            </a>
            .
          </p>
        )}
      </Section>

      <Section className="border-t border-border">
        <h2 className="text-h3 font-semibold">Areas</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {areas.map((a) => (
            <div key={a.title} className="rounded-lg border border-border bg-surface p-5">
              <p className="font-semibold">{a.title}</p>
              <p className="mt-2 text-sm text-text-muted">{a.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <h2 className="text-h3 font-semibold">Apply</h2>
        <div className="mt-8 max-w-2xl">
          <JoinForm departments={departments} />
        </div>
      </Section>
    </>
  );
}
