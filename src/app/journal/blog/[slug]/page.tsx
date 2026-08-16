import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Section } from "@/components/Section";
import { pageMetadata } from "@/lib/seo";
import { MarkdownContent } from "@/components/MarkdownContent";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return pageMetadata({ title: "Blog", path: `/journal/blog/${slug}` });
  return pageMetadata({
    title: post.seoTitleEn ?? post.titleEn,
    description: post.seoDescriptionEn ?? post.excerptEn ?? undefined,
    path: `/journal/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { author: true, tags: { include: { tag: true } }, coverMedia: true },
  });

  if (!post || post.publicationStatus !== "PUBLISHED") notFound();

  return (
    <Section className="pt-3xl">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">Journal / Blog</p>
      <h1 className="mt-4 max-w-3xl text-h1 font-bold">{post.titleEn}</h1>
      <p className="mt-4 text-sm text-text-muted">
        {post.publishedAt?.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        {post.author && ` · ${post.author.name}`}
      </p>

      {post.coverMedia?.largePath && (
        <div className="relative mt-8 aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-lg">
          <Image
            src={post.coverMedia.largePath}
            alt={post.coverMedia.altTextEn ?? post.titleEn}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      )}

      {post.contentEn && (
        <div className="mt-10">
          <MarkdownContent content={post.contentEn} />
        </div>
      )}

      {post.tags.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span key={t.tagId} className="rounded-sm border border-border px-2 py-1 font-mono text-[11px] text-text-secondary">
              {t.tag.nameEn}
            </span>
          ))}
        </div>
      )}
    </Section>
  );
}
