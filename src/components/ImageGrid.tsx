import Image from "next/image";
import type { Media } from "@prisma/client";

// Small shared renderer for the Project/Robot/Competition media galleries
// wired up via MultiMediaPicker in admin.
export function ImageGrid({ media, altFallback }: { media: Media[]; altFallback: string }) {
  if (media.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {media.map((m) => (
        <div key={m.id} className="relative aspect-square overflow-hidden rounded-md bg-surface-elevated">
          {m.mediumPath && (
            <Image
              src={m.mediumPath}
              alt={m.altTextEn ?? altFallback}
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-cover"
            />
          )}
        </div>
      ))}
    </div>
  );
}
