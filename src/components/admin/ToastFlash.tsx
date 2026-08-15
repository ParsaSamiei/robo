"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { toast } from "react-toastify";

// Docs/06_ADMIN_PANEL.md #46: React-Toastify for feedback, not alert().
// Reads a one-shot `?saved=<message>` query param (set by a redirect after
// a server action) and shows it, then strips the param so refreshing the
// page doesn't re-trigger the toast.
export function ToastFlash() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const message = params.get("saved");
    if (message) {
      toast.success(message);
      const next = new URLSearchParams(params);
      next.delete("saved");
      router.replace(next.size ? `${pathname}?${next}` : pathname, { scroll: false });
    }
  }, [params, pathname, router]);

  return null;
}
