import { prisma } from "@/lib/prisma";
import { Section } from "@/components/Section";
import { MemberGrid } from "@/components/MemberGrid";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Alumni", path: "/team/alumni" });

// Docs/05_DATABASE_SCHEMA.md #8: members are never deleted on leaving --
// they're marked ALUMNI, preserving organizational history.
export default async function AlumniPage() {
  const members = await prisma.member
    .findMany({
      where: { membershipStatus: "ALUMNI", isPublished: true },
      orderBy: { name: "asc" },
      include: { departments: { include: { department: true } }, photo: true },
    })
    .catch(() => []);

  return (
    <Section className="pt-3xl">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">Team / Alumni</p>
      <h1 className="mt-4 text-h1 font-bold">Alumni</h1>
      <div className="mt-10">
        <MemberGrid members={members} />
      </div>
    </Section>
  );
}
