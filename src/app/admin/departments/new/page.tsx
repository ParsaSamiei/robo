import { AdminShell } from "@/components/admin/AdminShell";
import { SimpleEntityForm } from "@/components/admin/SimpleEntityForm";
import { createDepartment } from "@/lib/department-actions";

export const metadata = { title: "New Department — Admin" };

export default function NewDepartmentPage() {
  return (
    <AdminShell>
      <h1 className="text-xl font-semibold">New Department</h1>
      <div className="mt-6">
        <SimpleEntityForm
          action={createDepartment}
          fields={[
            { name: "nameEn", label: "Name (English)", type: "text", required: true },
            { name: "nameFa", label: "Name (Persian)", type: "text", dir: "rtl", required: true },
            { name: "slug", label: "Slug (leave blank to auto-generate from English name)", type: "text" },
            { name: "descriptionEn", label: "Description (English)", type: "textarea" },
            { name: "descriptionFa", label: "Description (Persian)", type: "textarea", dir: "rtl" },
            { name: "order", label: "Order", type: "number", defaultValue: 0 },
            { name: "isActive", label: "Active", type: "checkbox", defaultValue: true },
          ]}
        />
      </div>
    </AdminShell>
  );
}
