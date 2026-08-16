import { AdminShell } from "@/components/admin/AdminShell";
import { SimpleEntityForm } from "@/components/admin/SimpleEntityForm";
import { createSponsorTier } from "@/lib/partnerships-actions";

export const metadata = { title: "New Sponsor Tier — Admin" };

export default function NewSponsorTierPage() {
  return (
    <AdminShell>
      <h1 className="text-xl font-semibold">New Sponsor Tier</h1>
      <div className="mt-6">
        <SimpleEntityForm
          action={createSponsorTier}
          fields={[
            { name: "nameEn", label: "Name (English)", type: "text", required: true },
            { name: "nameFa", label: "Name (Persian)", type: "text", dir: "rtl" },
            { name: "descriptionEn", label: "Description (English)", type: "textarea" },
            { name: "descriptionFa", label: "Description (Persian)", type: "textarea", dir: "rtl" },
            { name: "order", label: "Order", type: "number", defaultValue: 0 },
          ]}
        />
      </div>
    </AdminShell>
  );
}
