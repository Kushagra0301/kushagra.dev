import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { site } from "@/content/site";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MAX_TRACKED_IPS = 10_000;
const hits = new Map<string, { count: number; resetAt: number }>();

// Without this the map grows one entry per unique IP forever, so a spray of
// spoofed X-Forwarded-For values becomes a memory-exhaustion vector.
function prune(now: number) {
  for (const [ip, entry] of hits) {
    if (now > entry.resetAt) hits.delete(ip);
  }
  if (hits.size > MAX_TRACKED_IPS) {
    const excess = hits.size - MAX_TRACKED_IPS;
    let i = 0;
    for (const ip of hits.keys()) {
      if (i++ >= excess) break;
      hits.delete(ip);
    }
  }
}

function rateLimited(ip: string) {
  const now = Date.now();
  prune(now);
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

// Strips CR/LF and other control characters before they reach a mail subject.
function singleLine(value: string) {
  return value.replace(/[\p{Cc}\p{Cf}]/gu, " ").trim().slice(0, 120);
}

type Delivery = { status: "sent" | "failed" | "unconfigured" };

/**
 * Resend only. Web3Forms is not called from here — routing it through the
 * server returned a Cloudflare 403 in production, and the browser submission
 * their docs describe is the supported path. See
 * components/sections/contact-form.tsx.
 */
async function deliver(data: ContactInput): Promise<Delivery> {
  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (resendKey) return sendViaResend(resendKey, data);

  return { status: "unconfigured" };
}

async function sendViaResend(
  apiKey: string,
  data: ContactInput
): Promise<Delivery> {
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `New enquiry — ${singleLine(data.name)} · ${singleLine(data.projectType)}`,
      html: `
        <h2>New project enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        ${data.company ? `<p><strong>Company:</strong> ${escapeHtml(data.company)}</p>` : ""}
        <p><strong>Project type:</strong> ${escapeHtml(data.projectType)}</p>
        <p><strong>Budget:</strong> ${escapeHtml(data.budget)}</p>
        <hr />
        <p>${escapeHtml(data.message).replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("[contact] Resend rejected the send:", error);
      return { status: "failed" };
    }
    return { status: "sent" };
  } catch (err) {
    console.error("[contact] Resend request failed:", err);
    return { status: "failed" };
  }
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return NextResponse.json({ error: "Validation failed.", fieldErrors }, { status: 400 });
  }

  const data = parsed.data;

  // Honeypot tripped — respond exactly as if it worked, and send nothing.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  if (rateLimited(clientIp(request))) {
    return NextResponse.json(
      {
        error: `That is a lot of messages. Try again later, or email me directly at ${site.email}.`,
      },
      { status: 429 }
    );
  }

  const delivery = await deliver(data);

  if (delivery.status === "unconfigured") {
    console.error("[contact] No delivery provider configured — message not sent.");
    return NextResponse.json(
      {
        error: `The form is not wired up yet. Please email me directly at ${site.email}.`,
      },
      { status: 503 }
    );
  }

  if (delivery.status === "failed") {
    return NextResponse.json(
      { error: `Sending failed. Please email me directly at ${site.email}.` },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
