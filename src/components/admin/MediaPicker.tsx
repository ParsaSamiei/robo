"use client";

import { useRef, useState } from "react";
import { toast } from "react-toastify";
import type { MediaPurpose } from "@/lib/media";

type MediaLike = {
  id: string;
  thumbnailPath: string | null;
  storagePath: string;
  originalFilename: string | null;
};

// Docs/06_ADMIN_PANEL.md #11 lists MediaPicker among the shared reusable
// admin components. Uploads via POST /api/admin/media, then submits the
// resulting Media id as a hidden field of whatever form this is embedded
// in -- no separate save step, it just becomes part of the parent form.
export function MediaPicker({
  name,
  purpose,
  initialMedia,
  label,
}: {
  name: string;
  purpose: MediaPurpose;
  initialMedia?: MediaLike | null;
  label: string;
}) {
  const [media, setMedia] = useState<MediaLike | null>(initialMedia ?? null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleDelete() {
    if (!media) return;
    if (!confirm("Delete this image permanently? This can't be undone.")) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/media/${media.id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        // e.g. 409 -- still referenced elsewhere. Don't clear the field in
        // that case, since the reference here is still live.
        toast.error(data.error ?? "Couldn't delete this image.");
        return;
      }
      setMedia(null);
      toast.success("Image deleted.");
    } catch {
      toast.error("Couldn't delete this image.");
    } finally {
      setDeleting(false);
    }
  }

  async function handleFile(file: File) {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("purpose", purpose);

    try {
      const res = await fetch("/api/admin/media", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Upload failed.");
        return;
      }
      setMedia(data.media);
      toast.success("Image uploaded.");
    } catch {
      toast.error("Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm text-[#b6c0ca]">{label}</label>
      <input type="hidden" name={name} value={media?.id ?? ""} />

      <div className="flex items-center gap-4">
        {media ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={media.thumbnailPath ?? media.storagePath}
            alt=""
            className="h-20 w-20 rounded-md border border-[#27323d] object-cover"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-md border border-dashed border-[#27323d] text-[10px] text-[#56616c]">
            No image
          </div>
        )}

        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            disabled={uploading || deleting}
            onClick={() => inputRef.current?.click()}
            className="rounded-md border border-[#27323d] px-3 py-1.5 text-xs font-medium text-[#e6edf3] hover:border-[#d7a84b] disabled:opacity-50"
          >
            {uploading ? "Uploading…" : media ? "Replace image" : "Upload image"}
          </button>
          {media && (
            <button
              type="button"
              disabled={deleting}
              onClick={handleDelete}
              className="text-xs text-[#7e8995] hover:text-red-400 disabled:opacity-50"
            >
              {deleting ? "Deleting…" : "Delete image"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
