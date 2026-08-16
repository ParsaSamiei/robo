import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { SimpleEntityForm } from "@/components/admin/SimpleEntityForm";
import { createSponsor } from "@/lib/partnerships-actions";

export const metadata = { title: "New Sponsor — Admin" };

export default async function NewSponsorPage() {
  const tiers = await prisma.sponsorTier.findMany({ orderBy: { order: "asc" } });

  return (
    <AdminShell>
      <h1 className="text-xl font-semibold">New Sponsor</h1>
      <div className="mt-6">
        <SimpleEntityForm
          action={createSponsor}
          fields={[
            { name: "name", label: "Name", type: "text", required: true },
            { name: "slug", label: "Slug (leave blank to auto-generate)", type: "text" },
            { name: "descriptionEn", label: "Description (English)", type: "textarea" },
            { name: "descriptionFa", label: "Description (Persian)", type: "textarea", dir: "rtl" },
            { name: "websiteUrl", label: "Website URL", type: "url" },
            { name: "logoMediaId", label: "Logo", type: "media", mediaPurpose: "sponsorLogo" },
            {
              name: "tierId",
              label: "Tier",
              type: "select",
              defaultValue: "",
              options: [{ value: "", label: "No tier" }, ...tiers.map((t) => ({ value: t.id, label: t.nameEn }))],
            },
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
