import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { processAndStoreImage, MediaValidationError, MEDIA_LIMITS, type MediaPurpose } from "@/lib/media";

// Docs/25_API_AND_SERVER_ARCHITECTURE.md §16: this route is the
// Upload -> Authentication -> Validation -> Jimp -> variants -> store
// pipeline's entry point. Authentication is enforced twice: middleware.ts
// (now proxy.ts, per Next 16)
// already blocks unauthenticated requests to /api/admin/*, and getSession()
// is checked again here so this handler is safe even if ever reused outside
// that path.
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  const purpose = String(form?.get("purpose") ?? "");
  const altTextEn = form?.get("altTextEn");
  const altTextFa = form?.get("altTextFa");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (!(purpose in MEDIA_LIMITS)) {
    return NextResponse.json({ error: "Invalid upload purpose." }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const media = await processAndStoreImage({
      buffer,
      mimeType: file.type,
      originalFilename: file.name,
      purpose: purpose as MediaPurpose,
      altTextEn: typeof altTextEn === "string" ? altTextEn : null,
      altTextFa: typeof altTextFa === "string" ? altTextFa : null,
    });
    return NextResponse.json({ media });
  } catch (err) {
    if (err instanceof MediaValidationError) {
      return NextResponse.json({ error: err.message }, { status: 422 });
    }
    console.error("Media upload failed:", err);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}

// Lists recent media for the picker UI, optionally filtered by a search term.
export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const q = request.nextUrl.searchParams.get("q")?.trim();

  const media = await prisma.media.findMany({
    where: q
      ? { OR: [{ originalFilename: { contains: q, mode: "insensitive" } }, { altTextEn: { contains: q, mode: "insensitive" } }] }
      : undefined,
    orderBy: { createdAt: "desc" },
    take: 60,
  });

  return NextResponse.json({ media });
}
