import { z } from "zod";
import type { Region } from "@/content/services";

/**
 * Budget bands, split by market for the same reason the pricing tiers are:
 * "Under $500" is a meaningless question to an Indian SMB, and a converted
 * rupee figure would just be an odd-looking dollar amount. Each ladder is
 * anchored to that region's own tier prices in content/services.ts.
 */
export const budgetsByRegion: Record<Region, readonly string[]> = {
  IN: [
    "Under ₹15,000",
    "₹15,000 – ₹45,000",
    "₹45,000 – ₹1,50,000",
    "₹1,50,000+",
    "Not sure yet",
  ],
  INTL: [
    "Under $500",
    "$500 – $1,500",
    "$1,500 – $5,000",
    "$5,000+",
    "Not sure yet",
  ],
};

/**
 * The server cannot know which ladder the browser rendered, so validation
 * accepts every value from both.
 */
export const budgets = [
  ...new Set([...budgetsByRegion.IN, ...budgetsByRegion.INTL]),
] as [string, ...string[]];

export const projectTypes = [
  "Landing page",
  "Full website",
  "Web app / product",
  "Redesign of an existing site",
  "Something else",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("That does not look like a valid email."),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  projectType: z.enum(projectTypes),
  budget: z.enum(budgets),
  message: z
    .string()
    .trim()
    .min(20, "A couple of sentences helps me give you a useful answer.")
    .max(4000),
  /**
   * Honeypot. Hidden from humans, irresistible to naive bots.
   *
   * Deliberately permissive: rejecting a filled value here would return a
   * validation error naming this field and its rule, which tells a bot
   * exactly what to leave alone next time. Instead any value parses, and the
   * route quietly returns success without sending anything.
   */
  website: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
