"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import DotCursor from "./dot-cursor";

export function CursorLayer() {
  const [enabled, setEnabled] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(fine.matches && !calm.matches);

    sync();
    fine.addEventListener("change", sync);
    calm.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      calm.removeEventListener("change", sync);
    };
  }, []);

  if (!enabled) return null;

  const dark = resolvedTheme === "dark";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[var(--z-cursor)]">
      <DotCursor
        label={false}
        size={14}
        trailLength={9}
        trailThickness={10}
        headColor={dark ? "#2dd4bf" : "#0f766e"}
        trailColor={dark ? "rgba(45,212,191,0.38)" : "rgba(15,118,110,0.30)"}
      />
    </div>
  );
}
