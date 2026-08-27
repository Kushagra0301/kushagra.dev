import { testimonials } from "@/content/site";
import { Section } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <Section eyebrow="Client words" title="What it is like to work with me.">
      <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <RevealItem key={`${t.author}-${t.company}`}>
            <figure className="flex h-full flex-col rounded-card border border-border bg-surface p-8">
              <blockquote className="flex-1 leading-relaxed text-fg">
                <p>&ldquo;{t.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-5">
                <p className="font-semibold">{t.author}</p>
                <p className="text-sm text-muted">
                  {t.title}, {t.company}
                </p>
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
