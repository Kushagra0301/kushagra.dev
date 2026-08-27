import { ArrowRight } from "lucide-react";
import { featuredProjects, conceptProjects } from "@/content/projects";
import { ProjectCard } from "@/components/work/project-card";
import { Section } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export function FeaturedWork() {
  const concepts = conceptProjects.slice(0, 3);

  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title={
        <>
          Real projects,{" "}
          <span className="font-serif font-normal italic text-accent-ink">
            real
          </span>{" "}
          constraints.
        </>
      }
      lead="Two of these were built for people with money and deadlines on the line. The rest are concept builds — self-initiated, shipped live, and labelled as such."
    >
      <RevealGroup className="grid gap-10 md:grid-cols-2 md:gap-8">
        {featuredProjects.map((project, i) => (
          <RevealItem key={project.slug}>
            <ProjectCard project={project} size="large" priority={i === 0} />
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-20">
        <Reveal className="mb-8 flex items-end justify-between gap-6">
          <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Concept builds
          </h3>
          <Button href="/work" variant="ghost" size="sm" className="shrink-0">
            All {featuredProjects.length + conceptProjects.length} projects
            <ArrowRight aria-hidden className="size-4" />
          </Button>
        </Reveal>

        <RevealGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {concepts.map((project) => (
            <RevealItem key={project.slug}>
              <ProjectCard project={project} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
