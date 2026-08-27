import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

/**
 * Colour moves on the micro tier (150ms) so hover reads as instant; the lift
 * and the press move with it rather than on a separate slow track. The old
 * 300ms on every property made even a colour change feel laggy.
 */
const base =
  "group relative inline-flex select-none items-center justify-center gap-2 rounded-full " +
  "whitespace-nowrap font-medium " +
  "transition-[background-color,color,border-color,box-shadow,transform] " +
  "duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] " +
  "hover:-translate-y-px active:translate-y-0 active:scale-[0.985] " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-fg shadow-[0_6px_20px_-10px_var(--accent)] " +
    "hover:shadow-[0_12px_28px_-12px_var(--accent)] hover:brightness-[1.06]",
  secondary:
    "border border-border bg-surface text-fg " +
    "hover:border-accent hover:bg-accent-soft/50 hover:text-accent-ink",
  ghost: "text-muted hover:text-accent-ink",
};

/** All sizes clear 44px on touch; `sm` only shrinks from the sm: breakpoint up. */
const sizes: Record<Size, string> = {
  sm: "h-11 px-4 text-sm sm:h-9",
  md: "h-11 px-6 text-[0.9375rem]",
  lg: "h-12 px-7 text-base sm:h-13 sm:px-8",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type AnchorProps = CommonProps & {
  href: string;
  /** Opens in a new tab with the right rel; inferred for absolute URLs. */
  external?: boolean;
};

export function Button(props: ButtonProps | AnchorProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const { href, external, ...rest } = props as AnchorProps;
    const isExternal = external ?? /^https?:\/\//.test(href);

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className={classes}
          {...stripCommon(rest)}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...stripCommon(rest)}>
        {children}
      </Link>
    );
  }

  const { ...rest } = props as ButtonProps;
  return (
    <button className={classes} {...stripCommon(rest)}>
      {children}
    </button>
  );
}

/** Drops the presentational props so they never land on the DOM node. */
function stripCommon<T extends Record<string, unknown>>(props: T) {
  const { variant, size, className, children, external, href, ...rest } =
    props as T & CommonProps & { external?: boolean; href?: string };
  void variant;
  void size;
  void className;
  void children;
  void external;
  void href;
  return rest;
}
