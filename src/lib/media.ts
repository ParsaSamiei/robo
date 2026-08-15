import { Jimp } from "jimp";
import { prisma } from "@/lib/prisma";
import { storage, generateStorageKey } from "@/lib/storage";

// Docs/25_API_AND_SERVER_ARCHITECTURE.md §16: Upload -> Authentication ->
// Validation -> Jimp -> Generate variants -> Store files -> Store metadata.
// Authentication happens in the calling route/action (getSession()), not
// here -- this module only covers Validation through Store metadata.
// §17: Jimp only, never Sharp (incompatible with the target server env).

const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_DIMENSION = 6000; // §20: reject unreasonably large images

// §19: different limits per upload purpose, explicit and configurable.
export const MEDIA_LIMITS = {
  memberPhoto: 5 * 1024 * 1024,
  projectImage: 8 * 1024 * 1024,
  robotImage: 8 * 1024 * 1024,
  competitionImage: 8 * 1024 * 1024,
  galleryImage: 10 * 1024 * 1024,
  sponsorLogo: 2 * 1024 * 1024,
  blogImage: 8 * 1024 * 1024,
} as const;

export type MediaPurpose = keyof typeof MEDIA_LIMITS;

// §21: thumbnail/medium/large variants, generated once at upload time (§22).
const VARIANTS = {
  thumbnail: 320,
  medium: 800,
  large: 1600,
} as const;

export class MediaValidationError extends Error {}

export async function processAndStoreImage({
  buffer,
  mimeType,
  originalFilename,
  purpose,
  altTextEn,
  altTextFa,
}: {
  buffer: Buffer;
  mimeType: string;
  originalFilename: string;
  purpose: MediaPurpose;
  altTextEn?: string | null;
  altTextFa?: string | null;
}) {
  // §18: validate MIME type, size, and actual file contents -- not just the
  // extension. The size and MIME checks below are the "trust nothing from
  // the client" gate; attempting the Jimp decode afterward is what actually
  // proves the bytes are a real, well-formed image (a renamed .exe with a
  // spoofed MIME type will fail to decode and throw here).
  if (!ALLOWED_MIME_TYPES.has(mimeType)) {
    throw new MediaValidationError(`Unsupported file type: ${mimeType}`);
  }
  const limit = MEDIA_LIMITS[purpose];
  if (buffer.byteLength > limit) {
    throw new MediaValidationError(
      `File is too large (${Math.round(buffer.byteLength / 1024)}KB). Limit for this upload is ${Math.round(limit / 1024)}KB.`
    );
  }

  let image: Awaited<ReturnType<typeof Jimp.read>>;
  try {
    image = await Jimp.read(buffer);
  } catch {
    throw new MediaValidationError("The uploaded file is not a valid image.");
  }

  const width = image.bitmap.width;
  const height = image.bitmap.height;
  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    throw new MediaValidationError(
      `Image is too large (${width}x${height}). Maximum dimension is ${MAX_DIMENSION}px.`
    );
  }

  const namespace = purpose.replace(/([A-Z])/g, "-$1").toLowerCase();

  // §22: process once here, never again per-request. Encode every variant
  // as JPEG for predictable size/quality regardless of the source format.
  async function writeVariant(maxWidth: number): Promise<string> {
    const clone = image.clone();
    if (clone.bitmap.width > maxWidth) {
      clone.resize({ w: maxWidth });
    }
    const outBuffer = await clone.getBuffer("image/jpeg");
    const key = generateStorageKey(namespace, "jpg");
    await storage.write(key, outBuffer);
    return storage.urlFor(key);
  }

  const [thumbnailPath, mediumPath, largePath] = await Promise.all([
    writeVariant(VARIANTS.thumbnail),
    writeVariant(VARIANTS.medium),
    writeVariant(VARIANTS.large),
  ]);

  // Original, full-resolution file for cases that need it (kept alongside
  // the resized variants rather than in place of them).
  const originalKey = generateStorageKey(namespace, extensionFromMime(mimeType));
  await storage.write(originalKey, buffer);
  const storagePath = storage.urlFor(originalKey);

  const media = await prisma.media.create({
    data: {
      filename: originalKey.split("/").pop()!,
      originalFilename,
      mimeType,
      size: buffer.byteLength,
      width,
      height,
      storagePath,
      thumbnailPath,
      mediumPath,
      largePath,
      altTextEn: altTextEn || null,
      altTextFa: altTextFa || null,
    },
  });

  return media;
}

function extensionFromMime(mimeType: string) {
  switch (mimeType) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    default:
      return "bin";
  }
}
