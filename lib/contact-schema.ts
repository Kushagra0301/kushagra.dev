import { z } from "zod";
import type { Region } from "@/content/services";

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
  website: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
