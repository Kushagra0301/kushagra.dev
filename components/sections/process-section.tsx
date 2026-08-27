import { process } from "@/content/services";
import { Section } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

export function ProcessSection() {
  return (
    <Section
      eyebrow="How it works"
      title="Four steps, no mystery."
      lead="You always know what happens next, what it costs, and what I need from you to keep moving."
      className="bg-surface-2/60"
    >
      <RevealGroup className="grid gap-px overflow-hidden rounded-card border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
        {process.map((item) => (
          <RevealItem key={item.step} className="bg-bg">
            <div className="h-full p-8">
              <span className="font-mono text-xs text-accent-ink">{item.step}</span>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.body}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
