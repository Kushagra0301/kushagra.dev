import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Rendered at build time with the edge-runtime satori renderer, which only
 * understands a subset of CSS — hence the inline flex layout and system font
 * stack rather than the design tokens used everywhere else.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#071110",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#2dd4bf",
            }}
          />
          <div
            style={{
              color: "#8a9e9b",
              fontSize: 26,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            {site.role}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#e6f0ee",
              fontSize: 104,
              lineHeight: 1.02,
              letterSpacing: -4,
              fontWeight: 700,
            }}
          >
            Websites that
          </div>
          <div
            style={{
              display: "flex",
              color: "#2dd4bf",
              fontSize: 104,
              lineHeight: 1.02,
              letterSpacing: -4,
              fontWeight: 700,
            }}
          >
            earn attention.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#8a9e9b",
            fontSize: 28,
          }}
        >
          <span>{site.name}</span>
          <span>{site.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    size
  );
}
