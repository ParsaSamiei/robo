"use client";

import { useEffect, useMemo, useState, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "react-toastify";
import type { Member, Technology, Project, Robot, RobotMember, RobotTechnology, RobotProject, Media } from "@prisma/client";
import { slugify } from "@/lib/slug";
import { useUnsavedChangesWarning } from "@/components/admin/useUnsavedChangesWarning";
import { MultiMediaPicker } from "@/components/admin/MultiMediaPicker";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import type { FormState } from "@/lib/member-actions";

type ExistingRobot = Robot & {
  members: RobotMember[];
  technologies: RobotTechnology[];
  projects: RobotProject[];
  media: { media: Media }[];
};

// Docs/06_ADMIN_PANEL.md #22: robot form fields.
export function RobotForm({
  robot,
  members,
  technologies,
  projects,
  action,
}: {
  robot?: ExistingRobot;
  members: Member[];
  technologies: Technology[];
  projects: Project[];
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
}) {
  const [state, formAction] = useActionState(action, undefined);
  const [dirty, setDirty] = useState(false);
  const [slugTouched, setSlugTouched] = useState(!!robot);
  const [name, setName] = useState(robot?.nameEn ?? "");
  const [slug, setSlug] = useState(robot?.slug ?? "");

  useUnsavedChangesWarning(dirty);

  useEffect(() => {
    if (state?.error) toast.error(state.error);
    else if (state !== undefined) toast.success("Robot saved.");
  }, [state]);

  const suggestedSlug = useMemo(() => slugify(name), [name]);
  const selectedMemberIds = new Set(robot?.members.map((m) => m.memberId));
  const selectedTechnologyIds = new Set(robot?.technologies.map((t) => t.technologyId));
  const selectedProjectIds = new Set(robot?.projects.map((p) => p.projectId));

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
        <Field label="Name FA"><input name="nameFa" dir="rtl" defaultValue={robot?.nameFa ?? ""} className={inputClass} /></Field>
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

      <Section title="Description">
        <Field label="Description EN"><textarea name="descriptionEn" defaultValue={robot?.descriptionEn ?? ""} rows={2} className={inputClass} /></Field>
        <Field label="Description FA"><textarea name="descriptionFa" dir="rtl" defaultValue={robot?.descriptionFa ?? ""} rows={2} className={inputClass} /></Field>
        <RichTextEditor name="contentEn" label="Content EN" defaultValue={robot?.contentEn ?? ""} />
        <RichTextEditor name="contentFa" label="Content FA" dir="rtl" defaultValue={robot?.contentFa ?? ""} />
      </Section>

      <Section title="Status">
        <select name="status" defaultValue={robot?.status ?? "DEVELOPMENT"} className={inputClass}>
          <option value="CONCEPT">Concept</option>
          <option value="PROTOTYPE">Prototype</option>
          <option value="DEVELOPMENT">Development</option>
          <option value="OPERATIONAL">Operational</option>
          <option value="RETIRED">Retired</option>
        </select>
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
        <Field label="Projects">
          <div className="grid grid-cols-2 gap-2">
            {projects.map((p) => (
              <label key={p.id} className="flex items-center gap-2 text-sm text-[#b6c0ca]">
                <input type="checkbox" name="projectIds" value={p.id} defaultChecked={selectedProjectIds.has(p.id)} />
                {p.titleEn}
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
          Competitions aren&apos;t editable here yet — see README.
        </p>
      </Section>

      <Section title="Gallery">
        <MultiMediaPicker name="mediaIds" purpose="robotImage" label="Robot images" initialMedia={robot?.media.map((m) => m.media) ?? []} />
      </Section>

      <Section title="Publishing">
        <select name="publicationStatus" defaultValue={robot?.publicationStatus ?? "DRAFT"} className={inputClass}>
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="ARCHIVED">Archived</option>
        </select>
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
      {pending ? "Saving…" : "Save robot"}
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
