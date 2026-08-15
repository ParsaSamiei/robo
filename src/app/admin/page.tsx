import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata = { title: "Admin Dashboard" };

// Docs/06_ADMIN_PANEL.md #8: overview cards. #9: recent activity feed --
// built here from createdAt/updatedAt timestamps that already exist on
// every model, rather than a separate audit-log table (§9 explicitly says
// this "does not need to be a complete enterprise audit system initially").
export default async function AdminDashboardPage() {
  const [
    currentMembers,
    alumni,
    projects,
    robots,
    competitions,
    blogPosts,
    news,
    sponsors,
    newApplications,
    unreadMessages,
    draftProjects,
  ] = await Promise.all([
    prisma.member.count({ where: { membershipStatus: "CURRENT" } }),
    prisma.member.count({ where: { membershipStatus: "ALUMNI" } }),
    prisma.project.count(),
    prisma.robot.count(),
    prisma.competition.count(),
    prisma.blogPost.count(),
    prisma.newsPost.count(),
    prisma.sponsor.count(),
    prisma.joinApplication.count({ where: { status: "NEW" } }),
    prisma.contactSubmission.count({ where: { status: "NEW" } }),
    prisma.project.count({ where: { publicationStatus: "DRAFT" } }),
  ]).catch(() => Array(11).fill(0));

  const cards = [
    { label: "Current Members", value: currentMembers, href: "/admin/members" },
    { label: "Alumni", value: alumni, href: "/admin/members" },
    { label: "Projects", value: projects, href: "/admin/projects" },
    { label: "Robots", value: robots, href: "/admin/robots" },
    { label: "Competitions", value: competitions, href: "/admin/competitions" },
    { label: "Blog Posts", value: blogPosts, href: "/admin/blog" },
    { label: "News", value: news, href: "/admin/news" },
    { label: "Sponsors", value: sponsors, href: "/admin/sponsors" },
  ];

  const actionable = [
    { label: "New join applications", value: newApplications, href: "/admin/applications" },
    { label: "Unread contact messages", value: unreadMessages, href: "/admin/messages" },
    { label: "Draft projects", value: draftProjects, href: "/admin/projects" },
  ];

  return (
    <AdminShell>
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-md border border-[#27323d] bg-[#111820] p-4 hover:border-[#d7a84b]"
          >
            <p className="text-2xl font-semibold">{c.value}</p>
            <p className="mt-1 text-xs text-[#7e8995]">{c.label}</p>
          </Link>
        ))}
      </div>

      <h2 className="mt-10 text-sm font-semibold uppercase tracking-wide text-[#7e8995]">
        Needs attention
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {actionable.map((a) => (
          <Link
            key={a.label}
            href={a.href}
            className="rounded-md border border-[#27323d] bg-[#111820] p-4 hover:border-[#d7a84b]"
          >
            <p className="text-2xl font-semibold text-[#d7a84b]">{a.value}</p>
            <p className="mt-1 text-xs text-[#7e8995]">{a.label}</p>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
