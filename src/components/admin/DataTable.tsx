// Docs/06_ADMIN_PANEL.md #11-12: shared DataTable rather than one-off tables
// per entity. Deliberately simple (server-rendered, no client JS) -- sorting
// and pagination controls are left as TODOs where a section needs them,
// noted in README rather than half-implemented here.
export type Column<T> = {
  header: string;
  cell: (row: T) => React.ReactNode;
  className?: string;
};

export function DataTable<T extends { id: string }>({
  columns,
  rows,
  emptyMessage,
}: {
  columns: Column<T>[];
  rows: T[];
  emptyMessage: string;
}) {
  if (rows.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-[#27323d] px-6 py-12 text-center text-sm text-[#7e8995]">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-[#27323d]">
      <table className="w-full text-sm">
        <thead className="bg-[#111820] text-left text-xs uppercase tracking-wide text-[#7e8995]">
          <tr>
            {columns.map((col) => (
              <th key={col.header} className={`px-4 py-3 font-medium ${col.className ?? ""}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#27323d]">
          {rows.map((row) => (
            <tr key={row.id} className="bg-[#0d1117] hover:bg-[#111820]">
              {columns.map((col) => (
                <td key={col.header} className={`px-4 py-3 ${col.className ?? ""}`}>
                  {col.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
