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
  /** Factual, verifiable figures only. Never invented metrics. */
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
      "A free diet and workout planner that turns six questions into a personalised PDF you can download. No account, no paywall.",
    liveUrl: "https://swasthx.in/",
    thumb: "/shots/swasthx.webp",
    tags: ["Next.js", "TypeScript", "Tailwind", "PDF generation"],
    featured: true,
    caseStudy: {
      role: "Solo: product, design and build",
      timeline: "2026",
      stack: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Client-side PDF export",
        "localStorage",
      ],
      problem:
        "Every free fitness calculator wants your email before it shows you a number. Then it hands back one calorie figure with no meals, no training split, and nothing you could take into a kitchen or a gym. The maths was never the hard part. The problem is that it arrives in a form nobody can act on. SwasthX closes that gap: three minutes from landing to a plan you can use, and it asks for nothing in return.",
      approach: [
        {
          title: "Six questions, and not a seventh",
          body: "The intake asks only for what genuinely changes the output: body metrics, goal, activity level, dietary preference, and training days. Anything that would have improved the estimate by a rounding error got cut, because every extra field costs you completions.",
        },
        {
          title: "A calorie range, not a false-precision number",
          body: "Predictive equations carry real error bars. Handing someone a figure like 2,147 kcal implies a precision the formula simply doesn't have. SwasthX gives a range instead, and explains why. It's the more honest answer, and it's also the more useful one, because it leaves room to adjust without feeling like you've failed.",
        },
        {
          title: "Plans you can actually cook and lift",
          body: "The diet plan comes out as named meals with full ingredient lists, across four to six eating occasions, vegetarian or not. The workout plan comes out as one to seven training days with sets, reps or durations for each exercise, plus a warm-up and cooldown. You can print either one and follow it without having to interpret anything.",
        },
        {
          title: "No account, computed in the browser",
          body: "Everything runs in the browser and saves to local storage. There's no signup wall, no server holding anyone's health data, and no database to breach. Diet and workout plans export on their own or merge into one PDF.",
        },
        {
          title: "An explicit limit on what this is",
          body: "The site says plainly that it's a calculator with a good memory for recipes, that it isn't medical advice, and that you should talk to a professional. Saying where the tool stops earns more trust than papering over it.",
        },
      ],
      challenge: {
        title: "Making generated plans read like they were written by a person",
        body: "Assembling meals straight from a macro target gives you combinations nobody would actually eat. The generator needed meal archetypes and realistic portion sizes to constrain it, so results stay varied between runs while any single plan still reads as a sensible day of food. That same logic then had to survive being rendered into a print-ready PDF.",
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
      "A 25-year chartered accountancy firm with eight service lines and three offices, rebuilt into a site a stressed business owner can get through in one pass.",
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
        "Lalit S. Samar & Co. had twenty-five years of practice, three offices across Udaipur, Bhilwara and Navi Mumbai, more than fifty staff and over ten thousand clients. Almost none of that was legible online. Professional services firms all face the same web problem: the catalogue is enormous and every item sounds like every other item. Someone arriving mid-panic about a GST notice has to find their one answer among eight dense service lines, and be convinced this firm is safe to hand their books to.",
      approach: [
        {
          title: "Structure the catalogue around the client's problem, not the org chart",
          body: "Audit & Assurance, Direct Taxation, GST & Indirect Tax, Company Law & ROC, Virtual CFO, Startup & Registration, Accounting & Bookkeeping, and Business Advisory each got their own entry point. Each is written in the language a client would actually use, along the lines of \"I got a notice\" or \"I'm registering a company\", rather than the language of the profession.",
        },
        {
          title: "Put the credibility where the doubt is",
          body: "Twenty-five years, 10,000+ clients, 50+ team members, 50+ industries served, and three named partners with their specialisms stated. All of it appears early and again near every conversion point. The hesitation in this category is trust, and trust signals only work if they sit right next to the ask rather than on a separate About page.",
        },
        {
          title: "Two ways to reach a human, both one tap away",
          body: "A structured enquiry form for people who want to write it all down, and WhatsApp for people with one quick question. In the Indian SME market that second option isn't an afterthought. For plenty of clients it's the main way they get in touch.",
        },
        {
          title: "Make the multi-city practice obvious",
          body: "Three offices is a real advantage over single-city firms, so location earns a place in the main navigation instead of being buried in the footer.",
        },
      ],
      challenge: {
        title: "Eight service lines that all sound the same",
        body: "The failure mode for a CA firm site is a wall of near-identical cards, where every option looks plausible and none of them looks like yours. Fixing it meant writing each service around the event that sends someone looking for it in the first place, then letting the highest-intent services dominate visually instead of giving all eight equal weight.",
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
      "A multi-specialty clinic site built around a single promise: an appointment booked in sixty seconds.",
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
      "Low-edition heirloom furniture from Udaipur, in hand-carved teak, hammered brass and sandstone.",
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
