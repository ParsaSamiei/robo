import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { SimpleEntityForm } from "@/components/admin/SimpleEntityForm";
import { DeleteConfirmButton } from "@/components/admin/DeleteConfirmButton";
import { updateSocialLink, deleteSocialLink } from "@/lib/partnerships-actions";

export const metadata = { title: "Edit Social Link — Admin" };

const platformOptions = ["INSTAGRAM", "LINKEDIN", "YOUTUBE", "GITHUB", "TELEGRAM"].map((v) => ({
  value: v,
  label: v.charAt(0) + v.slice(1).toLowerCase(),
}));

export default async function EditSocialLinkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const link = await prisma.socialLink.findUnique({ where: { id } });
  if (!link) notFound();

  const boundUpdate = updateSocialLink.bind(null, link.id);
  const boundDelete = deleteSocialLink.bind(null, link.id);

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Edit Social Link — {link.platform}</h1>
        <DeleteConfirmButton label="link" action={boundDelete} />
      </div>
      <div className="mt-6">
        <SimpleEntityForm
          action={boundUpdate}
          submitLabel="Save link"
          fields={[
            { name: "platform", label: "Platform", type: "select", defaultValue: link.platform, options: platformOptions },
            { name: "url", label: "URL", type: "url", required: true, defaultValue: link.url },
            { name: "order", label: "Order", type: "number", defaultValue: link.order },
            { name: "isEnabled", label: "Enabled", type: "checkbox", defaultValue: link.isEnabled },
          ]}
        />
      </div>
    </AdminShell>
  );
}
