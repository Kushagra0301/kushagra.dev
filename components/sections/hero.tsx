"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { Button } from "@/components/ui/button";
import { ParticleField } from "@/components/ui/particle-field";
import { stagger, riseIn, fadeUp } from "@/lib/motion";

/** A word that clips-and-rises into place, one line at a time. */
function Line({ children }: { children: React.ReactNode }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span variants={riseIn} className="block">
        {children}
      </motion.span>
    </span>
  );
}

const facts = [
  { value: `${projects.length}`, label: "Sites designed & shipped" },
  { value: "100%", label: "Code ownership, handed to you" },
  { value: "IST", label: "Overlapping US & EU mornings" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Layered background: a faint grid, plus one warm bloom behind the
          headline. Both decorative, both inert to assistive tech. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_70%)]" />
        <div className="absolute -top-40 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-accent/12 blur-[120px]" />
        <ParticleField />
      </div>

      <div className="wrap relative py-20 md:py-28 lg:py-36">
        <motion.div initial="hidden" animate="show" variants={stagger(0.1)}>
          {site.available && (
            <motion.div variants={fadeUp} className="mb-8">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                {site.availabilityNote}
              </span>
            </motion.div>
          )}

          {/* motion.h1, not <h1> — variants only propagate through motion
              components, so a plain heading would leave the <Line> spans
              stuck in their hidden state forever. */}
          <motion.h1
            variants={stagger(0.09)}
            className="max-w-[15ch] text-display-1 font-bold"
          >
            <Line>Websites that</Line>
            <Line>
              <span className="font-serif font-normal italic text-accent-ink">
                earn
              </span>{" "}
              attention
            </Line>
            <Line>and convert it.</Line>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-[52ch] text-lead text-muted"
          >
            I&apos;m {site.firstName} — a freelance web developer and designer
            based in {site.location}. I take businesses from a blank page to a
            fast, accessible, conversion-focused site: design, build, launch.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button href="/contact" size="lg">
              Start a project
            </Button>
            <Button href="/work" size="lg" variant="secondary">
              See the work
            </Button>
          </motion.div>

          <motion.dl
            variants={fadeUp}
            className="mt-16 grid max-w-2xl grid-cols-1 gap-6 border-t border-border pt-8 sm:grid-cols-3"
          >
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-display text-3xl font-bold tracking-tight">
                  {fact.value}
                </dt>
                {/* Balanced so a three-word label cannot drop a single
                    orphaned word onto its own line. */}
                <dd className="mt-1 text-balance text-sm leading-snug text-muted">
                  {fact.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16 hidden items-center gap-3 text-muted md:flex"
        >
          <ArrowDown aria-hidden className="size-4 animate-bounce" />
          <span className="eyebrow">Scroll</span>
        </motion.div>
      </div>
    </section>
  );
}
