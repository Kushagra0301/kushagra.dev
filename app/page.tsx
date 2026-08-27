import { Hero } from "@/components/sections/hero";
import { FeaturedWork } from "@/components/sections/featured-work";
import { ServicesPreview } from "@/components/sections/services-preview";
import { ProcessSection } from "@/components/sections/process-section";
import { Testimonials } from "@/components/sections/testimonials";
import { CTASection } from "@/components/sections/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <ServicesPreview />
      <ProcessSection />
      <Testimonials />
      <CTASection />
    </>
  );
}
