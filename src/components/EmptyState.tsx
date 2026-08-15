// Docs/11_DESIGN_SYSTEM.md #48-49: design real empty states rather than
// filling pages with placeholder/fake content before there is real content.
export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-surface/40 px-6 py-16 text-center">
      <p className="text-sm text-text-muted">{message}</p>
    </div>
  );
}
