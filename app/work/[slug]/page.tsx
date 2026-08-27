import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { caseStudies, getProject } from "@/content/projects";
import { KindBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { CTASection } from "@/components/sections/cta-section";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};

  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/work/${project.slug}`,
  });
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);

  // Concept builds have no written case study — there is no page for them.
  if (!project?.caseStudy) notFound();

  const cs = project.caseStudy;
  const index = caseStudies.findIndex((p) => p.slug === project.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <>
      <article>
        <header className="relative overflow-hidden border-b border-border">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_20%_0%,black,transparent_65%)]" />
          </div>

          <div className="wrap relative py-16 md:py-24">
            <Reveal>
              <Link
                href="/work"
                className="-my-2 mb-6 inline-flex h-11 items-center gap-2 text-sm text-muted transition-colors duration-150 hover:text-accent-ink"
              >
                <ArrowLeft aria-hidden className="size-4" />
                All work
              </Link>

              <div className="mb-6 flex flex-wrap items-center gap-3">
                <KindBadge kind={project.kind} />
                <span className="font-mono text-xs text-muted">
                  {project.category}
                </span>
              </div>

              <h1 className="max-w-[14ch] text-display-1">
                {project.title}
              </h1>

              <p className="mt-6 max-w-[var(--measure)] text-lead text-muted">
                {project.summary}
              </p>

              <div className="mt-10">
                <Button href={project.liveUrl} size="lg">
                  Visit the live site
                  <ArrowUpRight aria-hidden className="size-4" />
                </Button>
              </div>
            </Reveal>
          </div>
        </header>

        <div className="wrap py-16 md:py-20">
          <Reveal>
            <div className="relative aspect-[16/10] overflow-hidden rounded-media border border-border bg-surface-2">
              <Image
                src={project.thumb}
                alt={`${project.title} homepage`}
                fill
                priority
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="object-cover object-top"
              />
            </div>
          </Reveal>

          <Reveal>
            <dl className="mt-12 grid gap-8 border-y border-border py-8 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <dt className="eyebrow mb-2">Role</dt>
                <dd>{cs.role}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-2">Timeline</dt>
                <dd>{cs.timeline}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-2">Type</dt>
                <dd>{project.category}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-2">Stack</dt>
                <dd className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
                  {cs.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>

          <section className="mt-20 grid gap-10 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-16">
            <Reveal>
              <h2 className="text-display-3 md:sticky md:top-28">
                The problem
              </h2>
            </Reveal>
            <Reveal>
              <p className="max-w-[var(--measure)] text-lead text-muted">
                {cs.problem}
              </p>
            </Reveal>
          </section>

          <section className="mt-24 grid gap-10 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-16">
            <Reveal>
              <h2 className="text-3xl leading-tight md:sticky md:top-28">
                The approach
              </h2>
            </Reveal>
            <RevealGroup className="space-y-10">
              {cs.approach.map((step, i) => (
                <RevealItem key={step.title}>
                  <div className="border-l-2 border-border pl-6 transition-colors hover:border-accent">
                    <span className="font-mono text-xs text-accent-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight md:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-muted">
                      {step.body}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </section>

          <section className="mt-24 grid gap-10 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-16">
            <Reveal>
              <h2 className="text-3xl leading-tight md:sticky md:top-28">
                The hard part
              </h2>
            </Reveal>
            <Reveal>
              <div className="rounded-card border border-border bg-surface p-8 md:p-10">
                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                  {cs.challenge.title}
                </h3>
                <p className="mt-4 leading-relaxed text-muted">
                  {cs.challenge.body}
                </p>
              </div>
            </Reveal>
          </section>

          <section className="mt-24">
            <Reveal className="mb-10">
              <h2 className="text-display-3">Where it landed</h2>
            </Reveal>
            <RevealGroup className="grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {cs.results.map((r) => (
                <RevealItem key={r.label} className="bg-bg">
                  <div className="h-full p-8">
                    <p className="font-display text-4xl font-bold tracking-tight text-accent-ink">
                      {r.value}
                    </p>
                    <p className="mt-2 text-sm leading-snug text-muted">
                      {r.label}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </section>

          {next.slug !== project.slug && (
            <Reveal className="mt-24 border-t border-border pt-10">
              <p className="eyebrow mb-3">Next case study</p>
              <Link
                href={`/work/${next.slug}`}
                className="group inline-flex min-h-11 items-center gap-4"
              >
                <span className="text-3xl font-semibold tracking-tight transition-colors group-hover:text-accent-ink md:text-5xl">
                  {next.title}
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="size-7 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent-ink"
                />
              </Link>
            </Reveal>
          )}
        </div>
      </article>

      <CTASection />
    </>
  );
}
