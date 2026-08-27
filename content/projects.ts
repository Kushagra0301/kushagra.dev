export type ProjectKind = "client" | "product" | "concept";

export type CaseStudy = {
  role: string;
  timeline: string;
  stack: string[];
  /** The situation before the work existed. */
  problem: string;
  /** Ordered decisions, each a heading + the reasoning behind it. */
  approach: { title: string; body: string }[];
  /** What was genuinely hard, and how it was resolved. */
  challenge: { title: string; body: string };
  /** Factual, verifiable figures only — never invented metrics. */
  results: { label: string; value: string }[];
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  /** Drives honest labelling: concepts are never dressed up as client work. */
  kind: ProjectKind;
  year: number;
  summary: string;
  liveUrl: string;
  thumb: string;
  tags: string[];
  featured?: boolean;
  caseStudy?: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: "swasthx",
    title: "SwasthX",
    category: "Health / Product",
    kind: "product",
    year: 2026,
    summary:
      "A free diet and workout planner that turns six questions into a personalised, downloadable PDF plan — no account, no paywall.",
    liveUrl: "https://swasthx.in/",
    thumb: "/shots/swasthx.webp",
    tags: ["Next.js", "TypeScript", "Tailwind", "PDF generation"],
    featured: true,
    caseStudy: {
      role: "Solo — product, design and build",
      timeline: "2026",
      stack: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Client-side PDF export",
        "localStorage",
      ],
      problem:
        "Every free fitness calculator online asks for an email before it shows you a number, then hands back a single calorie figure with no meals, no split, and nothing you can take to a kitchen or a gym. The gap is not the maths — it is that the maths arrives in a form nobody can act on. SwasthX exists to close that gap: from landing to a usable plan in about three minutes, with nothing asked in return.",
      approach: [
        {
          title: "Six questions, and not a seventh",
          body: "The intake collects only what actually changes the output — body metrics, goal, activity level, dietary preference, and training days. Every field that would have improved the estimate by a rounding error was cut, because each one measurably costs completions.",
        },
        {
          title: "A calorie range, not a false-precision number",
          body: "Predictive equations carry real error bars. Returning a figure like 2,147 kcal implies an accuracy the underlying formula does not have. SwasthX returns a range and explains it, which is both more honest and more usable — it gives people room to adjust without feeling they have failed.",
        },
        {
          title: "Plans you can actually cook and lift",
          body: "The diet output resolves to named meals with full ingredient lists across four to six eating occasions, split vegetarian or non-vegetarian. The workout output resolves to one to seven training days with per-exercise sets, reps or durations, plus warm-up and cooldown. Both are things you can print and follow, not parameters to interpret.",
        },
        {
          title: "No account, computed in the browser",
          body: "Everything runs client-side and persists in browser storage. There is no signup wall, no backend holding health data, and no database to breach. Diet and workout plans export separately or merge into one combined PDF.",
        },
        {
          title: "An explicit limit on what this is",
          body: "The site states plainly that it is a calculator with a good memory for recipes, not medical advice, and recommends professional consultation. Naming the boundary builds more trust than papering over it.",
        },
      ],
      challenge: {
        title: "Making generated plans read like they were written by a person",
        body: "Naively assembling meals from a macro target produces combinations no one would eat. The generator had to be constrained by meal archetypes and realistic portioning so that output stays varied across runs while every individual plan still reads as a coherent day of food — and the same constraint logic had to survive being rendered into a print-ready PDF.",
      },
      results: [
        { label: "Questions to a full plan", value: "6" },
        { label: "Time to PDF", value: "~3 min" },
        { label: "Accounts required", value: "0" },
        { label: "Health data on a server", value: "None" },
      ],
    },
  },
  {
    slug: "lalit-s-samar-co",
    title: "Lalit S. Samar & Co.",
    category: "Chartered Accountancy / Client",
    kind: "client",
    year: 2026,
    summary:
      "A 25-year chartered accountancy firm with eight service lines and three offices, restructured into a site a stressed business owner can navigate in one pass.",
    liveUrl: "https://lssandco.in/",
    thumb: "/shots/lalit-s-samar-co.webp",
    tags: ["Client work", "Information architecture", "Lead generation", "SEO"],
    featured: true,
    caseStudy: {
      role: "Design and development",
      timeline: "2026",
      stack: [
        "Responsive web build",
        "Structured service architecture",
        "Form + WhatsApp lead capture",
        "On-page SEO",
      ],
      problem:
        "Lalit S. Samar & Co. had twenty-five years of practice, three offices across Udaipur, Bhilwara and Navi Mumbai, more than fifty staff and over ten thousand clients — and almost none of that was legible online. Professional services firms face a specific web problem: the catalogue is enormous and every item sounds like every other item. A prospect arriving mid-panic about a GST notice needs to find their one answer among eight dense service lines, and be convinced this firm is safe to hand their books to.",
      approach: [
        {
          title: "Structure the catalogue around the client's problem, not the org chart",
          body: "Audit & Assurance, Direct Taxation, GST & Indirect Tax, Company Law & ROC, Virtual CFO, Startup & Registration, Accounting & Bookkeeping, and Business Advisory each got a distinct entry point written in the language a client would actually use — I got a notice, I am registering a company — rather than in the language of the profession.",
        },
        {
          title: "Put the credibility where the doubt is",
          body: "Twenty-five years, 10,000+ clients, 50+ team members, 50+ industries served, and three named partners with stated specialisms are surfaced early and repeated near every conversion point — because the hesitation in this category is trust, and trust signals have to sit next to the ask, not on a separate About page.",
        },
        {
          title: "Two ways to reach a human, both one tap away",
          body: "A structured enquiry form for people who want to write it all down, and WhatsApp for people who want to ask one quick question. In the Indian SME market the second is not an afterthought — for many prospects it is the primary channel.",
        },
        {
          title: "Make the multi-city practice obvious",
          body: "Three offices is a competitive advantage against local single-city firms, so location is treated as primary navigation content rather than a footer detail.",
        },
      ],
      challenge: {
        title: "Eight service lines that all sound the same",
        body: "The failure mode for a CA firm site is a wall of near-identical cards where every option reads as plausible and none reads as yours. Resolving it meant writing each service around the trigger event that sends someone looking for it, and using visual hierarchy to make the highest-intent services dominant rather than giving all eight equal weight.",
      },
      results: [
        { label: "Service lines structured", value: "8" },
        { label: "Office locations", value: "3" },
        { label: "Years of practice surfaced", value: "25+" },
        { label: "Lead capture channels", value: "2" },
      ],
    },
  },

  // ---- Concept builds: self-initiated, shipped live, no client behind them ----
  {
    slug: "mandirvan",
    title: "Mandirvan",
    category: "Spiritual / Brand",
    kind: "concept",
    year: 2025,
    summary:
      "A serene, motion-rich brand site for sacred temples, built around slow reveals and restrained typography.",
    liveUrl: "https://mandirvan-vercel.vercel.app",
    thumb: "/shots/mandirvan.webp",
    tags: ["React", "Scroll motion", "Brand"],
  },
  {
    slug: "ironforge",
    title: "Ironforge",
    category: "Fitness / Brand",
    kind: "concept",
    year: 2025,
    summary:
      "High-energy fitness branding with kinetic scroll motion and heavy display type.",
    liveUrl: "https://ironforge-khaki.vercel.app",
    thumb: "/shots/ironforge.webp",
    tags: ["React", "Kinetic type", "Brand"],
  },
  {
    slug: "evara",
    title: "Evara",
    category: "Fashion / E-commerce",
    kind: "concept",
    year: 2025,
    summary: "Editorial fashion layouts wrapped around a seamless shopping flow.",
    liveUrl: "https://evara-nine-dun.vercel.app",
    thumb: "/shots/evara.webp",
    tags: ["React", "E-commerce", "Editorial"],
  },
  {
    slug: "lumina",
    title: "Lumina",
    category: "SaaS / Landing",
    kind: "concept",
    year: 2025,
    summary:
      "A product landing page built on layered depth and glowing gradient light.",
    liveUrl: "https://lumina-puce-xi.vercel.app",
    thumb: "/shots/lumina.webp",
    tags: ["React", "Landing page", "SaaS"],
  },
  {
    slug: "threadco",
    title: "Threadco",
    category: "Apparel / Shop",
    kind: "concept",
    year: 2025,
    summary: "A minimalist apparel brand with tactile, product-forward presentation.",
    liveUrl: "https://threadco-wine.vercel.app",
    thumb: "/shots/threadco.webp",
    tags: ["React", "E-commerce", "Minimal"],
  },
  {
    slug: "aurra",
    title: "Aurra",
    category: "Beauty / Brand",
    kind: "concept",
    year: 2025,
    summary:
      "An elegant beauty brand site carried by soft motion and a luxurious palette.",
    liveUrl: "https://aurra-tau.vercel.app",
    thumb: "/shots/aurra.webp",
    tags: ["React", "Brand", "Motion"],
  },
  {
    slug: "crumble",
    title: "Crumble",
    category: "Food / Bakery",
    kind: "concept",
    year: 2025,
    summary:
      "A playful bakery experience driven by appetite-first colour and generous imagery.",
    liveUrl: "https://crumble-eta.vercel.app",
    thumb: "/shots/crumble.webp",
    tags: ["React", "Brand", "Playful"],
  },
  {
    slug: "medbook",
    title: "MedBook",
    category: "Healthcare / Booking",
    kind: "concept",
    year: 2025,
    summary:
      "A multi-specialty clinic site built around one promise: an appointment booked in sixty seconds.",
    liveUrl: "https://medbook-iota.vercel.app",
    thumb: "/shots/medbook.webp",
    tags: ["React", "Booking flow", "Healthcare"],
  },
  {
    slug: "lenslight",
    title: "Lens & Light",
    category: "Photography / Studio",
    kind: "concept",
    year: 2025,
    summary:
      "A photography studio portfolio for wedding, portrait, editorial and commercial work.",
    liveUrl: "https://lenslight-psi.vercel.app",
    thumb: "/shots/lenslight.webp",
    tags: ["React", "Gallery", "Studio"],
  },
  {
    slug: "brasa",
    title: "Brasa",
    category: "Restaurant / Hospitality",
    kind: "concept",
    year: 2025,
    summary:
      "A live-fire restaurant site with seasonal menus and heat-driven art direction.",
    liveUrl: "https://brasa-1-rose.vercel.app",
    thumb: "/shots/brasa.webp",
    tags: ["React", "Hospitality", "Art direction"],
  },
  {
    slug: "vxlt",
    title: "VXLT",
    category: "Streetwear / Drops",
    kind: "concept",
    year: 2025,
    summary:
      "A drop-culture streetwear storefront built for scarcity, countdowns and hype.",
    liveUrl: "https://vxlt-phi.vercel.app",
    thumb: "/shots/vxlt.webp",
    tags: ["React", "E-commerce", "Streetwear"],
  },
  {
    slug: "udaypore",
    title: "Udaypore",
    category: "Furniture / Craft",
    kind: "concept",
    year: 2025,
    summary:
      "Low-edition heirloom furniture from Udaipur — hand-carved teak, hammered brass, sandstone.",
    liveUrl: "https://udaypore-2nd.vercel.app",
    thumb: "/shots/udaypore.webp",
    tags: ["React", "Craft", "Editorial"],
  },
];

export const kindLabel: Record<ProjectKind, string> = {
  client: "Client work",
  product: "My product",
  concept: "Concept",
};

export const featuredProjects = projects.filter((p) => p.featured);
export const caseStudies = projects.filter((p) => p.caseStudy);
export const conceptProjects = projects.filter((p) => p.kind === "concept");

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
