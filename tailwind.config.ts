import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

// Tokens sourced from Docs/11_DESIGN_SYSTEM.md (canonical design system doc).
const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        "surface-elevated": "var(--color-surface-elevated)",
        border: "var(--color-border)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
        "text-faint": "var(--color-text-faint)",
        accent: "var(--color-accent)",
        "accent-2": "var(--color-accent-secondary)",
      },
      fontFamily: {
        sans: ["var(--font-en)", "system-ui", "sans-serif"],
        fa: ["var(--font-fa)", "Tahoma", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      spacing: {
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)",
        "2xl": "var(--space-2xl)",
        "3xl": "var(--space-3xl)",
      },
      maxWidth: {
        container: "1280px",
        prose: "68ch",
      },
      fontSize: {
        display: "clamp(3rem, 7vw, 7rem)",
        h1: "clamp(2.5rem, 5vw, 5rem)",
        h2: "clamp(2rem, 3.5vw, 3.5rem)",
        h3: "clamp(1.4rem, 2vw, 2rem)",
      },
    },
  },
  plugins: [typography],
};

export default config;
