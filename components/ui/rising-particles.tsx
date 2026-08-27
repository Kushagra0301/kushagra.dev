"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type RisingParticlesProps = {
  speed?: number;
  count?: number;
  minSize?: number;
  maxSize?: number;
  sway?: number;
  swayRate?: number;
  depth?: number;
  coreSize?: number;
  glow?: number;
  fade?: number;
  color?: string;
  farColor?: string;
  opacity?: number;
  cursorInteraction?: boolean;
  cursorPush?: number;
  cursorRadius?: number;
  paused?: boolean;
  /** "lighter" reads as light on dark; "source-over" as ink on paper. */
  blend?: "lighter" | "source-over";
  className?: string;
};

type Mote = {
  x: number;
  y: number;
  z: number;
  size: number;
  rise: number;
  phase: number;
  swayAmp: number;
  offsetX: number;
  offsetY: number;
};

function parseColor(input: string): [number, number, number] {
  const hex = input.trim().match(/^#([0-9a-f]{3,8})$/i);
  if (hex) {
    let h = hex[1];
    if (h.length === 3 || h.length === 4) {
      h = h
        .split("")
        .map((c) => c + c)
        .join("");
    }
    const n = parseInt(h.slice(0, 6), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const rgb = input.match(/^rgba?\(([^)]+)\)/i);
  if (rgb) {
    const parts = rgb[1].split(",").map((v) => parseFloat(v));
    if (parts.length >= 3) return [parts[0], parts[1], parts[2]];
  }
  return [255, 255, 255];
}

/** Bakes one soft mote into its own canvas so the loop only blits. */
function makeSprite(rgb: [number, number, number], coreSize: number, glow: number) {
  const size = 128;
  const sprite = document.createElement("canvas");
  sprite.width = size;
  sprite.height = size;
  const ctx = sprite.getContext("2d");
  if (!ctx) return sprite;

  const half = size / 2;
  const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);
  const [r, g, b] = rgb;
  const core = Math.max(0.01, Math.min(0.9, coreSize));

  const a = Math.min(1, glow);
  gradient.addColorStop(0, `rgba(${r},${g},${b},${a})`);
  gradient.addColorStop(core * 0.5, `rgba(${r},${g},${b},${a * 0.45})`);
  gradient.addColorStop(core * 1.4, `rgba(${r},${g},${b},${a * 0.1})`);
  gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return sprite;
}

export function RisingParticles({
  speed = 1,
  count = 90,
  minSize = 0.012,
  maxSize = 0.045,
  sway = 0.05,
  swayRate = 0.6,
  depth = 0.65,
  coreSize = 0.3,
  glow = 1,
  fade = 0.35,
  color = "#ffffff",
  farColor = "#8a7f76",
  opacity = 1,
  cursorInteraction = true,
  cursorPush = 0.12,
  cursorRadius = 0.35,
  paused = false,
  blend = "lighter",
  className,
}: RisingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const live = useRef({
    speed,
    count,
    minSize,
    maxSize,
    sway,
    swayRate,
    depth,
    coreSize,
    glow,
    fade,
    color,
    farColor,
    opacity,
    cursorInteraction,
    cursorPush,
    cursorRadius,
    paused,
    blend,
  });

  useEffect(() => {
    live.current = {
      speed,
      count,
      minSize,
      maxSize,
      sway,
      swayRate,
      depth,
      coreSize,
      glow,
      fade,
      color,
      farColor,
      opacity,
      cursorInteraction,
      cursorPush,
      cursorRadius,
      paused,
      blend,
    };
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width = 1;
    let height = 1;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      width = Math.max(1, host.clientWidth);
      height = Math.max(1, host.clientHeight);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Sprites are rebuilt only when the colours actually change.
    let spriteKey = "";
    let nearSprite: HTMLCanvasElement | null = null;
    let farSprite: HTMLCanvasElement | null = null;

    const syncSprites = () => {
      const p = live.current;
      const key = `${p.color}|${p.farColor}|${p.coreSize}|${p.glow}`;
      if (key === spriteKey) return;
      spriteKey = key;
      nearSprite = makeSprite(parseColor(p.color), p.coreSize, p.glow);
      farSprite = makeSprite(parseColor(p.farColor), p.coreSize, p.glow * 0.7);
    };
    syncSprites();

    const spawn = (seeded: boolean): Mote => {
      const p = live.current;
      const z = Math.random();
      return {
        x: Math.random(),
        y: seeded ? Math.random() : 1 + Math.random() * 0.2,
        z,
        size: p.minSize + (p.maxSize - p.minSize) * Math.random(),
        rise: 0.02 + Math.random() * 0.03,
        phase: Math.random() * Math.PI * 2,
        swayAmp: 0.4 + Math.random() * 0.6,
        offsetX: 0,
        offsetY: 0,
      };
    };

    const motes: Mote[] = Array.from({ length: live.current.count }, () =>
      spawn(true)
    );

    let pointerX = -1;
    let pointerY = -1;
    const onPointerMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointerX = (e.clientX - rect.left) / Math.max(1, rect.width);
      pointerY = (e.clientY - rect.top) / Math.max(1, rect.height);
    };
    const onPointerLeave = () => {
      pointerX = -1;
      pointerY = -1;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(resize);
      ro.observe(host);
    }

    let raf = 0;
    let last = performance.now();

    const frame = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      const p = live.current;

      ctx.clearRect(0, 0, width, height);

      if (p.paused) {
        raf = requestAnimationFrame(frame);
        return;
      }

      syncSprites();

      // Count is adjustable at runtime; grow or trim in place.
      if (motes.length < p.count) {
        while (motes.length < p.count) motes.push(spawn(true));
      } else if (motes.length > p.count) {
        motes.length = p.count;
      }

      ctx.globalCompositeOperation = p.blend;

      for (const mote of motes) {
        const near = 1 - p.depth + p.depth * mote.z;
        mote.y -= mote.rise * p.speed * near * dt;
        mote.phase += p.swayRate * dt;

        if (mote.y < -0.15) {
          Object.assign(mote, spawn(false));
          continue;
        }

        let x = mote.x + Math.sin(mote.phase) * p.sway * mote.swayAmp;
        let y = mote.y;

        if (p.cursorInteraction && pointerX >= 0) {
          const dx = x - pointerX;
          const dy = y - pointerY;
          const dist = Math.hypot(dx, dy);
          if (dist < p.cursorRadius && dist > 0.0001) {
            const force = (1 - dist / p.cursorRadius) ** 2 * p.cursorPush;
            mote.offsetX += (dx / dist) * force * dt * 6;
            mote.offsetY += (dy / dist) * force * dt * 6;
          }
        }

        // Displacement always relaxes back, so the field never drifts apart.
        mote.offsetX *= 1 - Math.min(1, dt * 2);
        mote.offsetY *= 1 - Math.min(1, dt * 2);
        x += mote.offsetX;
        y += mote.offsetY;

        // Fade in off the bottom edge and out at the top.
        const edge = Math.min(
          1,
          Math.min(y / p.fade, (1 - y + 0.15) / p.fade)
        );
        if (edge <= 0) continue;

        const alpha = edge * p.opacity * (0.35 + 0.65 * mote.z);
        const diameter = mote.size * height * (0.6 + 0.8 * mote.z);
        const sprite = mote.z > 0.5 ? nearSprite : farSprite;
        if (!sprite) continue;

        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.drawImage(
          sprite,
          x * width - diameter / 2,
          y * height - diameter / 2,
          diameter,
          diameter
        );
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        onPointerLeave
      );
      ro?.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 size-full", className)}
    />
  );
}
