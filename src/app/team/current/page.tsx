import { prisma } from "@/lib/prisma";
import { Section } from "@/components/Section";
import { MemberGrid } from "@/components/MemberGrid";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Current Members", path: "/team/current" });

export default async function CurrentMembersPage() {
  const members = await prisma.member
    .findMany({
      where: { membershipStatus: "CURRENT", isPublished: true },
      orderBy: { name: "asc" },
      include: { departments: { include: { department: true } }, photo: true },
    })
    .catch(() => []);

  return (
    <Section className="pt-3xl">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">Team / Current</p>
      <h1 className="mt-4 text-h1 font-bold">Current Members</h1>
      <div className="mt-10">
        <MemberGrid members={members} />
      </div>
    </Section>
  );
}
