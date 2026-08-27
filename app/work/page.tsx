import { projects } from "@/content/projects";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectFilter } from "@/components/work/project-filter";
import { CTASection } from "@/components/sections/cta-section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Work",
  description:
    "Client work, my own products and concept builds. Websites designed and developed end to end.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title={
          <>
            Everything I&apos;ve{" "}
            <span className="font-serif font-normal italic text-accent-ink">
              shipped
            </span>
            .
          </>
        }
        lead="Client work and my own products are marked as such. Concept builds are my own ideas: live sites, real code, but nobody commissioned them. I'd rather say so than let you assume otherwise."
      />

      <div className="wrap py-16 md:py-20">
        <ProjectFilter projects={projects} />
      </div>

      <CTASection />
    </>
  );
}
