export const bio = [
  "I build websites for businesses that need one to actually do something — book appointments, generate leads, sell a product, or make a twenty-five-year-old firm look as credible online as it is in person.",
  "Most of my work is end to end: I do the design and the development, which means there is no handoff to lose things in, and no arguing about whether something is buildable. I write the code, so I design things I can build well.",
  "Two projects on this site are real. SwasthX is my own product — a free diet and workout planner used without an account. Lalit S. Samar & Co. is client work for a chartered accountancy firm with three offices and over ten thousand clients. The rest are concept builds, and they are labelled that way everywhere they appear.",
];

export const principles = [
  {
    title: "Fast on a cheap phone, or it is not fast",
    body: "Performance budgets are set against a mid-range Android on a normal mobile connection, not a laptop on office wifi. That is what most of your visitors are actually holding.",
  },
  {
    title: "Accessible by construction",
    body: "Semantic HTML, real focus states, keyboard paths that work, contrast that passes, and motion that backs off when the OS asks. Retrofitting this is expensive; building it in costs nothing.",
  },
  {
    title: "Copy and layout argue the same case",
    body: "A section that looks good but says nothing is decoration. I design around what the page has to convince someone of, then make it look like it means it.",
  },
  {
    title: "You own everything",
    body: "The repository, the deployment, the domain. Nothing is hostage to me staying involved, and I will walk you or your next developer through all of it.",
  },
];

export const toolkit = [
  {
    group: "Build",
    items: ["Next.js", "React", "TypeScript", "Node.js", "REST APIs"],
  },
  {
    group: "Style",
    items: ["Tailwind CSS", "Design tokens", "CSS architecture", "Responsive systems"],
  },
  {
    group: "Motion",
    items: ["Framer Motion", "GSAP", "Scroll choreography", "Micro-interaction"],
  },
  {
    group: "Design",
    items: ["Figma", "Type & colour systems", "Information architecture", "Brand application"],
  },
  {
    group: "Ship",
    items: ["Vercel", "Git & GitHub", "Core Web Vitals", "Technical SEO", "Analytics"],
  },
];

/**
 * TODO: add real entries — role/company/dates — and the timeline section
 * starts rendering. Left empty rather than filled with invented history.
 */
export type TimelineEntry = {
  period: string;
  title: string;
  org: string;
  body: string;
};

export const timeline: TimelineEntry[] = [];
