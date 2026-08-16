"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/Button";
import type { Department } from "@prisma/client";

// Docs/10 #52: Name, Email, Education, Area of interest, GitHub, personal
// website, motivation. No resume upload -- applicants are pointed to the
// club's phone number on this page instead (see JoinPage).
export function JoinForm({ departments }: { departments: Department[] }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      educationEn: form.get("educationEn"),
      departmentId: form.get("departmentId"),
      messageEn: form.get("messageEn"),
      githubUrl: form.get("githubUrl"),
      portfolioUrl: form.get("portfolioUrl"),
    };

    const res = await fetch("/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setStatus("sent");
      e.currentTarget.reset();
    } else {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg border border-border bg-surface p-6 text-text-secondary">
        Thanks for applying — the team reviews applications regularly and will reach out by
        email.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Education" name="educationEn" />
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text-secondary">
            Area of interest
          </label>
          <select
            name="departmentId"
            className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none focus:border-accent"
          >
            <option value="">Not sure yet</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nameEn}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="GitHub" name="githubUrl" type="url" />
        <Field label="Personal website" name="portfolioUrl" type="url" />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-text-secondary">
          Why do you want to join?
        </label>
        <textarea
          name="messageEn"
          rows={5}
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none focus:border-accent"
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-400">Something went wrong. Please try again.</p>
      )}
      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting…" : "Submit application"}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-text-secondary">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none focus:border-accent"
      />
    </div>
  );
}
