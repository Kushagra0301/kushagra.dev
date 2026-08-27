import type { Variants } from "framer-motion";

/**
 * Shared motion system.
 *
 * Reduced-motion is handled globally by <MotionConfig reducedMotion="user">
 * in app/providers.tsx, so these degrade to instant transitions without any
 * per-component branching.
 *
 * Three duration tiers rather than one value reused everywhere — a hover
 * colour change and a hero headline entrance are not the same event, and
 * giving them the same timing is what makes motion read as generic:
 *
 *   micro  (150ms)  colour/opacity on hover and focus — must feel instant
 *   ui     (300ms)  transforms on interactive elements — must feel responsive
 *   reveal (500ms)  scroll entrances — the only tier allowed to be slow
 *   hero   (800ms)  the one first-paint moment on the landing page
 *
 * Entrances decelerate into place (ease-out); exits accelerate away and run
 * shorter, because leaving should not cost the user attention.
 */

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

/**
 * Secondary content — grid items, list rows, cards.
 *
 * Deliberately shallower and quicker than fadeUp. When every element on a page
 * travels the same distance at the same speed, the motion stops describing
 * hierarchy and just becomes noise; the smaller offset keeps a grid feeling
 * subordinate to the heading that introduces it.
 */
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

/**
 * Fires a little before the element is fully on screen, so content has
 * finished arriving by the time the reader's eye reaches it.
 */
export const viewport = { once: true, margin: "-60px" } as const;
