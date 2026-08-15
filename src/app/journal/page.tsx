import Link from "next/link";
import { Section } from "@/components/Section";
import { pageMetadata } from "@/lib/seo";

// Docs/10_INFORMATION_ARCHITECTURE.md #38-41: News (short updates) and Blog
// (technical articles) kept as separate content types.
export const metadata = pageMetadata({ title: "Journal", path: "/journal" });

export default function JournalHubPage() {
  return (
    <Section className="pt-3xl">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">Journal</p>
      <h1 className="mt-4 text-h1 font-bold">Journal</h1>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Link href="/journal/news" className="rounded-lg border border-border bg-surface p-8 transition hover:border-accent">
          <p className="text-h3 font-semibold">News</p>
          <p className="mt-2 text-text-muted">Short updates on what the club is doing right now.</p>
        </Link>
        <Link href="/journal/blog" className="rounded-lg border border-border bg-surface p-8 transition hover:border-accent">
          <p className="text-h3 font-semibold">Blog</p>
          <p className="mt-2 text-text-muted">Technical articles about how we build things.</p>
        </Link>
      </div>
    </Section>
  );
}
