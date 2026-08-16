import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { SimpleEntityForm } from "@/components/admin/SimpleEntityForm";
import { DeleteConfirmButton } from "@/components/admin/DeleteConfirmButton";
import { updateTimelineEvent, deleteTimelineEvent } from "@/lib/timeline-actions";

export const metadata = { title: "Edit Timeline Event — Admin" };

function dateInputValue(d: Date | null) {
  return d ? new Date(d).toISOString().slice(0, 10) : "";
}

export default async function EditTimelineEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await prisma.timelineEvent.findUnique({ where: { id }, include: { media: true } });
  if (!event) notFound();

  const boundUpdate = updateTimelineEvent.bind(null, event.id);
  const boundDelete = deleteTimelineEvent.bind(null, event.id);

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Edit Timeline Event — {event.titleEn}</h1>
        <DeleteConfirmButton label="event" action={boundDelete} />
      </div>
      <div className="mt-6">
        <SimpleEntityForm
          action={boundUpdate}
          submitLabel="Save event"
          fields={[
            { name: "titleEn", label: "Title (English)", type: "text", required: true, defaultValue: event.titleEn },
            { name: "titleFa", label: "Title (Persian)", type: "text", dir: "rtl", defaultValue: event.titleFa ?? "" },
            { name: "descriptionEn", label: "Description (English)", type: "textarea", defaultValue: event.descriptionEn ?? "" },
            { name: "descriptionFa", label: "Description (Persian)", type: "textarea", dir: "rtl", defaultValue: event.descriptionFa ?? "" },
            { name: "date", label: "Date", type: "date", defaultValue: dateInputValue(event.date) },
            { name: "mediaId", label: "Image", type: "media", mediaPurpose: "galleryImage", initialMedia: event.media },
            { name: "order", label: "Order", type: "number", defaultValue: event.order },
            { name: "isPublished", label: "Published", type: "checkbox", defaultValue: event.isPublished },
          ]}
        />
      </div>
    </AdminShell>
  );
}
