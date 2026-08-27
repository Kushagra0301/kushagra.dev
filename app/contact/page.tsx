import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { site } from "@/content/site";
import { PageHeader } from "@/components/layout/page-header";
import { EmailAction } from "@/components/ui/email-action";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/sections/contact-form";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description: `Start a project with ${site.name}. Tell me what you are building and get a straight answer on scope, price and timeline.`,
  path: "/contact",
});

const socialLabels: Record<string, string> = {
  upwork: "Upwork",
  github: "GitHub",
  linkedin: "LinkedIn",
  twitter: "X / Twitter",
};

export default function ContactPage() {
  const socials = Object.entries(site.socials).filter(([, href]) => href);

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Tell me what you&apos;re{" "}
            <span className="font-serif font-normal italic text-accent-ink">
              building
            </span>
            .
          </>
        }
        lead="The more you tell me about the goal, the audience and the deadline, the more useful my first reply will be. I read every message myself."
      />

      <div className="wrap py-16 md:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-card border border-border bg-surface p-8">
              <h2 className="text-xl font-semibold tracking-tight">
                Prefer something direct?
              </h2>
              <ul className="mt-6 space-y-5">
                <li className="flex gap-4">
                  <Mail aria-hidden className="mt-0.5 size-5 shrink-0 text-accent-ink" />
                  <div>
                    <p className="eyebrow mb-1">Email</p>
                    <EmailAction />
                  </div>
                </li>
                <li className="flex gap-4">
                  <Phone aria-hidden className="mt-0.5 size-5 shrink-0 text-accent-ink" />
                  <div>
                    <p className="eyebrow mb-1">Phone / WhatsApp</p>
                    <a
                      href={site.phoneHref}
                      className="transition-colors hover:text-accent-ink"
                    >
                      {site.phone}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-accent-ink" />
                  <div>
                    <p className="eyebrow mb-1">Based in</p>
                    <p>{site.location}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Clock aria-hidden className="mt-0.5 size-5 shrink-0 text-accent-ink" />
                  <div>
                    <p className="eyebrow mb-1">Working hours</p>
                    <p>{site.timezone}</p>
                    <p className="mt-1 text-sm text-muted">
                      Daily overlap with US and European mornings.
                    </p>
                  </div>
                </li>
              </ul>

              {socials.length > 0 && (
                <div className="mt-8 border-t border-border pt-6">
                  <p className="eyebrow mb-3">Elsewhere</p>
                  <ul className="flex flex-wrap gap-x-5 gap-y-2">
                    {socials.map(([key, href]) => (
                      <li key={key}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-muted transition-colors hover:text-accent-ink"
                        >
                          {socialLabels[key] ?? key}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {site.available && (
                <p className="mt-8 rounded-xl border border-accent/30 bg-accent-soft p-4 text-sm leading-relaxed">
                  <span className="font-semibold text-accent-ink">
                    {site.availabilityNote}.
                  </span>{" "}
                  Typical reply time is under one working day.
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
