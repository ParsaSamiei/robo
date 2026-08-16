"use client";

import { useEffect, useMemo, useState, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "react-toastify";
import type { Member, Technology, Project, ProjectMember, ProjectTechnology, Media } from "@prisma/client";
import { slugify } from "@/lib/slug";
import { useUnsavedChangesWarning } from "@/components/admin/useUnsavedChangesWarning";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { MultiMediaPicker } from "@/components/admin/MultiMediaPicker";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import type { FormState } from "@/lib/member-actions";

type ExistingProject = Project & {
  members: ProjectMember[];
  technologies: ProjectTechnology[];
  ogImage: Media | null;
  media: { media: Media }[];
};

// Docs/06_ADMIN_PANEL.md #20: project form field list. #21: GitHub is a
// single project-level link field, not a dominant element.
export function ProjectForm({
  project,
  members,
  technologies,
  action,
}: {
  project?: ExistingProject;
  members: Member[];
  technologies: Technology[];
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
}) {
  const [state, formAction] = useActionState(action, undefined);
  const [dirty, setDirty] = useState(false);
  const [slugTouched, setSlugTouched] = useState(!!project);
  const [title, setTitle] = useState(project?.titleEn ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");

  useUnsavedChangesWarning(dirty);

  useEffect(() => {
    if (state?.error) toast.error(state.error);
    else if (state !== undefined) toast.success("Project saved.");
  }, [state]);

  const suggestedSlug = useMemo(() => slugify(title), [title]);
  const selectedMemberIds = new Set(project?.members.map((m) => m.memberId));
  const selectedTechnologyIds = new Set(project?.technologies.map((t) => t.technologyId));

  return (
    <form
      action={formAction}
      onChange={() => setDirty(true)}
      onSubmit={() => setDirty(false)}
      className="max-w-2xl space-y-8"
    >
      <Section title="Title">
        <Field label="Title EN *">
          <input
            name="titleEn"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
            className={inputClass}
          />
        </Field>
        <Field label="Title FA"><input name="titleFa" dir="rtl" defaultValue={project?.titleFa ?? ""} className={inputClass} /></Field>
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

      <Section title="Excerpt">
        <Field label="Excerpt EN"><textarea name="excerptEn" defaultValue={project?.excerptEn ?? ""} rows={2} className={inputClass} /></Field>
        <Field label="Excerpt FA"><textarea name="excerptFa" dir="rtl" defaultValue={project?.excerptFa ?? ""} rows={2} className={inputClass} /></Field>
      </Section>

      <Section title="Content">
        <RichTextEditor name="contentEn" label="Content EN" defaultValue={project?.contentEn ?? ""} />
        <RichTextEditor name="contentFa" label="Content FA" dir="rtl" defaultValue={project?.contentFa ?? ""} />
      </Section>

      <Section title="Details">
        <Field label="Status">
          <select name="status" defaultValue={project?.status ?? "ACTIVE"} className={inputClass}>
            <option value="PLANNED">Planned</option>
            <option value="ACTIVE">Active</option>
            <option value="COMPLETED">Completed</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </Field>
        <Field label="GitHub URL">
          <input name="githubUrl" type="url" defaultValue={project?.githubUrl ?? ""} className={inputClass} />
        </Field>
        <MediaPicker name="ogImageId" purpose="projectImage" label="Cover / OG image" initialMedia={project?.ogImage ?? null} />
      </Section>

      <Section title="Gallery">
        <MultiMediaPicker name="mediaIds" purpose="projectImage" label="Project images" initialMedia={project?.media.map((m) => m.media) ?? []} />
      </Section>

      <Section title="Relations">
        <Field label="Members">
          <div className="grid grid-cols-2 gap-2">
            {members.map((m) => (
              <label key={m.id} className="flex items-center gap-2 text-sm text-[#b6c0ca]">
                <input type="checkbox" name="memberIds" value={m.id} defaultChecked={selectedMemberIds.has(m.id)} />
                {m.name}
              </label>
            ))}
          </div>
        </Field>
        <Field label="Technologies">
          <div className="grid grid-cols-2 gap-2">
            {technologies.map((t) => (
              <label key={t.id} className="flex items-center gap-2 text-sm text-[#b6c0ca]">
                <input type="checkbox" name="technologyIds" value={t.id} defaultChecked={selectedTechnologyIds.has(t.id)} />
                {t.name}
              </label>
            ))}
          </div>
        </Field>
        <p className="text-xs text-[#56616c]">
          Robots, Competitions, and SEO fields aren&apos;t editable here yet — see README.
        </p>
      </Section>

      <Section title="Publishing">
        <Field label="Publication status">
          <select name="publicationStatus" defaultValue={project?.publicationStatus ?? "DRAFT"} className={inputClass}>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </Field>
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
      {pending ? "Saving…" : "Save project"}
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
