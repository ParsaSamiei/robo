import { AdminShell } from "@/components/admin/AdminShell";
import { SimpleEntityForm } from "@/components/admin/SimpleEntityForm";
import { createTechnology } from "@/lib/technology-actions";

export const metadata = { title: "New Technology — Admin" };

export default function NewTechnologyPage() {
  return (
    <AdminShell>
      <h1 className="text-xl font-semibold">New Technology</h1>
      <div className="mt-6">
        <SimpleEntityForm
          action={createTechnology}
          fields={[
            { name: "name", label: "Name", type: "text", required: true },
            { name: "slug", label: "Slug (leave blank to auto-generate)", type: "text" },
            { name: "category", label: "Category", type: "text" },
            { name: "descriptionEn", label: "Description (English)", type: "textarea" },
            { name: "descriptionFa", label: "Description (Persian)", type: "textarea", dir: "rtl" },
            { name: "websiteUrl", label: "Website URL", type: "url" },
            { name: "order", label: "Order", type: "number", defaultValue: 0 },
            { name: "isPublished", label: "Published", type: "checkbox" },
          ]}
        />
      </div>
    </AdminShell>
  );
}
