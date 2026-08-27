export type Service = {
  id: string;
  title: string;
  blurb: string;
  deliverables: string[];
};

export const services: Service[] = [
  {
    id: "web-design",
    title: "Web Design",
    blurb:
      "Interfaces built around a single decision you want the visitor to make — not a moodboard with buttons bolted on.",
    deliverables: [
      "Information architecture & wireframes",
      "High-fidelity design across breakpoints",
      "Type scale, colour system, component library",
    ],
  },
  {
    id: "development",
    title: "Development",
    blurb:
      "React and Next.js builds that stay fast on a mid-range Android on Indian 4G, not just on a MacBook.",
    deliverables: [
      "Next.js / React / TypeScript",
      "Tailwind CSS, design-token driven",
      "CMS wiring, forms, integrations",
    ],
  },
  {
    id: "motion",
    title: "Motion & Interaction",
    blurb:
      "Scroll-driven storytelling and micro-interaction that carries meaning — and gets out of the way when a user asks it to.",
    deliverables: [
      "Scroll and entrance choreography",
      "Hover, cursor and state detail",
      "Reduced-motion fallbacks throughout",
    ],
  },
  {
    id: "landing",
    title: "Landing Pages",
    blurb:
      "One page, one job. Written, designed and shipped as a unit so the copy and layout argue the same case.",
    deliverables: [
      "Conversion-focused copy structure",
      "Analytics & event tracking",
      "A/B-ready section variants",
    ],
  },
  {
    id: "performance",
    title: "Performance & SEO",
    blurb:
      "Core Web Vitals, metadata, structured data and accessibility handled as build requirements, not a cleanup pass.",
    deliverables: [
      "Lighthouse 95+ across the board",
      "Semantic HTML & WCAG AA contrast",
      "Sitemap, OG images, JSON-LD",
    ],
  },
  {
    id: "maintenance",
    title: "Maintenance & Support",
    blurb:
      "Someone who already knows the codebase, on hand after launch — so a broken form on a Friday is a message, not a crisis.",
    deliverables: [
      "Monthly retainer or hourly",
      "Dependency & security updates",
      "Content and copy changes",
      "Uptime & Core Web Vitals monitoring",
    ],
  },
];

/**
 * Pricing is split by market rather than converted between currencies.
 * ₹15,000 and $450 are not the same number in two currencies — they are two
 * different market positions, and quoting an Indian SMB in converted USD
 * loses the lead before the first reply.
 */
export type Region = "IN" | "INTL";

export const regions: Record<
  Region,
  { label: string; symbol: string; note: string }
> = {
  IN: {
    label: "India",
    symbol: "₹",
    note: "Prices are in INR and exclude GST and third-party costs such as domains, hosting or stock imagery. Payment by UPI or bank transfer.",
  },
  INTL: {
    label: "International",
    symbol: "$",
    note: "Prices are in USD and exclude third-party costs such as domains, hosting or stock imagery. Happy to work through Upwork escrow or directly — your call.",
  },
};

export type Tier = {
  name: string;
  /** Only the number moves between regions; scope and timeline do not. */
  price: Record<Region, string>;
  cadence: string;
  summary: string;
  includes: string[];
  featured?: boolean;
};

/**
 * TODO: placeholder ranges — overwrite both columns with your actual rates.
 */
export const tiers: Tier[] = [
  {
    name: "Landing Page",
    price: { IN: "₹15,000+", INTL: "$450+" },
    cadence: "1–2 weeks",
    summary: "A single high-conversion page, designed and built end to end.",
    includes: [
      "Up to 8 sections",
      "Custom design, no templates",
      "Responsive + accessible",
      "Contact form & analytics",
      "2 revision rounds",
    ],
  },
  {
    name: "Full Website",
    price: { IN: "₹45,000+", INTL: "$1,200+" },
    cadence: "3–5 weeks",
    summary: "A multi-page marketing site with a real design system behind it.",
    includes: [
      "5–10 pages",
      "Design system & component library",
      "Motion and interaction pass",
      "CMS integration if needed",
      "SEO, performance & a11y pass",
      "3 revision rounds",
    ],
    featured: true,
  },
  {
    name: "Product / App",
    price: { IN: "Let's talk", INTL: "Let's talk" },
    cadence: "Ongoing",
    summary: "Web apps, dashboards and long-running product work, billed hourly or per sprint.",
    includes: [
      "Full-stack Next.js",
      "Auth, database, API integration",
      "Iterative sprints",
      "Ongoing maintenance option",
    ],
  },
];

export const process = [
  {
    step: "01",
    title: "Scope",
    body: "A call, then a written brief: what the site has to achieve, for whom, by when, and what counts as done. Fixed price, no surprises.",
  },
  {
    step: "02",
    title: "Design",
    body: "Structure first, then surface. You see real layouts with real copy — not a lorem-ipsum mockup that falls apart on contact with content.",
  },
  {
    step: "03",
    title: "Build",
    body: "Shipped to a live preview URL from day one. You watch it come together and comment on the real thing, on your own phone.",
  },
  {
    step: "04",
    title: "Launch",
    body: "Performance, accessibility and SEO pass, then deploy. You get the repo, a handover walkthrough, and two weeks of post-launch fixes.",
  },
] as const;

export const faqs = [
  {
    q: "How do we work together?",
    a: "Through Upwork if you prefer the escrow and protections, or directly by email — whichever you're more comfortable with. Either way you get a written scope before anything starts.",
  },
  {
    q: "What do you need from me to start?",
    a: "Your content or a rough draft of it, any brand assets you already have, and access to your domain and hosting. If you have none of that, I'll tell you exactly what to gather.",
  },
  {
    q: "Do you work with my timezone?",
    a: "I'm in IST (UTC+5:30) and keep a few hours of daily overlap with both US and European mornings. Async updates are the default; calls are scheduled around you.",
  },
  {
    q: "Who owns the code?",
    a: "You do, in full, on final payment. You get the repository and the deployment — nothing is locked to me.",
  },
  {
    q: "What if I need changes after launch?",
    a: "Two weeks of bug fixes are included at no cost. Beyond that, ongoing work is hourly or on a small monthly retainer.",
  },
] as const;
