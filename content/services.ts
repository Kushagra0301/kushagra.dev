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
      "Every page gets one job. I design around the decision you want a visitor to make, then build the layout to lead them to it.",
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
      "React and Next.js builds that stay quick on a mid-range Android over patchy 4G, which is what most of your visitors are using.",
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
      "Scroll and hover work that guides attention where you want it, and backs off the moment someone's device asks it to.",
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
      "One page with one goal. I write, design and ship it as a single piece, so the words and the layout say the same thing.",
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
      "Core Web Vitals, metadata, structured data and accessibility are part of the build from day one, so there's no scramble to fix them before launch.",
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
      "After launch you keep someone who already knows the codebase. If a form breaks on a Friday, you send one message and it gets handled.",
    deliverables: [
      "Monthly retainer or hourly",
      "Dependency & security updates",
      "Content and copy changes",
      "Uptime & Core Web Vitals monitoring",
    ],
  },
];

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
    note: "Prices are in USD and exclude third-party costs such as domains, hosting or stock imagery. Happy to work through Upwork escrow or directly, whichever you prefer.",
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
    body: "A call, then a written brief covering what the site has to achieve, for whom, by when, and what counts as done. Fixed price, no surprises later.",
  },
  {
    step: "02",
    title: "Design",
    body: "Structure first, then surface. You see real layouts with your real copy in them, so nothing falls apart the moment the placeholder text comes out.",
  },
  {
    step: "03",
    title: "Build",
    body: "Shipped to a live preview URL from day one. You watch it come together and comment on the real thing, on your own phone.",
  },
  {
    step: "04",
    title: "Launch",
    body: "A final pass over performance, accessibility and SEO, then we deploy. You get the repo, a handover walkthrough, and two weeks of fixes after launch.",
  },
] as const;

export const faqs = [
  {
    q: "How do we work together?",
    a: "Through Upwork if you'd rather have the escrow and protections, or directly by email. Whichever suits you. Either way you get a written scope before anything starts.",
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
    a: "You do, in full, on final payment. You get the repository and the deployment, and nothing is locked to me.",
  },
  {
    q: "What if I need changes after launch?",
    a: "Two weeks of bug fixes are included at no cost. Beyond that, ongoing work is hourly or on a small monthly retainer.",
  },
] as const;
