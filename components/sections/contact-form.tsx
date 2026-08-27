"use client";

import { useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";
import {
  budgetsByRegion,
  projectTypes,
  contactSchema,
  type ContactInput,
} from "@/lib/contact-schema";
import {
  getRegionSnapshot,
  getServerRegionSnapshot,
  subscribeRegion,
} from "@/lib/region";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<keyof ContactInput, string[]>>;

/**
 * Web3Forms is submitted from the browser, which is the integration it
 * documents and supports. Proxying it through the route handler was tried and
 * returned a Cloudflare 403 in production.
 *
 * The key is therefore public. That is true of every Web3Forms integration by
 * design — their own example puts it in a hidden input — and it only permits
 * submitting to this one form. Rotate it if it attracts spam.
 *
 * Without a key the form falls back to POSTing /api/contact, which delivers
 * through Resend.
 */
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();

type SendResult = { success: true } | { success: false; error: string };

async function sendViaWeb3Forms(data: ContactInput): Promise<SendResult> {
  // FormData rather than JSON: an application/json body triggers a CORS
  // preflight, while multipart/form-data is CORS-safelisted and needs none.
  // Same shape a native <form> POST sends, so it has the fewest ways to fail.
  const fields = new FormData();
  fields.append("access_key", WEB3FORMS_KEY ?? "");
  fields.append("subject", `New enquiry — ${data.name} · ${data.projectType}`);
  fields.append("from_name", data.name);
  fields.append("name", data.name);
  fields.append("email", data.email);
  fields.append("company", data.company || "—");
  fields.append("project_type", data.projectType);
  fields.append("budget", data.budget);
  fields.append("message", data.message);

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: fields,
  });

  const json = (await res.json().catch(() => null)) as
    | { success?: boolean; message?: string }
    | null;

  if (!res.ok || !json?.success) {
    console.error("[contact] Web3Forms rejected the send:", res.status, json?.message);
    return {
      success: false,
      error: `Sending failed. Please email me directly at ${site.email}.`,
    };
  }
  return { success: true };
}

async function sendViaRoute(
  data: ContactInput,
  setErrors: (e: FieldErrors) => void
): Promise<SendResult> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    setErrors((json.fieldErrors ?? {}) as FieldErrors);
    return {
      success: false,
      error: json.error ?? `Something went wrong. Email me at ${site.email}.`,
    };
  }
  return { success: true };
}

const fieldBase =
  "w-full rounded-xl border bg-surface px-4 py-3 text-fg placeholder:text-muted/70 " +
  "transition-colors focus:border-accent focus:outline-none";

function Field({
  label,
  htmlFor,
  error,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-2 block font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="mt-2 text-sm text-accent-ink">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const region = useSyncExternalStore(
    subscribeRegion,
    getRegionSnapshot,
    getServerRegionSnapshot
  );
  const budgets = budgetsByRegion[region];

  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors as FieldErrors);
      setStatus("idle");
      return;
    }

    setErrors({});

    // Honeypot: look like a success and send nothing at all.
    if (parsed.data.website) {
      form.reset();
      setStatus("success");
      return;
    }

    setStatus("submitting");

    try {
      const ok = WEB3FORMS_KEY
        ? await sendViaWeb3Forms(parsed.data)
        : await sendViaRoute(parsed.data, setErrors);

      if (!ok.success) {
        setFormError(ok.error);
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setFormError(
        `Could not reach the server. Please email me at ${site.email}.`
      );
      setStatus("error");
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-card border border-accent/30 bg-accent-soft p-10 text-center"
          >
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-accent text-accent-fg">
              <Check aria-hidden className="size-7" />
            </span>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight">
              Message sent.
            </h3>
            <p className="mx-auto mt-3 max-w-sm leading-relaxed text-muted">
              Thanks — I read every enquiry myself and usually reply within one
              working day.
            </p>
            <Button
              variant="secondary"
              className="mt-8"
              onClick={() => setStatus("idle")}
            >
              Send another
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-6 sm:grid-cols-2"
          >
            <Field label="Your name" htmlFor="name" error={errors.name?.[0]}>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Jane Doe"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={cn(fieldBase, errors.name ? "border-accent" : "border-border")}
              />
            </Field>

            <Field label="Email" htmlFor="email" error={errors.email?.[0]}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="jane@company.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={cn(fieldBase, errors.email ? "border-accent" : "border-border")}
              />
            </Field>

            <Field
              label="Company (optional)"
              htmlFor="company"
              error={errors.company?.[0]}
              className="sm:col-span-2"
            >
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                placeholder="Acme Inc."
                className={cn(fieldBase, "border-border")}
              />
            </Field>

            <Field
              label="What do you need?"
              htmlFor="projectType"
              error={errors.projectType?.[0]}
            >
              <select
                id="projectType"
                name="projectType"
                required
                defaultValue={projectTypes[1]}
                className={cn(fieldBase, "border-border")}
              >
                {projectTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Budget" htmlFor="budget" error={errors.budget?.[0]}>
              {/* Keyed on region so defaultValue follows the option list. */}
              <select
                key={region}
                id="budget"
                name="budget"
                required
                defaultValue={budgets[budgets.length - 1]}
                className={cn(fieldBase, "border-border")}
              >
                {budgets.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label="Tell me about the project"
              htmlFor="message"
              error={errors.message?.[0]}
              className="sm:col-span-2"
            >
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                placeholder="What are you building, who is it for, and when does it need to be live?"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={cn(
                  fieldBase,
                  "resize-y",
                  errors.message ? "border-accent" : "border-border"
                )}
              />
            </Field>

            <div aria-hidden className="hidden">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="sm:col-span-2">
              {formError && (
                <p role="alert" className="mb-4 text-sm text-accent-ink">
                  {formError}
                </p>
              )}
              <Button size="lg" disabled={status === "submitting"}>
                {status === "submitting" ? (
                  <>
                    <Loader2 aria-hidden className="size-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send aria-hidden className="size-4" />
                    Send message
                  </>
                )}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
