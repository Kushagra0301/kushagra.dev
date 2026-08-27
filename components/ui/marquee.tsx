import { cn } from "@/lib/utils";

/**
 * Infinite horizontal ticker.
 *
 * The list is rendered as two identical halves inside one animated track that
 * translates by exactly -50%. Because both halves measure the same — trailing
 * padding included — the loop point is seamless at any content width. Pure
 * CSS, so the global prefers-reduced-motion rule in globals.css freezes it
 * with no JS involved.
 */
export function Marquee({
  items,
  className,
  duration = 40,
  reverse = false,
  separator = "✦",
}: {
  items: string[];
  className?: string;
  duration?: number;
  reverse?: boolean;
  separator?: string;
}) {
  const half = (key: string) => (
    <div key={key} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center">
          <span className="font-display text-2xl font-semibold tracking-tight md:text-4xl">
            {item}
          </span>
          <span className="px-6 text-accent-ink md:px-8" aria-hidden>
            {separator}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
      aria-hidden
    >
      <div
        className="flex w-max"
        style={{
          animation: `marquee ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {half("a")}
        {half("b")}
      </div>
    </div>
  );
}
