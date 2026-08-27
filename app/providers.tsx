"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import { CursorLayer } from "@/components/ui/cursor-layer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion="user">
        {children}
        <CursorLayer />
      </MotionConfig>
    </ThemeProvider>
  );
}
