"use client";

import { useEffect } from "react";

// Docs/06_ADMIN_PANEL.md #44: warn before leaving forms with unsaved
// changes -- explicitly called out for Blog/News/Project/Robot/Competition,
// applied here to Member as well since it has the same substantial-form
// shape.
export function useUnsavedChangesWarning(dirty: boolean) {
  useEffect(() => {
    if (!dirty) return;
    function handler(e: BeforeUnloadEvent) {
      e.preventDefault();
      e.returnValue = "";
    }
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);
}
