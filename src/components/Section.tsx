import { ReactNode } from "react";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-xl md:py-2xl ${className}`}>
      <div className="mx-auto max-w-container px-md md:px-xl">{children}</div>
    </section>
  );
}
