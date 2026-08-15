import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { SimpleEntityForm } from "@/components/admin/SimpleEntityForm";
import { DeleteConfirmButton } from "@/components/admin/DeleteConfirmButton";
import { updateDepartment, deleteDepartment } from "@/lib/department-actions";

export const metadata = { title: "Edit Department — Admin" };

export default async function EditDepartmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const department = await prisma.department.findUnique({ where: { id } });
  if (!department) notFound();

  const boundUpdate = updateDepartment.bind(null, department.id);
  const boundDelete = deleteDepartment.bind(null, department.id);

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Edit Department — {department.nameEn}</h1>
        <DeleteConfirmButton label="department" action={boundDelete} />
      </div>
      <div className="mt-6">
        <SimpleEntityForm
          action={boundUpdate}
          submitLabel="Save department"
          fields={[
            { name: "nameEn", label: "Name (English)", type: "text", required: true, defaultValue: department.nameEn },
            { name: "nameFa", label: "Name (Persian)", type: "text", dir: "rtl", required: true, defaultValue: department.nameFa },
            { name: "slug", label: "Slug", type: "text", defaultValue: department.slug },
            { name: "descriptionEn", label: "Description (English)", type: "textarea", defaultValue: department.descriptionEn ?? "" },
            { name: "descriptionFa", label: "Description (Persian)", type: "textarea", dir: "rtl", defaultValue: department.descriptionFa ?? "" },
            { name: "order", label: "Order", type: "number", defaultValue: department.order },
            { name: "isActive", label: "Active", type: "checkbox", defaultValue: department.isActive },
          ]}
        />
      </div>
    </AdminShell>
  );
}
