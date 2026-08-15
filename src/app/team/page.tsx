import Link from "next/link";
import { Section } from "@/components/Section";
import { pageMetadata } from "@/lib/seo";

// Docs/10_INFORMATION_ARCHITECTURE.md #24-29: team split into Current
// Members and Alumni, plus individual member detail pages.
export const metadata = pageMetadata({ title: "Team", path: "/team" });

export default function TeamHubPage() {
  return (
    <Section className="pt-3xl">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">Team</p>
      <h1 className="mt-4 text-h1 font-bold">The people behind the machines</h1>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/team/current" className="rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:border-accent">
          Current Members
        </Link>
        <Link href="/team/alumni" className="rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:border-accent">
          Alumni
        </Link>
      </div>
    </Section>
  );
}
