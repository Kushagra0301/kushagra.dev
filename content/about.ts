export const bio = [
  "I build websites for businesses that need one to actually do something: book appointments, generate leads, sell a product, or make a twenty-five-year-old firm look as credible online as it is in person.",
  "Most of my work is end to end. I do the design and the development, so there's no handoff for things to get lost in, and no argument about whether something is buildable. I write the code, so I only design things I can actually build.",
  "Two projects here are real. SwasthX is my own product, a free diet and workout planner that works without an account. Lalit S. Samar & Co. is client work for a chartered accountancy firm with three offices and more than ten thousand clients. The rest are concept builds, and they're labelled that way everywhere they appear.",
];

export const principles = [
  {
    title: "Fast on a cheap phone, or it isn't fast",
    body: "I set performance budgets against a mid-range Android on a normal mobile connection, not a laptop on office wifi. That's what most of your visitors are actually holding.",
  },
  {
    title: "Accessible by construction",
    body: "Semantic HTML, real focus states, keyboard paths that work, contrast that passes, and motion that backs off when the operating system asks. Retrofitting all this is expensive. Building it in as you go costs nothing.",
  },
  {
    title: "Copy and layout argue the same case",
    body: "A section that looks good but says nothing is just decoration. I work out what the page has to convince someone of first, then make it look like it means it.",
  },
  {
    title: "You own everything",
    body: "The repository, the deployment, the domain. None of it depends on me staying involved, and I'll walk you or your next developer through the lot.",
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

export type TimelineEntry = {
  period: string;
  title: string;
  org: string;
  body: string;
};

export const timeline: TimelineEntry[] = [];
