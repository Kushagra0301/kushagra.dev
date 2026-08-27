"use client";

import { useTheme } from "next-themes";
import { RisingParticles } from "./rising-particles";

/**
 * Theme-aware wrapper for the rising particle field.
 *
 * Colour choice is deliberate: the motes are desaturated NEUTRALS, never the
 * accent teal. The accent belongs to the dot cursor and the primary CTAs, and
 * a field of drifting teal motes would camouflage the cursor exactly when the
 * user is trying to track it. Neutrals keep the two layers legible against
 * each other.
 *
 * The neutrals are temperature-matched to their ground: cool on the teal-black
 * dark background, warmer on the sand-paper light one.
 *
 * Absolutely positioned, so the parent needs `relative` and `overflow-hidden`.
 */
export function ParticleField({
  density = "normal",
}: {
  density?: "normal" | "sparse";
}) {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  return (
    <RisingParticles
      count={density === "sparse" ? 70 : 130}
      speed={0.9}
      // Kept small on purpose: at anything above ~2% of viewport height the
      // motes stop reading as points of light and start reading as smudges.
      minSize={0.004}
      maxSize={0.018}
      sway={0.05}
      swayRate={0.5}
      depth={0.7}
      coreSize={0.22}
      fade={0.3}
      cursorPush={0.1}
      cursorRadius={0.3}
      // Additive on dark reads as light in the air; on paper the motes have
      // to be darker than the ground, so they composite normally instead.
      blend={dark ? "lighter" : "source-over"}
      color={dark ? "#e8f6f3" : "#77837f"}
      farColor={dark ? "#7fa9a3" : "#b0bab6"}
      opacity={dark ? 0.42 : 0.34}
    />
  );
}
