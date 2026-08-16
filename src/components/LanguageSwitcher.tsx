"use client";

import { useTransition } from "react";
import { setLocale } from "@/lib/preferences-actions";
import type { Locale } from "@/lib/i18n";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const [isPending, startTransition] = useTransition();

  const other: Locale = locale === "en" ? "fa" : "en";

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => startTransition(() => setLocale(other))}
      className="flex h-8 w-8 items-center justify-center rounded-sm border border-border text-text-secondary transition hover:border-accent hover:text-text-primary disabled:opacity-50"
      aria-label={locale === "en" ? "Switch to Persian" : "Switch to English"}
      title={locale === "en" ? "Switch to Persian" : "Switch to English"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
      </svg>
    </button>
  );
}
