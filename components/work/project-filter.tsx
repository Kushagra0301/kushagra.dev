"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project, ProjectKind } from "@/content/projects";
import { ProjectCard } from "./project-card";
import { cn } from "@/lib/utils";

type Filter = "all" | ProjectKind;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "client", label: "Client work" },
  { id: "product", label: "My products" },
  { id: "concept", label: "Concepts" },
];

export function ProjectFilter({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Filter>("all");

  const counts = useMemo(() => {
    return filters.reduce<Record<Filter, number>>(
      (acc, f) => {
        acc[f.id] =
          f.id === "all"
            ? projects.length
            : projects.filter((p) => p.kind === f.id).length;
        return acc;
      },
      { all: 0, client: 0, product: 0, concept: 0 }
    );
  }, [projects]);

  const visible =
    active === "all" ? projects : projects.filter((p) => p.kind === active);

  return (
    <>
      <div
        role="group"
        aria-label="Filter projects by type"
        className="mb-12 flex flex-wrap gap-2"
      >
        {filters
          .filter((f) => counts[f.id] > 0)
          .map((f) => {
            const isActive = active === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActive(f.id)}
                className={cn(
                  "relative inline-flex min-h-11 items-center rounded-full border px-4 text-sm transition-colors duration-150",
                  isActive
                    ? "border-accent text-accent-fg"
                    : "border-border text-muted hover:border-accent hover:text-accent-ink"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-accent"
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                {f.label}
                <span className="ml-2 font-mono text-xs opacity-60">
                  {counts[f.id]}
                </span>
              </button>
            );
          })}
      </div>

      <motion.div layout className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <p aria-live="polite" className="sr-only">
        Showing {visible.length} of {projects.length} projects.
      </p>
    </>
  );
}
