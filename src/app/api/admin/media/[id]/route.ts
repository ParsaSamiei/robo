import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { storage } from "@/lib/storage";

function keyFromUrl(url: string) {
  // storage.urlFor() produces "/uploads/<key>" -- strip the prefix to get
  // back the key for storage.delete().
  return url.replace(/^\/uploads\//, "");
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    await prisma.media.delete({ where: { id: media.id } });
  } catch {
    // Foreign key constraint -- media is still referenced somewhere
    // (member photo, project media, etc). Fail loudly rather than orphan
    // references or silently detach them.
    return NextResponse.json(
      { error: "This file is still in use and can't be deleted. Remove it from wherever it's used first." },
      { status: 409 }
    );
  }

  await Promise.all(
    [media.storagePath, media.thumbnailPath, media.mediumPath, media.largePath]
      .filter((p): p is string => !!p)
      .map((p) => storage.delete(keyFromUrl(p)))
  );

  return NextResponse.json({ ok: true });
}
