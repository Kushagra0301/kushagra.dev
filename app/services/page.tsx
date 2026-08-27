import { Check } from "lucide-react";
import { services, faqs } from "@/content/services";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Accordion } from "@/components/ui/accordion";
import { PricingTiers } from "@/components/sections/pricing-tiers";
import { ProcessSection } from "@/components/sections/process-section";
import { CTASection } from "@/components/sections/cta-section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services & Pricing",
  description:
    "Web design, development, motion, landing pages and performance work — with transparent pricing, a clear process and honest answers.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            Clear scope.{" "}
            <span className="font-serif font-normal italic text-accent-ink">
              Clear
            </span>{" "}
            price.
          </>
        }
        lead="You should know what you are buying before you pay for it. Here is exactly what I do, what it costs, and how we get from a first message to a live site."
      />

      <Section eyebrow="Capabilities" title="What I actually do.">
        <RevealGroup className="grid gap-px overflow-hidden rounded-card border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <RevealItem key={service.id} className="bg-bg">
              <div className="flex h-full flex-col p-8">
                <h3 className="text-2xl font-semibold tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted">
                  {service.blurb}
                </p>
                <ul className="mt-6 space-y-2 border-t border-border pt-5">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex gap-2.5 text-sm text-muted">
                      <Check
                        aria-hidden
                        className="mt-0.5 size-4 shrink-0 text-accent-ink"
                      />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section
        id="pricing"
        eyebrow="Pricing"
        title="Starting points, not final quotes."
        lead="Every project gets a fixed price in writing before work begins. These ranges tell you whether we are in the same ballpark."
      >
        <PricingTiers />
      </Section>

      <ProcessSection />

      <Section eyebrow="Questions" title="The things people ask first.">
        <Reveal>
          <Accordion items={faqs} className="max-w-3xl" />
        </Reveal>
      </Section>

      <CTASection />
    </>
  );
}
