import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { SimpleEntityForm } from "@/components/admin/SimpleEntityForm";
import { DeleteConfirmButton } from "@/components/admin/DeleteConfirmButton";
import { updateTechnology, deleteTechnology } from "@/lib/technology-actions";

export const metadata = { title: "Edit Technology — Admin" };

export default async function EditTechnologyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const technology = await prisma.technology.findUnique({ where: { id } });
  if (!technology) notFound();

  const boundUpdate = updateTechnology.bind(null, technology.id);
  const boundDelete = deleteTechnology.bind(null, technology.id);

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Edit Technology — {technology.name}</h1>
        <DeleteConfirmButton label="technology" action={boundDelete} />
      </div>
      <div className="mt-6">
        <SimpleEntityForm
          action={boundUpdate}
          submitLabel="Save technology"
          fields={[
            { name: "name", label: "Name", type: "text", required: true, defaultValue: technology.name },
            { name: "slug", label: "Slug", type: "text", defaultValue: technology.slug },
            { name: "category", label: "Category", type: "text", defaultValue: technology.category ?? "" },
            { name: "descriptionEn", label: "Description (English)", type: "textarea", defaultValue: technology.descriptionEn ?? "" },
            { name: "descriptionFa", label: "Description (Persian)", type: "textarea", dir: "rtl", defaultValue: technology.descriptionFa ?? "" },
            { name: "websiteUrl", label: "Website URL", type: "url", defaultValue: technology.websiteUrl ?? "" },
            { name: "order", label: "Order", type: "number", defaultValue: technology.order },
            { name: "isPublished", label: "Published", type: "checkbox", defaultValue: technology.isPublished },
          ]}
        />
      </div>
    </AdminShell>
  );
}
