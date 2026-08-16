"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
// TODO: re-enable once translations are ready -- see Header.tsx for the
// matching change.
// import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LinkButton } from "@/components/Button";
import type { Locale } from "@/lib/i18n";

type NavLink = { href: string; label: string };
type SocialLink = { id: string; platform: string; url: string };

// Docs/23_RESPONSIVE_DESIGN.md #24-25: dedicated mobile interaction model
// (not a shrunken desktop nav), giving access to all main pages, the
// language switcher, the primary CTA, and social links. #31: ~44x44px
// touch targets on interactive controls.
export function MobileMenu({
  links,
  locale,
  theme,
  joinLabel,
  socialLinks,
}: {
  links: NavLink[];
  locale: Locale;
  theme: "dark" | "light";
  joinLabel: string;
  socialLinks: SocialLink[];
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll while open, restore focus to the trigger on close.
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      firstLinkRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape to close + a basic focus trap while the panel is open.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        aria-label="Open menu"
        className="flex h-11 w-11 items-center justify-center rounded-md border border-border text-text-primary"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      {open &&
        createPortal(
          <div
            id="mobile-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            ref={panelRef}
            className="fixed inset-0 z-[100] flex flex-col bg-bg"
          >
            <div className="flex items-center justify-between border-b border-border px-md py-4">
              <span className="font-mono text-sm font-semibold tracking-widest text-text-primary">
                IUST ROBOTICS
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-md border border-border text-text-primary"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-md py-6">
              {links.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={i === 0 ? firstLinkRef : undefined}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-md border border-border px-4 py-3.5 text-lg font-medium text-text-primary transition hover:border-accent hover:bg-surface"
                >
                  {link.label}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    className="shrink-0 text-text-faint"
                  >
                    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              ))}
            </nav>

            <div className="border-t border-border px-md py-5">
              <LinkButton href="/join" variant="primary" onClick={() => setOpen(false)} className="w-full">
                {joinLabel}
              </LinkButton>

              <div className="mt-4 flex items-center justify-between">
                <ThemeToggle theme={theme} />
                {/* TODO: re-enable once translations are ready */}
                {/* <LanguageSwitcher locale={locale} /> */}
              </div>

              {socialLinks.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-4">
                  {socialLinks.map((s) => (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-text-secondary hover:text-text-primary"
                    >
                      {s.platform.charAt(0) + s.platform.slice(1).toLowerCase()}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
