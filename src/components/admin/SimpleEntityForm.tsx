"use client";

import { useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "react-toastify";
import type { FormState } from "@/lib/member-actions";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { MultiMediaPicker } from "@/components/admin/MultiMediaPicker";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import type { MediaPurpose } from "@/lib/media";

export type SimpleField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "checkbox" | "url" | "select" | "media" | "multi-media" | "date" | "richtext";
  dir?: "rtl";
  defaultValue?: string | number | boolean;
  required?: boolean;
  options?: { value: string; label: string }[];
  // Only used when type is "media" or "multi-media".
  mediaPurpose?: MediaPurpose;
  initialMedia?: { id: string; thumbnailPath: string | null; storagePath: string; originalFilename: string | null } | null;
  initialMediaList?: { id: string; thumbnailPath: string | null; storagePath: string; originalFilename: string | null }[];
};

// Docs/06_ADMIN_PANEL.md #10, #33-37: several entities (Department,
// Technology, SponsorTier, Partner, SocialLink) are flat forms with no
// complex relations -- one generic, config-driven form covers all of them
// instead of near-duplicate bespoke components.
export function SimpleEntityForm({
  fields,
  action,
  submitLabel = "Save",
}: {
  fields: SimpleField[];
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  submitLabel?: string;
}) {
  const [state, formAction] = useActionState(action, undefined);

  useEffect(() => {
    if (state?.error) toast.error(state.error);
    else if (state !== undefined) toast.success("Saved.");
  }, [state]);

  return (
    <form action={formAction} className="max-w-xl space-y-4">
      {fields.map((f) => (
        <div key={f.name}>
          {f.type === "checkbox" ? (
            <label className="flex items-center gap-2 text-sm text-[#b6c0ca]">
              <input type="checkbox" name={f.name} defaultChecked={!!f.defaultValue} />
              {f.label}
            </label>
          ) : f.type === "media" ? (
            <MediaPicker
              name={f.name}
              purpose={f.mediaPurpose!}
              label={f.label}
              initialMedia={f.initialMedia}
            />
          ) : f.type === "multi-media" ? (
            <MultiMediaPicker
              name={f.name}
              purpose={f.mediaPurpose!}
              label={f.label}
              initialMedia={f.initialMediaList ?? []}
            />
          ) : f.type === "richtext" ? (
            <RichTextEditor name={f.name} label={f.label} dir={f.dir} defaultValue={(f.defaultValue as string) ?? ""} />
          ) : (
            <>
              <label className="mb-1.5 block text-sm text-[#b6c0ca]">
                {f.label}
                {f.required && " *"}
              </label>
              {f.type === "textarea" ? (
                <textarea
                  name={f.name}
                  dir={f.dir}
                  required={f.required}
                  defaultValue={(f.defaultValue as string) ?? ""}
                  rows={3}
                  className={inputClass}
                />
              ) : f.type === "select" ? (
                <select
                  name={f.name}
                  required={f.required}
                  defaultValue={(f.defaultValue as string) ?? ""}
                  className={inputClass}
                >
                  {f.options?.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  name={f.name}
                  dir={f.dir}
                  type={f.type === "url" ? "url" : f.type === "number" ? "number" : f.type === "date" ? "date" : "text"}
                  required={f.required}
                  defaultValue={(f.defaultValue as string | number) ?? ""}
                  className={inputClass}
                />
              )}
            </>
          )}
        </div>
      ))}
      <SubmitButton label={submitLabel} />
    </form>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-[#d7a84b] px-5 py-2 text-sm font-medium text-[#11161b] hover:brightness-110 disabled:opacity-60"
    >
      {pending ? "Saving…" : label}
    </button>
  );
}

const inputClass =
  "w-full rounded-md border border-[#27323d] bg-[#0d1117] px-3 py-2 text-sm text-[#e6edf3] outline-none focus:border-[#d7a84b]";
