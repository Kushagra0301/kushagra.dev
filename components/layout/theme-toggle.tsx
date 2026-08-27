"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

/**
 * Both icons are always rendered and swapped by CSS off the `.dark` class
 * that next-themes sets before first paint. That avoids the usual mounted
 * flag — there is no hydration mismatch to guard against, because the server
 * and client markup are identical.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle colour theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="grid size-11 place-items-center rounded-full border border-border bg-surface text-muted transition-colors duration-150 hover:border-accent hover:text-accent-ink"
    >
      <Moon aria-hidden className="size-[1.05rem] dark:hidden" />
      <Sun aria-hidden className="hidden size-[1.05rem] dark:block" />
    </button>
  );
}
