"use client";

import { useEffect, useRef, useState } from "react";

// Docs/17_3D_AND_INTERACTIONS.md #16-17: opacity + small translateY reveal
// on scroll-into-view, short duration, optional stagger via `delayMs`.
// Respects prefers-reduced-motion (globals.css already disables all
// transitions/animations under that media query, so this component doesn't
// need its own check for the CSS side -- only for skipping the initial
// hidden state so reduced-motion users never see a flash of invisible
// content if JS is slow to attach the observer).
export function Reveal({
  children,
  delayMs = 0,
  className = "",
}: {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      } ${className}`}
      style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
