"use client";

import { useTransition } from "react";
import { setLocale } from "@/lib/preferences-actions";
import type { Locale } from "@/lib/i18n";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const [isPending, startTransition] = useTransition();

  const other: Locale = locale === "en" ? "fa" : "en";
  const label = locale === "en" ? "فارسی" : "EN";

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => startTransition(() => setLocale(other))}
      className="rounded-sm border border-border px-3 py-1.5 text-xs font-medium tracking-wide text-text-secondary transition hover:border-accent hover:text-text-primary disabled:opacity-50"
      aria-label="Switch language"
    >
      {label}
    </button>
  );
}
