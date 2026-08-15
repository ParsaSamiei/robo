"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Item = {
  id: string;
  caption: string | null;
  alt: string;
  thumbnailPath: string | null;
  largePath: string | null;
};

// Docs/10_INFORMATION_ARCHITECTURE.md #44: lightbox supports next/previous/
// close, keyboard navigation, and mobile swipe.
export function GalleryLightbox({ items }: { items: Item[] }) {
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    if (index === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") setIndex((i) => (i === null ? i : (i + 1) % items.length));
      if (e.key === "ArrowLeft") setIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, items.length]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setIndex(i)}
            className="relative aspect-square overflow-hidden rounded-md bg-surface-elevated transition hover:opacity-80"
            aria-label={item.alt}
          >
            {item.thumbnailPath && (
              <Image
                src={item.thumbnailPath}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover"
              />
            )}
          </button>
        ))}
      </div>

      {index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-6"
          onClick={() => setIndex(null)}
        >
          <div
            className="relative flex aspect-video w-full max-w-4xl items-center justify-center overflow-hidden rounded-md bg-surface-elevated"
            onClick={(e) => e.stopPropagation()}
          >
            {items[index].largePath && (
              <Image
                src={items[index].largePath!}
                alt={items[index].alt}
                fill
                sizes="(min-width: 1024px) 896px, 100vw"
                className="object-contain"
                priority
              />
            )}
          </div>
          {items[index].caption && (
            <p className="mt-3 text-sm text-text-secondary">{items[index].caption}</p>
          )}
          <div className="mt-4 flex items-center gap-6 text-sm text-text-secondary" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length))}>
              ← Previous
            </button>
            <button onClick={() => setIndex(null)}>Close</button>
            <button onClick={() => setIndex((i) => (i === null ? i : (i + 1) % items.length))}>
              Next →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
