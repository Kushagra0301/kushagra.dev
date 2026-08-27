import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { nav, site } from "@/content/site";
import { EmailAction } from "@/components/ui/email-action";

const socialLabels: Record<string, string> = {
  upwork: "Upwork",
  github: "GitHub",
  linkedin: "LinkedIn",
  twitter: "X / Twitter",
};

export function Footer() {
  // Unset socials are dropped rather than rendered as dead links.
  const socials = Object.entries(site.socials).filter(([, href]) => href);

  return (
    <footer className="border-t border-border">
      <div className="wrap py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-bold tracking-tight">
              {site.name}
              <span className="text-accent-ink">.</span>
            </p>
            <p className="mt-3 max-w-sm leading-relaxed text-muted">
              {site.tagline}
            </p>
            <p className="eyebrow mt-6">
              {site.location} · {site.timezone}
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow mb-4">Pages</p>
            <ul className="space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted transition-colors hover:text-accent-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-4">Elsewhere</p>
            <ul className="space-y-2.5">
              <li>
                <EmailAction label="Email" compact />
              </li>
              <li>
                <a
                  href={site.phoneHref}
                  className="text-muted transition-colors hover:text-accent-ink"
                >
                  {site.phone}
                </a>
              </li>
              {socials.map(([key, href]) => (
                <li key={key}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 text-muted transition-colors hover:text-accent-ink"
                  >
                    {socialLabels[key] ?? key}
                    <ArrowUpRight aria-hidden className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-border pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Built with Next.js &amp; Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
