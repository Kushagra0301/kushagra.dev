import type { Region } from "@/content/services";

const STORAGE_KEY = "pricing-region";

const IN_TIMEZONES = new Set(["Asia/Kolkata", "Asia/Calcutta"]);

let cached: Region | null = null;
const listeners = new Set<() => void>();

function detect(): Region {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "IN" || stored === "INTL") return stored;
  } catch {
    // Private mode or blocked site data — fall through to the timezone probe.
  }

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz && IN_TIMEZONES.has(tz)) return "IN";
  } catch {
    // No Intl timezone available; the default below is the right answer.
  }

  return "INTL";
}

export function getRegionSnapshot(): Region {
  if (cached === null) cached = detect();
  return cached;
}

// Always INTL: these pages prerender on a machine in Asia/Kolkata.
export function getServerRegionSnapshot(): Region {
  return "INTL";
}

export function setRegion(region: Region) {
  if (cached === region) return;
  cached = region;
  try {
    localStorage.setItem(STORAGE_KEY, region);
  } catch {
    // Persisting is a convenience; the choice still applies for this session.
  }
  for (const listener of listeners) listener();
}

export function subscribeRegion(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
