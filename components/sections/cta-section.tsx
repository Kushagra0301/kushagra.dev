import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Marquee } from "@/components/ui/marquee";
import { EmailAction } from "@/components/ui/email-action";
import { ParticleField } from "@/components/ui/particle-field";

const keywords = [
  "Web Design",
  "Next.js",
  "Motion",
  "Landing Pages",
  "Performance",
  "Accessibility",
  "Branding",
];

export function CTASection() {
  return (
    <section className="relative overflow-hidden border-t border-border">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-48 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-accent/12 blur-[120px]" />
        <ParticleField density="sparse" />
      </div>

      <div className="relative py-20 md:py-28">
        <Marquee items={keywords} className="mb-16 text-muted" duration={45} />

        <div className="wrap">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-6">Next step</p>
            <h2 className="text-display-2">
              Let&apos;s build something{" "}
              <span className="font-serif font-normal italic text-accent-ink">
                worth
              </span>{" "}
              visiting.
            </h2>
            <p className="mx-auto mt-6 max-w-[46ch] text-lead text-muted">
              Tell me what you are building and what it has to achieve. You will
              get a straight answer on scope, price and timeline — usually within
              a day.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/contact" size="lg">
                Start a project
              </Button>
              <EmailAction variant="button" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
