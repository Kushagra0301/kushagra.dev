"use client";

import { motion } from "framer-motion";
import { fadeUp, fadeUpSubtle, stagger, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

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
