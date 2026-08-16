import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { SimpleEntityForm } from "@/components/admin/SimpleEntityForm";
import { DeleteConfirmButton } from "@/components/admin/DeleteConfirmButton";
import { updatePartner, deletePartner } from "@/lib/partnerships-actions";

export const metadata = { title: "Edit Partner — Admin" };

export default async function EditPartnerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const partner = await prisma.partner.findUnique({ where: { id } });
  if (!partner) notFound();

  const logoMedia = partner.logoMediaId
    ? await prisma.media.findUnique({ where: { id: partner.logoMediaId } })
    : null;

  const boundUpdate = updatePartner.bind(null, partner.id);
  const boundDelete = deletePartner.bind(null, partner.id);

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Edit Partner — {partner.name}</h1>
        <DeleteConfirmButton label="partner" action={boundDelete} />
      </div>
      <div className="mt-6">
        <SimpleEntityForm
          action={boundUpdate}
          submitLabel="Save partner"
          fields={[
            { name: "name", label: "Name", type: "text", required: true, defaultValue: partner.name },
            { name: "slug", label: "Slug", type: "text", defaultValue: partner.slug },
            { name: "descriptionEn", label: "Description (English)", type: "textarea", defaultValue: partner.descriptionEn ?? "" },
            { name: "descriptionFa", label: "Description (Persian)", type: "textarea", dir: "rtl", defaultValue: partner.descriptionFa ?? "" },
            { name: "websiteUrl", label: "Website URL", type: "url", defaultValue: partner.websiteUrl ?? "" },
            { name: "logoMediaId", label: "Logo", type: "media", mediaPurpose: "sponsorLogo", initialMedia: logoMedia },
            { name: "order", label: "Order", type: "number", defaultValue: partner.order },
            {
              name: "publicationStatus",
              label: "Publication status",
              type: "select",
              defaultValue: partner.publicationStatus,
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
