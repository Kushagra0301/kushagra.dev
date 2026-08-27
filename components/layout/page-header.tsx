import { Reveal } from "@/components/ui/reveal";

/** Shared masthead for every non-landing route. */
export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_20%_0%,black,transparent_65%)]" />
      </div>
      <div className="wrap relative py-16 md:py-24">
        <Reveal>
          <p className="eyebrow mb-5 flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-accent" aria-hidden />
            {eyebrow}
          </p>
          <h1 className="max-w-[18ch] text-display-2">
            {title}
          </h1>
          {lead && (
            <p className="mt-6 max-w-[var(--measure)] text-lead text-muted">
              {lead}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
