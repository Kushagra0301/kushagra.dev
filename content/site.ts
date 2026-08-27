/**
 * Single source of truth for identity, contact and social links.
 * Anything marked TODO is a placeholder — swap in the real value and the
 * UI picks it up everywhere. Empty strings are filtered out at render time,
 * so an unset link never produces a dead anchor.
 */

/** Last-resort origin if no environment provides a usable one. */
const FALLBACK_URL = "https://kushagra-dev.vercel.app";

/**
 * Resolves the public origin used for canonical links, the sitemap and OG
 * metadata.
 *
 * Deliberately paranoid, because `new URL()` throws and this value is read at
 * module scope in app/layout.tsx — a bad value does not degrade the site, it
 * fails the entire build. `??` was not enough: an env var declared with a
 * blank value in a hosting dashboard is an empty string, not undefined, so the
 * fallback never fired and `new URL("")` took the build down.
 *
 * Each candidate is trimmed, given a protocol if it lacks one, and validated;
 * anything unusable is skipped rather than trusted. `.origin` also normalises
 * away a trailing slash, so `${site.url}${path}` can never double up.
 *
 * The env reads are written out in full because Next inlines NEXT_PUBLIC_*
 * only when it can see the property access statically.
 */
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
  // TODO: point NEXT_PUBLIC_SITE_URL at the custom domain once it is live.
  url: resolveSiteUrl(),

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
