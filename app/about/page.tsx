import Image from "next/image";
import { Download, Mail } from "lucide-react";
import { site } from "@/content/site";
import { bio, principles, toolkit, timeline } from "@/content/about";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta-section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description: `${site.name} — freelance web developer and designer in ${site.location}. How I work, what I build with, and what you can expect.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={
          <>
            One person.{" "}
            <span className="font-serif font-normal italic text-accent-ink">
              Whole
            </span>{" "}
            job.
          </>
        }
      />

      <Section>
        <div className="grid gap-12 md:grid-cols-[1fr_minmax(0,20rem)] md:gap-16">
          <Reveal>
            <div className="max-w-[var(--measure)] space-y-6 text-lead text-muted">
              {bio.map((para) => (
                <p key={para.slice(0, 32)}>{para}</p>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact">
                <Mail aria-hidden className="size-4" />
                Get in touch
              </Button>
              {site.hasResume && (
                <Button href={site.resumePath} variant="secondary" external>
                  <Download aria-hidden className="size-4" />
                  Download resume
                </Button>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card border border-border bg-surface-2">
              <Image
                src="/portrait.webp"
                alt={`${site.name}, ${site.role}, in ${site.location}`}
                fill
                sizes="(min-width: 768px) 20rem, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between gap-4 border-b border-border pb-3">
                <dt className="text-muted">Based in</dt>
                <dd>{site.location}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-border pb-3">
                <dt className="text-muted">Timezone</dt>
                <dd>{site.timezone}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Status</dt>
                <dd className="text-accent-ink">
                  {site.available ? "Available" : "Booked"}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </Section>

      <Section
        eyebrow="How I work"
        title="Four rules I do not break."
        className="bg-surface-2/60"
      >
        <RevealGroup className="grid gap-px overflow-hidden rounded-card border border-border bg-border md:grid-cols-2">
          {principles.map((p) => (
            <RevealItem key={p.title} className="bg-bg">
              <div className="h-full p-8 md:p-10">
                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section eyebrow="Toolkit" title="What I build with.">
        <RevealGroup className="border-t border-border">
          {toolkit.map((group) => (
            <RevealItem key={group.group}>
              <div className="grid gap-3 border-b border-border py-6 md:grid-cols-[minmax(0,10rem)_1fr] md:gap-10">
                <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-accent-ink md:pt-1">
                  {group.group}
                </h3>
                <ul className="flex flex-wrap gap-x-6 gap-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-lg">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {timeline.length > 0 && (
        <Section eyebrow="Timeline" title="Where I have been.">
          <RevealGroup className="border-t border-border">
            {timeline.map((entry) => (
              <RevealItem key={`${entry.period}-${entry.title}`}>
                <div className="grid gap-3 border-b border-border py-8 md:grid-cols-[minmax(0,12rem)_1fr] md:gap-10">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted md:pt-1.5">
                    {entry.period}
                  </p>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {entry.title}
                      <span className="text-muted"> · {entry.org}</span>
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted">
                      {entry.body}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      )}

      <CTASection />
    </>
  );
}
