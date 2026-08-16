import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Section } from "@/components/Section";
import { EmptyState } from "@/components/EmptyState";
import { Reveal } from "@/components/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Blog", path: "/journal/blog" });

// Docs/10 #41: technical articles, may be written by members (authorId FK).
export default async function BlogPage() {
  const posts = await prisma.blogPost
    .findMany({
      where: { publicationStatus: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      include: { author: true, coverMedia: true },
    })
    .catch(() => []);

  return (
    <Section className="pt-3xl">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">Journal / Blog</p>
      <h1 className="mt-4 text-h1 font-bold">Blog</h1>

      {posts.length === 0 ? (
        <div className="mt-10">
          <EmptyState message="No blog posts yet." />
        </div>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {posts.map((post, i) => (
            <Reveal key={post.id} delayMs={Math.min(i, 5) * 60}>
              <Link
                href={`/journal/blog/${post.slug}`}
                className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface transition hover:border-accent"
              >
                {post.coverMedia?.mediumPath && (
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={post.coverMedia.mediumPath}
                      alt={post.coverMedia.altTextEn ?? post.titleEn}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-xs text-text-faint">
                    {post.publishedAt?.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    {post.author && ` · ${post.author.name}`}
                  </p>
                  <h2 className="mt-2 text-lg font-semibold">{post.titleEn}</h2>
                  {post.excerptEn && <p className="mt-2 flex-1 text-text-muted">{post.excerptEn}</p>}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
