"use client";

import { motion } from "framer-motion";
import { fadeUp, fadeUpSubtle, stagger, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Scroll-reveal wrappers.
 *
 * Every one carries `data-reveal`, which the reduced-motion block in
 * globals.css uses to force the finished state.
 *
 * That override has to be CSS, not JS. Framer emits the `initial` variant as
 * inline styles during SSR, and the server cannot know the visitor's motion
 * preference — so any client-side branch leaves a stale `opacity: 0` on the
 * server-rendered element and the content stays invisible. A stylesheet rule
 * applies before first paint and does not care about hydration at all.
 */

/** Scroll-triggered fade-up. The workhorse wrapper for section content. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section" | "span";
}) {
  const Comp = motion[as];
  return (
    <Comp
      data-reveal
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </Comp>
  );
}

/** Parent that staggers any <RevealItem> children beneath it. */
export function RevealGroup({
  children,
  className,
  gap = 0.06,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
}) {
  return (
    <motion.div
      data-reveal
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={stagger(gap, delay)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * A child of RevealGroup. Uses the subtler variant by design: grid items are
 * secondary to the heading that introduced them, and should move less.
 */
export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div data-reveal variants={fadeUpSubtle} className={cn(className)}>
      {children}
    </motion.div>
  );
}
