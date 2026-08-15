import { AdminShell } from "@/components/admin/AdminShell";
import { SimpleEntityForm } from "@/components/admin/SimpleEntityForm";
import { createTimelineEvent } from "@/lib/timeline-actions";

export const metadata = { title: "New Timeline Event — Admin" };

export default function NewTimelineEventPage() {
  return (
    <AdminShell>
      <h1 className="text-xl font-semibold">New Timeline Event</h1>
      <div className="mt-6">
        <SimpleEntityForm
          action={createTimelineEvent}
          fields={[
            { name: "titleEn", label: "Title (English)", type: "text", required: true },
            { name: "titleFa", label: "Title (Persian)", type: "text", dir: "rtl" },
            { name: "descriptionEn", label: "Description (English)", type: "textarea" },
            { name: "descriptionFa", label: "Description (Persian)", type: "textarea", dir: "rtl" },
            { name: "date", label: "Date", type: "date" },
            { name: "mediaId", label: "Image", type: "media", mediaPurpose: "galleryImage" },
            { name: "order", label: "Order", type: "number", defaultValue: 0 },
            { name: "isPublished", label: "Published", type: "checkbox" },
          ]}
        />
      </div>
    </AdminShell>
  );
}
