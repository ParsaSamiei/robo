import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Renders the Markdown stored by RichTextEditor. react-markdown escapes raw
// HTML by default (no rehype-raw plugin is used), so this is safe against
// stored XSS even though only authenticated admins can write this content --
// defense in depth per Docs/22_SECURITY.md's general "never trust stored
// input" posture.
export function MarkdownContent({ content, dir }: { content: string; dir?: "rtl" }) {
  return (
    <div dir={dir ?? "ltr"} className="prose-measure prose prose-invert prose-sm sm:prose-base max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
