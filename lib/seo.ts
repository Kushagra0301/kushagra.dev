import type { Metadata } from "next";
import { site } from "@/content/site";

export function buildMetadata({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/**
 * Serialised for dangerouslySetInnerHTML. JSON.stringify does not escape `<`,
 * so a value containing `</script>` would close the tag and inject markup.
 */
export function personJsonLdScript() {
  return JSON.stringify(personJsonLd())
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

/** JSON-LD Person graph, injected once from the root layout. */
export function personJsonLd() {
  const sameAs = Object.values(site.socials).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    email: `mailto:${site.email}`,
    telephone: site.phone,
    url: site.url,
    address: { "@type": "PostalAddress", addressLocality: site.location },
    ...(sameAs.length ? { sameAs } : {}),
  };
}
