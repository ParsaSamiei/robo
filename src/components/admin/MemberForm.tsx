"use client";

import { useEffect, useMemo, useRef, useState, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "react-toastify";
import type { Department, Technology, Member, MemberDepartment, MemberTechnology, Media } from "@prisma/client";
import { slugify } from "@/lib/slug";
import { useUnsavedChangesWarning } from "@/components/admin/useUnsavedChangesWarning";
import { MediaPicker } from "@/components/admin/MediaPicker";
import type { FormState } from "@/lib/member-actions";

type ExistingMember = Member & {
  departments: MemberDepartment[];
  technologies: MemberTechnology[];
  photo: Media | null;
};

// Docs/06_ADMIN_PANEL.md #17-19: Identity / English / Persian / Professional
// / Team (multi-select departments+technologies) / Publishing sections.
// #44: unsaved-changes warning. #46-47: toast + pending-state feedback.
export function MemberForm({
  member,
  departments,
  technologies,
  action,
}: {
  member?: ExistingMember;
  departments: Department[];
  technologies: Technology[];
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
}) {
  const [state, formAction] = useActionState(action, undefined);
  const [dirty, setDirty] = useState(false);
  const [slugTouched, setSlugTouched] = useState(!!member);
  const [name, setName] = useState(member?.name ?? "");
  const [slug, setSlug] = useState(member?.slug ?? "");
  const formRef = useRef<HTMLFormElement>(null);

  useUnsavedChangesWarning(dirty);

  useEffect(() => {
    if (state?.error) toast.error(state.error);
    else if (state !== undefined) toast.success("Member saved.");
  }, [state]);

  const suggestedSlug = useMemo(() => slugify(name), [name]);

  const selectedDepartmentIds = new Set(member?.departments.map((d) => d.departmentId));
  const selectedTechnologyIds = new Set(member?.technologies.map((t) => t.technologyId));

  return (
    <form
      ref={formRef}
      action={formAction}
      onChange={() => setDirty(true)}
      onSubmit={() => setDirty(false)}
      className="max-w-2xl space-y-8"
    >
      <Section title="Identity">
        <Field label="Name *">
          <input
            name="name"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
            className={inputClass}
          />
        </Field>
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
        <MediaPicker name="photoId" purpose="memberPhoto" label="Photo" initialMedia={member?.photo ?? null} />
      </Section>

      <Section title="English">
        <Field label="Role"><input name="roleEn" defaultValue={member?.roleEn ?? ""} className={inputClass} /></Field>
        <Field label="Bio"><textarea name="bioEn" defaultValue={member?.bioEn ?? ""} rows={4} className={inputClass} /></Field>
        <Field label="Education"><input name="educationEn" defaultValue={member?.educationEn ?? ""} className={inputClass} /></Field>
      </Section>

      <Section title="Persian">
        <Field label="نقش"><input name="roleFa" dir="rtl" defaultValue={member?.roleFa ?? ""} className={inputClass} /></Field>
        <Field label="بیوگرافی"><textarea name="bioFa" dir="rtl" defaultValue={member?.bioFa ?? ""} rows={4} className={inputClass} /></Field>
        <Field label="تحصیلات"><input name="educationFa" dir="rtl" defaultValue={member?.educationFa ?? ""} className={inputClass} /></Field>
      </Section>

      <Section title="Professional">
        <Field label="GitHub"><input name="githubUrl" type="url" defaultValue={member?.githubUrl ?? ""} className={inputClass} /></Field>
        <Field label="Personal Website"><input name="personalWebsiteUrl" type="url" defaultValue={member?.personalWebsiteUrl ?? ""} className={inputClass} /></Field>
      </Section>

      <Section title="Team">
        <Field label="Departments">
          <div className="grid grid-cols-2 gap-2">
            {departments.map((d) => (
              <label key={d.id} className="flex items-center gap-2 text-sm text-[#b6c0ca]">
                <input
                  type="checkbox"
                  name="departmentIds"
                  value={d.id}
                  defaultChecked={selectedDepartmentIds.has(d.id)}
                />
                {d.nameEn}
              </label>
            ))}
          </div>
        </Field>
        <Field label="Technologies">
          <div className="grid grid-cols-2 gap-2">
            {technologies.map((t) => (
              <label key={t.id} className="flex items-center gap-2 text-sm text-[#b6c0ca]">
                <input
                  type="checkbox"
                  name="technologyIds"
                  value={t.id}
                  defaultChecked={selectedTechnologyIds.has(t.id)}
                />
                {t.name}
              </label>
            ))}
          </div>
        </Field>
        <Field label="Membership Status">
          <select name="membershipStatus" defaultValue={member?.membershipStatus ?? "CURRENT"} className={inputClass}>
            <option value="CURRENT">Current</option>
            <option value="ALUMNI">Alumni</option>
          </select>
        </Field>
      </Section>

      <Section title="Publishing">
        <label className="flex items-center gap-2 text-sm text-[#b6c0ca]">
          <input type="checkbox" name="isPublished" defaultChecked={member?.isPublished ?? false} />
          Published
        </label>
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
      {pending ? "Saving…" : "Save member"}
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
