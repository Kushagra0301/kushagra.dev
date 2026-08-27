import { cn } from "@/lib/utils";
import type { ProjectKind } from "@/content/projects";
import { kindLabel } from "@/content/projects";

export function Badge({
  children,
  className,
  tone = "neutral",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "neutral" | "accent";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em]",
        tone === "accent"
          ? "border-accent/30 bg-accent-soft text-accent-ink"
          : "border-border bg-surface-2 text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}

export function KindBadge({
  kind,
  className,
}: {
  kind: ProjectKind;
  className?: string;
}) {
  return (
    <Badge tone={kind === "concept" ? "neutral" : "accent"} className={className}>
      {kindLabel[kind]}
    </Badge>
  );
}
