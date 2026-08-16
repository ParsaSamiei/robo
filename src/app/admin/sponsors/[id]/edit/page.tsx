import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { SimpleEntityForm } from "@/components/admin/SimpleEntityForm";
import { DeleteConfirmButton } from "@/components/admin/DeleteConfirmButton";
import { updateSponsor, deleteSponsor } from "@/lib/partnerships-actions";

export const metadata = { title: "Edit Sponsor — Admin" };

export default async function EditSponsorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [sponsor, tiers] = await Promise.all([
    prisma.sponsor.findUnique({ where: { id } }),
    prisma.sponsorTier.findMany({ orderBy: { order: "asc" } }),
  ]);
  if (!sponsor) notFound();

  const logoMedia = sponsor.logoMediaId
    ? await prisma.media.findUnique({ where: { id: sponsor.logoMediaId } })
    : null;

  const boundUpdate = updateSponsor.bind(null, sponsor.id);
  const boundDelete = deleteSponsor.bind(null, sponsor.id);

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Edit Sponsor — {sponsor.name}</h1>
        <DeleteConfirmButton label="sponsor" action={boundDelete} />
      </div>
      <div className="mt-6">
        <SimpleEntityForm
          action={boundUpdate}
          submitLabel="Save sponsor"
          fields={[
            { name: "name", label: "Name", type: "text", required: true, defaultValue: sponsor.name },
            { name: "slug", label: "Slug", type: "text", defaultValue: sponsor.slug },
            { name: "descriptionEn", label: "Description (English)", type: "textarea", defaultValue: sponsor.descriptionEn ?? "" },
            { name: "descriptionFa", label: "Description (Persian)", type: "textarea", dir: "rtl", defaultValue: sponsor.descriptionFa ?? "" },
            { name: "websiteUrl", label: "Website URL", type: "url", defaultValue: sponsor.websiteUrl ?? "" },
            { name: "logoMediaId", label: "Logo", type: "media", mediaPurpose: "sponsorLogo", initialMedia: logoMedia },
            {
              name: "tierId",
              label: "Tier",
              type: "select",
              defaultValue: sponsor.tierId ?? "",
              options: [{ value: "", label: "No tier" }, ...tiers.map((t) => ({ value: t.id, label: t.nameEn }))],
            },
            { name: "order", label: "Order", type: "number", defaultValue: sponsor.order },
            {
              name: "publicationStatus",
              label: "Publication status",
              type: "select",
              defaultValue: sponsor.publicationStatus,
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
