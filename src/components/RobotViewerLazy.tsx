"use client";

import dynamic from "next/dynamic";

// Docs/20_PERFORMANCE.md #10-12: the 3D hero must not block H1/description/
// CTA/navigation from rendering, and should be dynamically imported so it
// isn't part of the initial JS bundle. ssr:false because @react-three/fiber
// needs the DOM/WebGL context.
//
// `ssr: false` with next/dynamic is only allowed inside a Client Component
// (App Router has always required this; Next 16 enforces it at build time
// instead of just warning). This wrapper exists solely to hold that call so
// src/app/page.tsx -- a Server Component, since it queries Prisma directly
// -- can import a plain component instead of calling dynamic() itself.
export const RobotViewerLazy = dynamic(
  () => import("@/components/RobotViewer").then((m) => m.RobotViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex aspect-square w-full max-w-lg items-center justify-center rounded-lg border border-border bg-gradient-to-br from-surface to-surface-elevated">
        <span className="font-mono text-xs uppercase tracking-widest text-text-faint">
          Loading model…
        </span>
      </div>
    ),
  }
);
