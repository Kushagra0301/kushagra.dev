
/** Last-resort origin if no environment provides a usable one. */
const FALLBACK_URL = "https://kushagra-dev.vercel.app";

function resolveSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    // Set automatically by Vercel when system env vars are exposed.
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    process.env.NEXT_PUBLIC_VERCEL_URL,
  ];

  for (const candidate of candidates) {
    const value = candidate?.trim();
    if (!value) continue;
    const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    try {
      return new URL(withProtocol).origin;
    } catch {
      // Not a usable URL — fall through to the next candidate.
    }
  }

  return FALLBACK_URL;
}

export const site = {
  name: "Kushagra Sharma",
  firstName: "Kushagra",
  role: "Web Developer & Designer",
  tagline: "I design and build websites that earn attention and convert it.",
  // custom domain
  url: resolveSiteUrl(),

  email: "kushagrasharmaudr@gmail.com",
  phone: "+91 8005565064",
  phoneHref: "tel:+918005565064",
  location: "Udaipur, India",
  timezone: "IST (UTC+5:30)",

  available: true,
  availabilityNote: "Taking on new projects for Q4",

  socials: {
    // TODO: paste your real profile URLs.
    upwork: "",
    github: "",
    linkedin: "",
    twitter: "",
  },

  // TODO: drop the file at public/resume.pdf, then flip this to true.
  hasResume: false,
  resumePath: "/resume.pdf",
} as const;

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export type Testimonial = {
  quote: string;
  author: string;
  title: string;
  company: string;
};

export const testimonials: Testimonial[] = [];
