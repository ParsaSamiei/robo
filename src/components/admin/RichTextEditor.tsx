"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";

// Docs/12_CONTENT_SYSTEM.md §59-60: "Do not store arbitrary HTML unless
// there is a strong reason" -- Markdown is explicitly called out as "a
// reasonable starting point for technical articles" for a small student
// team, as long as the admin editor itself stays comfortable to use.
// Docs/06_ADMIN_PANEL.md §26: "Do not build a custom rich-text editor from
// scratch. Use a mature editor compatible with React/Next.js." -- this
// wraps @uiw/react-md-editor (headings/lists/links/code/quotes/tables all
// come for free via standard Markdown syntax) rather than hand-rolling a
// toolbar over contentEditable.
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export function RichTextEditor({
  name,
  label,
  defaultValue = "",
  dir,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  dir?: "rtl";
}) {
  const [value, setValue] = useState(defaultValue);

  return (
    <div data-color-mode="dark">
      <label className="mb-1.5 block text-sm text-[#b6c0ca]">{label}</label>
      {/* Hidden field carries the Markdown string into the surrounding
          <form>'s FormData -- MDEditor itself isn't a native form control. */}
      <input type="hidden" name={name} value={value} />
      {/* Docs/06 §27: English stays LTR, Persian stays RTL, without mixing
          directionality -- set per-instance via the `dir` prop from the
          caller (contentEn vs contentFa), not inferred from content. */}
      <div dir={dir ?? "ltr"}>
        <MDEditor value={value} onChange={(v) => setValue(v ?? "")} height={280} preview="live" />
      </div>
    </div>
  );
}
