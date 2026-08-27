"use client";

import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { tiers, regions, type Region } from "@/content/services";
import {
  getRegionSnapshot,
  getServerRegionSnapshot,
  setRegion,
  subscribeRegion,
} from "@/lib/region";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const order: Region[] = ["IN", "INTL"];

export function PricingTiers() {
  const region = useSyncExternalStore(
    subscribeRegion,
    getRegionSnapshot,
    getServerRegionSnapshot
  );

  return (
    <>
      <Reveal className="mb-10">
        <div
          role="group"
          aria-label="Choose pricing region"
          className="inline-flex rounded-full border border-border bg-surface p-1"
        >
          {order.map((id) => {
            const isActive = region === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setRegion(id)}
                className={cn(
                  "relative inline-flex min-h-11 items-center rounded-full px-5 text-sm transition-colors duration-150",
                  isActive ? "text-accent-fg" : "text-muted hover:text-fg"
                )}
              >
                {/* No -z-10: the opaque track would paint over the pill. */}
                {isActive && (
                  <motion.span
                    layoutId="region-pill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                <span className="relative flex items-center gap-1.5">
                  <span aria-hidden className="font-mono">
                    {regions[id].symbol}
                  </span>
                  {regions[id].label}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <RevealGroup className="grid gap-6 lg:grid-cols-3">
        {tiers.map((tier) => (
          <RevealItem key={tier.name}>
            <div
              className={cn(
                "flex h-full flex-col rounded-card border p-8",
                tier.featured
                  ? "border-accent bg-surface shadow-[0_0_0_1px_var(--accent)]"
                  : "border-border bg-surface"
              )}
            >
              {tier.featured && (
                <span className="mb-4 inline-flex w-fit rounded-full bg-accent px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-accent-fg">
                  Most requested
                </span>
              )}
              <h3 className="text-2xl font-semibold tracking-tight">
                {tier.name}
              </h3>
              <p className="mt-2 text-sm text-muted">{tier.summary}</p>
              <p className="mt-6 font-display text-4xl font-bold tracking-tight">
                {tier.price[region]}
              </p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-muted">
                {tier.cadence}
              </p>
              <ul className="mt-6 flex-1 space-y-2.5 border-t border-border pt-6">
                {tier.includes.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm">
                    <Check
                      aria-hidden
                      className="mt-0.5 size-4 shrink-0 text-accent-ink"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                href="/contact"
                variant={tier.featured ? "primary" : "secondary"}
                className="mt-8 w-full"
              >
                Get a quote
              </Button>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-8">
        <p className="max-w-2xl text-sm text-muted">{regions[region].note}</p>
      </Reveal>

      <p aria-live="polite" className="sr-only">
        Showing {regions[region].label} pricing.
      </p>
    </>
  );
}
