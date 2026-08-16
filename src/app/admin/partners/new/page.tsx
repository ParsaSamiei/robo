import { AdminShell } from "@/components/admin/AdminShell";
import { SimpleEntityForm } from "@/components/admin/SimpleEntityForm";
import { createPartner } from "@/lib/partnerships-actions";

export const metadata = { title: "New Partner — Admin" };

export default function NewPartnerPage() {
  return (
    <AdminShell>
      <h1 className="text-xl font-semibold">New Partner</h1>
      <div className="mt-6">
        <SimpleEntityForm
          action={createPartner}
          fields={[
            { name: "name", label: "Name", type: "text", required: true },
            { name: "slug", label: "Slug (leave blank to auto-generate)", type: "text" },
            { name: "descriptionEn", label: "Description (English)", type: "textarea" },
            { name: "descriptionFa", label: "Description (Persian)", type: "textarea", dir: "rtl" },
            { name: "websiteUrl", label: "Website URL", type: "url" },
            { name: "logoMediaId", label: "Logo", type: "media", mediaPurpose: "sponsorLogo" },
            { name: "order", label: "Order", type: "number", defaultValue: 0 },
            {
              name: "publicationStatus",
              label: "Publication status",
              type: "select",
              defaultValue: "DRAFT",
              options: [
                { value: "DRAFT", label: "Draft" },
                { value: "PUBLISHED", label: "Published" },
                { value: "ARCHIVED", label: "Archived" },
              ],
            },
          ]}
        />
      </div>
    </AdminShell>
  );
}
