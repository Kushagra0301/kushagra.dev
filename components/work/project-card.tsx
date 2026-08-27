import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { KindBadge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function destination(project: Project) {
  return project.caseStudy
    ? { href: `/work/${project.slug}`, external: false }
    : { href: project.liveUrl, external: true };
}

export function ProjectCard({
  project,
  size = "default",
  index,
  priority = false,
}: {
  project: Project;
  size?: "default" | "large";
  index?: number;
  priority?: boolean;
}) {
  const { href, external } = destination(project);
  const large = size === "large";

  const media = (
    <div
      className={cn(
        "relative overflow-hidden rounded-media border border-border bg-surface-2 transition-colors duration-150 group-hover:border-accent/40",
        large ? "aspect-[16/11]" : "aspect-[4/3]"
      )}
    >
      <Image
        src={project.thumb}
        alt={`${project.title} — ${project.category}`}
        fill
        priority={priority}
        sizes={large ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
        className="object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="absolute right-4 top-4 grid size-10 translate-y-1.5 scale-90 place-items-center rounded-full bg-accent text-accent-fg opacity-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
        <ArrowUpRight aria-hidden className="size-5" />
      </span>
    </div>
  );

  const body = (
    <div className="mt-5">
      <div className="flex flex-wrap items-center gap-3">
        {index !== undefined && (
          <span className="font-mono text-xs text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <KindBadge kind={project.kind} />
        <span className="font-mono text-xs text-muted">{project.year}</span>
      </div>

      <h3
        className={cn(
          "mt-3 font-semibold tracking-tight transition-colors duration-150 group-hover:text-accent-ink",
          large ? "text-display-3" : "text-title"
        )}
      >
        {project.title}
      </h3>

      <p className="mt-1 text-sm text-muted">{project.category}</p>

      <p
        className={cn(
          "mt-3 leading-relaxed text-muted",
          large ? "max-w-xl text-base" : "text-sm"
        )}
      >
        {project.summary}
      </p>

      <p className="mt-4 flex items-center gap-2 text-sm font-medium text-accent-ink">
        {project.caseStudy ? "Read the case study" : "View live site"}
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </p>
    </div>
  );

  const className = "group block";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={className}>
        {media}
        {body}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {media}
      {body}
    </Link>
  );
}
