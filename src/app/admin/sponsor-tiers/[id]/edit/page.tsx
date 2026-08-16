import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { SimpleEntityForm } from "@/components/admin/SimpleEntityForm";
import { DeleteConfirmButton } from "@/components/admin/DeleteConfirmButton";
import { updateSponsorTier, deleteSponsorTier } from "@/lib/partnerships-actions";

export const metadata = { title: "Edit Sponsor Tier — Admin" };

export default async function EditSponsorTierPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tier = await prisma.sponsorTier.findUnique({ where: { id } });
  if (!tier) notFound();

  const boundUpdate = updateSponsorTier.bind(null, tier.id);
  const boundDelete = deleteSponsorTier.bind(null, tier.id);

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Edit Sponsor Tier — {tier.nameEn}</h1>
        <DeleteConfirmButton label="tier" action={boundDelete} />
      </div>
      <div className="mt-6">
        <SimpleEntityForm
          action={boundUpdate}
          submitLabel="Save tier"
          fields={[
            { name: "nameEn", label: "Name (English)", type: "text", required: true, defaultValue: tier.nameEn },
            { name: "nameFa", label: "Name (Persian)", type: "text", dir: "rtl", defaultValue: tier.nameFa ?? "" },
            { name: "descriptionEn", label: "Description (English)", type: "textarea", defaultValue: tier.descriptionEn ?? "" },
            { name: "descriptionFa", label: "Description (Persian)", type: "textarea", dir: "rtl", defaultValue: tier.descriptionFa ?? "" },
            { name: "order", label: "Order", type: "number", defaultValue: tier.order },
          ]}
        />
      </div>
    </AdminShell>
  );
}
