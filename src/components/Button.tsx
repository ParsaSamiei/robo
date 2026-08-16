import Link from "next/link";
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent text-[#11161B] hover:brightness-110 hover:-translate-y-px",
  secondary:
    "bg-transparent border border-border text-text-primary hover:border-accent hover:-translate-y-px",
  ghost: "bg-transparent text-text-secondary hover:text-text-primary",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-all duration-150 ease-out";

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button className={`${base} ${variantClasses[variant]} ${className}`} {...props} />
  );
}

export function LinkButton({
  variant = "primary",
  className = "",
  href,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; href: string }) {
  return (
    <Link href={href} className={`${base} ${variantClasses[variant]} ${className}`} {...props} />
  );
}
