import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  className,
  headerClassName,
  align = "left",
}: {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  align?: "left" | "center";
}) {
  return (
    <section id={id} className={cn("py-20 md:py-28", className)}>
      <div className="wrap">
        {(eyebrow || title || lead) && (
          <Reveal
            className={cn(
              "mb-12 md:mb-16",
              align === "center" && "mx-auto max-w-2xl text-center",
              headerClassName
            )}
          >
            {eyebrow && (
              <p className="eyebrow mb-4 flex items-center gap-3">
                {align === "left" && (
                  <span className="inline-block h-px w-8 bg-accent" aria-hidden />
                )}
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-balance text-display-2">
                {title}
              </h2>
            )}
            {lead && (
              <p className="mt-5 max-w-[var(--measure)] text-lead text-muted">
                {lead}
              </p>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
