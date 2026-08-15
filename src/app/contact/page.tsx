import { prisma } from "@/lib/prisma";
import { Section } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Contact", path: "/contact" });

// Docs/10 #55: "contact information + form + social links" (Pishtalk-style).
export default async function ContactPage() {
  const socialLinks = await prisma.socialLink
    .findMany({ where: { isEnabled: true }, orderBy: { order: "asc" } })
    .catch(() => []);

  return (
    <Section className="pt-3xl">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">Contact</p>
      <h1 className="mt-4 text-h1 font-bold">Get in touch</h1>

      <div className="mt-12 grid gap-12 md:grid-cols-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-text-faint">
            Iran University of Science and Technology
          </p>
          <p className="mt-3 text-text-secondary">Narmak, Tehran, Iran</p>

          {socialLinks.length > 0 && (
            <div className="mt-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-text-faint">
                Follow us
              </p>
              <ul className="mt-3 space-y-2">
                {socialLinks.map((s) => (
                  <li key={s.id}>
                    <a href={s.url} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                      {s.platform.charAt(0) + s.platform.slice(1).toLowerCase()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
