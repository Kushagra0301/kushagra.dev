"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}`;

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Clipboard API needs a secure context and permission. Fall back to a
    // throwaway textarea, which still works where execCommand survives.
    try {
      const field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(field);
      return ok;
    } catch {
      return false;
    }
  }
}

/**
 * A bare `mailto:` is a dead end on a desktop with no mail client registered
 * — the click does nothing at all and the user is left guessing. Clicking
 * here always copies the address and says so, with the mail app and Gmail
 * offered explicitly alongside. Same markup on every device, so there is no
 * hydration branch on pointer type.
 */
export function EmailAction({
  label,
  variant = "inline",
  compact = false,
  className,
}: {
  label?: string;
  variant?: "inline" | "button";
  /** Hides the mail-app/Gmail links where a full row would be too busy. */
  compact?: boolean;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function onCopy() {
    const ok = await copyToClipboard(site.email);
    if (!ok) return;
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2200);
  }

  const isButton = variant === "button";

  return (
    <span
      className={cn(
        "inline-flex flex-wrap items-center gap-x-3 gap-y-2",
        isButton && "justify-center",
        className
      )}
    >
      <button
        type="button"
        onClick={onCopy}
        title={`Copy ${site.email}`}
        className={cn(
          "group inline-flex min-h-11 items-center gap-2 rounded-full transition-colors duration-150",
          isButton
            ? "border border-border bg-surface px-7 text-base font-medium text-fg hover:border-accent hover:bg-accent-soft/50 hover:text-accent-ink"
            : "text-muted hover:text-accent-ink"
        )}
      >
        {copied ? (
          <Check aria-hidden className="size-4 shrink-0 text-accent-ink" />
        ) : (
          <Copy aria-hidden className="size-4 shrink-0 opacity-60" />
        )}
        <span className="break-all">{copied ? "Copied" : (label ?? site.email)}</span>
      </button>

      {!compact && (
      <span className="inline-flex items-center gap-3 text-sm">
        <a
          href={`mailto:${site.email}`}
          className="inline-flex min-h-11 items-center gap-1.5 text-muted transition-colors duration-150 hover:text-accent-ink"
        >
          <Mail aria-hidden className="size-3.5" />
          Mail app
        </a>
        <a
          href={GMAIL_COMPOSE}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex min-h-11 items-center text-muted transition-colors duration-150 hover:text-accent-ink"
        >
          Gmail
        </a>
      </span>
      )}

      <span aria-live="polite" className="sr-only">
        {copied ? `${site.email} copied to clipboard` : ""}
      </span>
    </span>
  );
}
