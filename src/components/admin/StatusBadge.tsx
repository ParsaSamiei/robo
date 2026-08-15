const colors: Record<string, string> = {
  PUBLISHED: "bg-emerald-500/15 text-emerald-400",
  DRAFT: "bg-yellow-500/15 text-yellow-400",
  ARCHIVED: "bg-[#27323d] text-[#7e8995]",
  NEW: "bg-blue-500/15 text-blue-400",
  REVIEWED: "bg-[#27323d] text-[#7e8995]",
  REVIEWING: "bg-yellow-500/15 text-yellow-400",
  ACCEPTED: "bg-emerald-500/15 text-emerald-400",
  REJECTED: "bg-red-500/15 text-red-400",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block rounded-sm px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide ${
        colors[status] ?? "bg-[#27323d] text-[#7e8995]"
      }`}
    >
      {status}
    </span>
  );
}
