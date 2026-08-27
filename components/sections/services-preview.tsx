import { ArrowRight } from "lucide-react";
import { services } from "@/content/services";
import { Section } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

const COUNT_WORDS = [
  "No",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
];

export function ServicesPreview() {
  const count = COUNT_WORDS[services.length] ?? String(services.length);

  return (
    <Section
      eyebrow="What I do"
      title={`${count} things, done properly.`}
      lead="No agency menu of forty services. This is the work I do every week, and it is the work I am accountable for."
    >
      <RevealGroup className="border-t border-border">
        {services.map((service, i) => (
          <RevealItem key={service.id}>
            <div className="group grid gap-4 border-b border-border py-8 md:grid-cols-[auto_1fr_1.2fr] md:items-start md:gap-10">
              <span className="font-mono text-xs text-muted md:pt-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent-ink md:text-3xl">
                {service.title}
              </h3>
              <div>
                <p className="leading-relaxed text-muted">{service.blurb}</p>
                <ul className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  {service.deliverables.map((d, di) => (
                    <li
                      key={d}
                      className="flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted"
                    >
                      {di > 0 && (
                        <span aria-hidden className="text-accent-ink/60">
                          ·
                        </span>
                      )}
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-10">
        <Button href="/services" variant="secondary">
          Pricing &amp; process
          <ArrowRight aria-hidden className="size-4" />
        </Button>
      </div>
    </Section>
  );
}
