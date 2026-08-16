import { AdminShell } from "@/components/admin/AdminShell";
import { SimpleEntityForm } from "@/components/admin/SimpleEntityForm";
import { createSocialLink } from "@/lib/partnerships-actions";

export const metadata = { title: "New Social Link — Admin" };

const platformOptions = ["INSTAGRAM", "LINKEDIN", "YOUTUBE", "GITHUB", "TELEGRAM"].map((v) => ({
  value: v,
  label: v.charAt(0) + v.slice(1).toLowerCase(),
}));

export default function NewSocialLinkPage() {
  return (
    <AdminShell>
      <h1 className="text-xl font-semibold">New Social Link</h1>
      <div className="mt-6">
        <SimpleEntityForm
          action={createSocialLink}
          fields={[
            { name: "platform", label: "Platform", type: "select", defaultValue: "INSTAGRAM", options: platformOptions },
            { name: "url", label: "URL", type: "url", required: true },
            { name: "order", label: "Order", type: "number", defaultValue: 0 },
            { name: "isEnabled", label: "Enabled", type: "checkbox", defaultValue: true },
          ]}
        />
      </div>
    </AdminShell>
  );
}
