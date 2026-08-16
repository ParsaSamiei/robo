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

// Docs/25_API_AND_SERVER_ARCHITECTURE.md media pipeline + Docs/18_MEDIA_AND_GALLERY.md:
// an ordered set of images (project/robot/competition galleries), each
// uploaded through the same /api/admin/media endpoint as MediaPicker.
// Emits one hidden input per selected media id, all sharing `name`, so the
// parent form's FormData.getAll(name) returns the full ordered list -- the
// same pattern the checkbox relation fields (departmentIds, memberIds, etc)
// already use elsewhere in these forms.
export function MultiMediaPicker({
  name,
  purpose,
  label,
  initialMedia = [],
}: {
  name: string;
  purpose: MediaPurpose;
  label: string;
  initialMedia?: MediaLike[];
}) {
  const [items, setItems] = useState<MediaLike[]>(initialMedia);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList) {
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("purpose", purpose);
        const res = await fetch("/api/admin/media", { method: "POST", body: formData });
        const data = await res.json();
        if (!res.ok) {
          toast.error(data.error ?? `Failed to upload ${file.name}.`);
          continue;
        }
        setItems((prev) => [...prev, data.media]);
      }
    } finally {
      setUploading(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this image permanently? This can't be undone.")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        // e.g. 409 -- still referenced elsewhere. Leave it in the list
        // since the reference is still live.
        toast.error(data.error ?? "Couldn't delete this image.");
        return;
      }
      setItems((prev) => prev.filter((m) => m.id !== id));
      toast.success("Image deleted.");
    } catch {
      toast.error("Couldn't delete this image.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm text-[#b6c0ca]">{label}</label>
      {items.map((m) => (
        <input key={m.id} type="hidden" name={name} value={m.id} />
      ))}

      <div className="flex flex-wrap gap-3">
        {items.map((m) => (
          <div key={m.id} className="group relative h-20 w-20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={m.thumbnailPath ?? m.storagePath}
              alt=""
              className="h-20 w-20 rounded-md border border-[#27323d] object-cover"
            />
            <button
              type="button"
              disabled={deletingId === m.id}
              onClick={() => remove(m.id)}
              className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] text-white opacity-0 transition hover:opacity-100 group-hover:opacity-100 disabled:opacity-50"
              aria-label="Delete image"
            >
              {deletingId === m.id ? "…" : "×"}
            </button>
          </div>
        ))}

        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="flex h-20 w-20 items-center justify-center rounded-md border border-dashed border-[#27323d] text-[10px] text-[#7e8995] hover:border-[#d7a84b] disabled:opacity-50"
        >
          {uploading ? "Uploading…" : "+ Add"}
        </button>
      </div>
    </div>
  );
}
