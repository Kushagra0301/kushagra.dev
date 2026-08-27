"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import { CursorLayer } from "@/components/ui/cursor-layer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // Dark-first, deliberately. enableSystem is off so a light OS preference
    // never overrides the design's default — the toggle is the only thing that
    // changes the theme, and its choice persists.
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {/* reducedMotion="user" makes every variant in lib/motion.ts collapse to
          an instant transition when the OS asks for it — no per-component
          branching anywhere else in the codebase. */}
      <MotionConfig reducedMotion="user">
        {children}
        <CursorLayer />
      </MotionConfig>
    </ThemeProvider>
  );
}
