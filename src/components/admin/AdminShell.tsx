import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSession } from "@/lib/auth";
import { LogoutButton } from "@/components/admin/LogoutButton";

// Docs/06_ADMIN_PANEL.md #6: sidebar + topbar shell.
// #7: admin should look clean/functional/dense, deliberately NOT the
// premium public visual style -- hence a separate, plainer palette here
// rather than reusing the public design tokens.
// #10: nav grouped into TEAM / ENGINEERING / COMPETITIONS / CONTENT /
// PARTNERSHIPS / COMMUNITY / WEBSITE rather than one flat list.
const navGroups: { label: string; items: { href: string; label: string }[] }[] = [
  {
    label: "Team",
    items: [
      { href: "/admin/members", label: "Members" },
      { href: "/admin/departments", label: "Departments" },
      { href: "/admin/technologies", label: "Technologies" },
    ],
  },
  {
    label: "Engineering",
    items: [
      { href: "/admin/projects", label: "Projects" },
      { href: "/admin/robots", label: "Robots" },
    ],
  },
  {
    label: "Competitions",
    items: [{ href: "/admin/competitions", label: "Competitions" }],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/blog", label: "Blog" },
      { href: "/admin/news", label: "News" },
    ],
  },
  {
    label: "Partnerships",
    items: [
      { href: "/admin/sponsors", label: "Sponsors" },
      { href: "/admin/sponsor-tiers", label: "Sponsor Tiers" },
      { href: "/admin/partners", label: "Partners" },
    ],
  },
  {
    label: "Website",
    items: [
      { href: "/admin/gallery", label: "Gallery" },
      { href: "/admin/timeline", label: "Timeline" },
      { href: "/admin/social-links", label: "Social Links" },
      { href: "/admin/settings", label: "Settings" },
    ],
  },
  {
    label: "Community",
    items: [
      { href: "/admin/applications", label: "Join Applications" },
      { href: "/admin/messages", label: "Contact Messages" },
    ],
  },
];

export async function AdminShell({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <div className="flex min-h-screen bg-[#0d1117] text-[#e6edf3]">
      <aside className="hidden w-60 flex-shrink-0 border-r border-[#27323d] bg-[#111820] md:block">
        <div className="border-b border-[#27323d] px-5 py-4">
          <Link href="/admin" className="font-mono text-sm font-semibold tracking-widest">
            IUST ROBOTICS
          </Link>
          <p className="mt-0.5 text-xs text-[#7e8995]">Admin</p>
        </div>

        <nav className="px-3 py-4">
          <Link
            href="/admin"
            className="block rounded-md px-2 py-1.5 text-sm font-medium text-[#e6edf3] hover:bg-[#1b2530]"
          >
            Dashboard
          </Link>

          {navGroups.map((group) => (
            <div key={group.label} className="mt-5">
              <p className="px-2 text-[11px] font-semibold uppercase tracking-wider text-[#56616c]">
                {group.label}
              </p>
              <div className="mt-1 space-y-0.5">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-md px-2 py-1.5 text-sm text-[#b6c0ca] hover:bg-[#1b2530] hover:text-[#e6edf3]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-[#27323d] bg-[#111820] px-6 py-3">
          <p className="text-sm text-[#7e8995]">Signed in as {session?.username}</p>
          <LogoutButton />
        </header>
        <main className="p-6">{children}</main>
      </div>
      <ToastContainer theme="dark" position="bottom-right" autoClose={3000} />
    </div>
  );
}
