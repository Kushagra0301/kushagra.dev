/**
 * Single source of truth for identity, contact and social links.
 * Anything marked TODO is a placeholder — swap in the real value and the
 * UI picks it up everywhere. Empty strings are filtered out at render time,
 * so an unset link never produces a dead anchor.
 */

export const site = {
  name: "Kushagra Sharma",
  firstName: "Kushagra",
  role: "Web Developer & Designer",
  tagline: "I design and build websites that earn attention and convert it.",
  // TODO: replace once the custom domain is live.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kushagrasharma.vercel.app",

  email: "kushagrasharmaudr@gmail.com",
  phone: "+91 8005565064",
  phoneHref: "tel:+918005565064",
  // TODO: confirm — inferred from client base and past work.
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

/**
 * Real client quotes only. The Testimonials section renders nothing while
 * this array is empty — no invented social proof.
 */
export type Testimonial = {
  quote: string;
  author: string;
  title: string;
  company: string;
};

export const testimonials: Testimonial[] = [];
