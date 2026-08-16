"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={onLogout}
      className="rounded-md border border-[#27323d] px-3 py-1.5 text-xs font-medium text-[#b6c0ca] hover:border-[#d7a84b] hover:text-white"
    >
      Log out
    </button>
  );
}
