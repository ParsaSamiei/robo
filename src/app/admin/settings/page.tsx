import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteConfirmButton } from "@/components/admin/DeleteConfirmButton";
import { upsertSetting, deleteSetting } from "@/lib/settings-actions";

export const metadata = { title: "Settings — Admin" };

// Docs/06_ADMIN_PANEL.md #10: Settings section. SiteSetting is a plain
// key/value store, so this is a simple add/edit-by-key/delete screen rather
// than a dedicated form per setting.
export default async function AdminSettingsPage() {
  const settings = await prisma.siteSetting.findMany({ orderBy: { key: "asc" } });

  return (
    <AdminShell>
      <h1 className="text-xl font-semibold">Settings</h1>

      <div className="mt-6">
        <DataTable
          emptyMessage="No settings yet."
          rows={settings}
          columns={[
            { header: "Key", cell: (s) => <span className="font-mono text-xs">{s.key}</span> },
            { header: "Value", cell: (s) => <span className="text-[#b6c0ca]">{s.value}</span> },
            { header: "", cell: (s) => <DeleteConfirmButton label="setting" action={deleteSetting.bind(null, s.key)} /> },
          ]}
        />
      </div>

      <form action={upsertSetting} className="mt-8 max-w-md space-y-3 rounded-md border border-dashed border-[#27323d] p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#7e8995]">
          Add or update a setting
        </p>
        <input name="key" placeholder="Key (e.g. contact_email)" required className={inputClass} />
        <textarea name="value" placeholder="Value" required rows={2} className={inputClass} />
        <button type="submit" className="rounded-md bg-[#d7a84b] px-4 py-2 text-sm font-medium text-[#11161b] hover:brightness-110">
          Save setting
        </button>
      </form>
    </AdminShell>
  );
}

const inputClass =
  "w-full rounded-md border border-[#27323d] bg-[#0d1117] px-3 py-2 text-sm text-[#e6edf3] outline-none focus:border-[#d7a84b]";
