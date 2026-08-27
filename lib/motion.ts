import type { Variants } from "framer-motion";

export const DURATION = {
  micro: 0.15,
  ui: 0.3,
  reveal: 0.5,
  hero: 0.8,
} as const;

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_IN = [0.64, 0, 0.78, 0] as const;

/** Section headers and other primary content. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.reveal, ease: EASE_OUT },
  },
};

export const fadeUpSubtle: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DURATION.reveal, ease: EASE_OUT } },
};

export const stagger = (staggerChildren = 0.06, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/** Per-line clip-and-rise used for the hero headline. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: "55%" },
  show: {
    opacity: 1,
    y: "0%",
    transition: { duration: DURATION.hero, ease: EASE_OUT },
  },
};

/** Exits: faster than the matching entrance, and accelerating. */
export const exitTransition = {
  duration: DURATION.ui,
  ease: EASE_IN,
} as const;

export const viewport = { once: true, margin: "-60px" } as const;
