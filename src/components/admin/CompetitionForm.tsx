"use client";

import { useEffect, useMemo, useState, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "react-toastify";
import type { Competition, Media } from "@prisma/client";
import { slugify } from "@/lib/slug";
import { useUnsavedChangesWarning } from "@/components/admin/useUnsavedChangesWarning";
import { MultiMediaPicker } from "@/components/admin/MultiMediaPicker";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import type { FormState } from "@/lib/member-actions";

function dateInputValue(d: Date | null | undefined) {
  return d ? new Date(d).toISOString().slice(0, 10) : "";
}

type ExistingCompetition = Competition & { media?: { media: Media }[] };

// Docs/06_ADMIN_PANEL.md #23: competition form field list.
export function CompetitionForm({
  competition,
  action,
}: {
  competition?: ExistingCompetition;
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
}) {
  const [state, formAction] = useActionState(action, undefined);
  const [dirty, setDirty] = useState(false);
  const [slugTouched, setSlugTouched] = useState(!!competition);
  const [name, setName] = useState(competition?.nameEn ?? "");
  const [slug, setSlug] = useState(competition?.slug ?? "");

  useUnsavedChangesWarning(dirty);

  useEffect(() => {
    if (state?.error) toast.error(state.error);
    else if (state !== undefined) toast.success("Competition saved.");
  }, [state]);

  const suggestedSlug = useMemo(() => slugify(name), [name]);

  return (
    <form
      action={formAction}
      onChange={() => setDirty(true)}
      onSubmit={() => setDirty(false)}
      className="max-w-2xl space-y-8"
    >
      <Section title="Identity">
        <Field label="Name EN *">
          <input
            name="nameEn"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
            className={inputClass}
          />
        </Field>
        <Field label="Name FA"><input name="nameFa" dir="rtl" defaultValue={competition?.nameFa ?? ""} className={inputClass} /></Field>
        <Field label="Slug *" hint={!slugTouched ? `Suggested: ${suggestedSlug || "—"}` : undefined}>
          <input
            name="slug"
            required
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            className={inputClass}
          />
        </Field>
      </Section>

      <Section title="Details">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Organization"><input name="organizationEn" defaultValue={competition?.organizationEn ?? ""} className={inputClass} /></Field>
          <Field label="League"><input name="leagueEn" defaultValue={competition?.leagueEn ?? ""} className={inputClass} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Year"><input name="year" type="number" defaultValue={competition?.year ?? ""} className={inputClass} /></Field>
          <Field label="Location"><input name="locationEn" defaultValue={competition?.locationEn ?? ""} className={inputClass} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Start Date"><input name="startDate" type="date" defaultValue={dateInputValue(competition?.startDate)} className={inputClass} /></Field>
          <Field label="End Date"><input name="endDate" type="date" defaultValue={dateInputValue(competition?.endDate)} className={inputClass} /></Field>
        </div>
        <Field label="Website"><input name="websiteUrl" type="url" defaultValue={competition?.websiteUrl ?? ""} className={inputClass} /></Field>
      </Section>

      <Section title="Description">
        <Field label="Description EN"><textarea name="descriptionEn" defaultValue={competition?.descriptionEn ?? ""} rows={3} className={inputClass} /></Field>
        <Field label="Description FA"><textarea name="descriptionFa" dir="rtl" defaultValue={competition?.descriptionFa ?? ""} rows={3} className={inputClass} /></Field>
        <RichTextEditor name="contentEn" label="Content EN" defaultValue={competition?.contentEn ?? ""} />
        <RichTextEditor name="contentFa" label="Content FA" dir="rtl" defaultValue={competition?.contentFa ?? ""} />
      </Section>

      <Section title="Gallery">
        <MultiMediaPicker
          name="mediaIds"
          purpose="competitionImage"
          label="Competition images"
          initialMedia={competition?.media?.map((m) => m.media) ?? []}
        />
      </Section>

      <Section title="Publishing">
        <select name="publicationStatus" defaultValue={competition?.publicationStatus ?? "DRAFT"} className={inputClass}>
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="ARCHIVED">Archived</option>
        </select>
        <p className="mt-2 text-xs text-[#56616c]">
          Robots and Projects relations aren&apos;t editable here yet — see README.
        </p>
      </Section>

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-[#d7a84b] px-5 py-2 text-sm font-medium text-[#11161b] hover:brightness-110 disabled:opacity-60"
    >
      {pending ? "Saving…" : "Save competition"}
    </button>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#7e8995]">{title}</p>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-[#b6c0ca]">{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-[#56616c]">{hint}</p>}
    </div>
  );
}

const inputClass =
  "w-full rounded-md border border-[#27323d] bg-[#0d1117] px-3 py-2 text-sm text-[#e6edf3] outline-none focus:border-[#d7a84b]";
