import Link from "next/link";
import { Section } from "@/components/Section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Work", path: "/work" });

export default function WorkHubPage() {
  return (
    <Section className="pt-3xl">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">Work</p>
      <h1 className="mt-4 text-h1 font-bold">What we build</h1>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Link
          href="/work/projects"
          className="rounded-lg border border-border bg-surface p-8 transition hover:border-accent"
        >
          <p className="text-h3 font-semibold">Projects</p>
          <p className="mt-2 text-text-muted">
            The software, mechanical, and research efforts behind everything we build.
          </p>
        </Link>
        <Link
          href="/work/robots"
          className="rounded-lg border border-border bg-surface p-8 transition hover:border-accent"
        >
          <p className="text-h3 font-semibold">Robots</p>
          <p className="mt-2 text-text-muted">
            The physical machines that come out of our projects.
          </p>
        </Link>
      </div>
    </Section>
  );
}
