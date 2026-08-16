"use client";

import { useTransition } from "react";

export function StatusSelect<T extends string>({
  id,
  value,
  options,
  action,
}: {
  id: string;
  value: T;
  options: T[];
  action: (id: string, status: T) => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      defaultValue={value}
      disabled={isPending}
      onChange={(e) => startTransition(() => action(id, e.target.value as T))}
      className="rounded-sm border border-[#27323d] bg-[#0d1117] px-2 py-1 text-xs text-[#e6edf3] disabled:opacity-50"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
