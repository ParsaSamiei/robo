import { prisma } from "@/lib/prisma";
import { Section } from "@/components/Section";
import { EmptyState } from "@/components/EmptyState";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { Reveal } from "@/components/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Gallery", path: "/gallery" });

// Docs/10 #42-44: editorial photo gallery, grouped into albums, opening in
// a keyboard/swipe-navigable lightbox. Quality over quantity (§43).
// Docs/18_MEDIA_AND_GALLERY.md §8: albums ordered by display order.
export default async function GalleryPage() {
  const albums = await prisma.galleryAlbum
    .findMany({
      where: { published: true },
      orderBy: { order: "asc" },
      include: { items: { include: { media: true }, orderBy: { order: "asc" } } },
    })
    .catch(() => []);

  const allEmpty = albums.every((a) => a.items.length === 0);

  return (
    <Section className="pt-3xl">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">Gallery</p>
      <h1 className="mt-4 text-h1 font-bold">Gallery</h1>

      {albums.length === 0 || allEmpty ? (
        <div className="mt-10">
          <EmptyState message="No published photos yet." />
        </div>
      ) : (
        <div className="mt-10 space-y-14">
          {albums.map((album, i) =>
            album.items.length === 0 ? null : (
              <Reveal key={album.id} delayMs={Math.min(i, 3) * 80}>
                <div>
                  <h2 className="text-h3 font-semibold">{album.titleEn}</h2>
                  {album.descriptionEn && <p className="mt-2 text-text-muted">{album.descriptionEn}</p>}
                  <div className="mt-6">
                    <GalleryLightbox
                      items={album.items.map((item) => ({
                        id: item.id,
                        caption: item.captionEn,
                        alt: item.media.altTextEn ?? album.titleEn,
                        thumbnailPath: item.media.thumbnailPath,
                        largePath: item.media.largePath,
                      }))}
                    />
                  </div>
                </div>
              </Reveal>
            )
          )}
        </div>
      )}
    </Section>
  );
}
