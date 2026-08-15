"use client";

import { useState, useTransition } from "react";

// Docs/06_ADMIN_PANEL.md #45: destructive operations require a confirm
// step ("Delete Project? This cannot be easily undone. [Cancel] [Delete]").
export function DeleteConfirmButton({
  label,
  action,
}: {
  label: string;
  action: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-md border border-red-900/50 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-950/30"
      >
        Delete {label}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-md border border-red-900/50 bg-red-950/20 px-3 py-2 text-xs">
      <span className="text-red-300">Delete {label}? This cannot be easily undone.</span>
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="rounded-sm border border-[#27323d] px-2 py-1 text-[#b6c0ca]"
      >
        Cancel
      </button>
      <button
        type="button"
        disabled={isPending}
        onClick={() => startTransition(action)}
        className="rounded-sm bg-red-600 px-2 py-1 font-medium text-white disabled:opacity-60"
      >
        {isPending ? "Deleting…" : "Delete"}
      </button>
    </div>
  );
}
