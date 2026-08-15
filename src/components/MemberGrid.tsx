import Link from "next/link";
import Image from "next/image";
import { EmptyState } from "@/components/EmptyState";
import { Reveal } from "@/components/Reveal";
import type { Member, MemberDepartment, Department, Media } from "@prisma/client";

type MemberWithDepartments = Member & {
  departments: (MemberDepartment & { department: Department })[];
  photo?: Media | null;
};

export function MemberGrid({ members }: { members: MemberWithDepartments[] }) {
  if (members.length === 0) {
    return <EmptyState message="No published members yet." />;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {members.map((member, i) => (
        <Reveal key={member.id} delayMs={Math.min(i, 5) * 60}>
          <Link
            href={`/team/members/${member.slug}`}
            className="block rounded-lg border border-border bg-surface p-5 transition hover:border-accent"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-md bg-surface-elevated">
              {member.photo?.mediumPath && (
                <Image
                  src={member.photo.mediumPath}
                  alt={member.photo.altTextEn ?? member.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              )}
            </div>
            <p className="mt-4 font-semibold">{member.name}</p>
            {member.roleEn && <p className="text-sm text-text-muted">{member.roleEn}</p>}
            {member.departments.length > 0 && (
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-text-faint">
                {member.departments.map((d) => d.department.nameEn).join(" · ")}
              </p>
            )}
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
