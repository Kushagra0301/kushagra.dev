"use client";

import { useTheme } from "next-themes";
import { RisingParticles } from "./rising-particles";

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
      minSize={0.004}
      maxSize={0.018}
      sway={0.05}
      swayRate={0.5}
      depth={0.7}
      coreSize={0.22}
      fade={0.3}
      cursorPush={0.1}
      cursorRadius={0.3}
      blend={dark ? "lighter" : "source-over"}
      color={dark ? "#e8f6f3" : "#77837f"}
      farColor={dark ? "#7fa9a3" : "#b0bab6"}
      opacity={dark ? 0.42 : 0.34}
    />
  );
}
