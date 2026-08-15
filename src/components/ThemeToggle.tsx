"use client";

import { useTransition } from "react";
import { setTheme } from "@/lib/preferences-actions";

export function ThemeToggle({ theme }: { theme: "dark" | "light" }) {
  const [isPending, startTransition] = useTransition();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => startTransition(() => setTheme(next))}
      className="rounded-sm border border-border px-3 py-1.5 text-xs font-medium tracking-wide text-text-secondary transition hover:border-accent hover:text-text-primary disabled:opacity-50"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
