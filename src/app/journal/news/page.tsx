import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Section } from "@/components/Section";
import { EmptyState } from "@/components/EmptyState";
import { Reveal } from "@/components/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "News", path: "/journal/news" });

export default async function NewsPage() {
  const posts = await prisma.newsPost
    .findMany({
      where: { publicationStatus: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      include: { coverMedia: true },
    })
    .catch(() => []);

  return (
    <Section className="pt-3xl">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">Journal / News</p>
      <h1 className="mt-4 text-h1 font-bold">News</h1>

      {posts.length === 0 ? (
        <div className="mt-10">
          <EmptyState message="No news posted yet." />
        </div>
      ) : (
        <div className="mt-10 space-y-6">
          {posts.map((post, i) => (
            <Reveal key={post.id} delayMs={Math.min(i, 5) * 60}>
              <article className="flex gap-5 overflow-hidden rounded-lg border border-border bg-surface p-6">
                {post.coverMedia?.thumbnailPath && (
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={post.coverMedia.thumbnailPath}
                      alt={post.coverMedia.altTextEn ?? post.titleEn}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="font-mono text-xs text-text-faint">
                    {post.publishedAt?.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                  <h2 className="mt-2 text-lg font-semibold">{post.titleEn}</h2>
                  {post.excerptEn && <p className="mt-2 text-text-muted">{post.excerptEn}</p>}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
