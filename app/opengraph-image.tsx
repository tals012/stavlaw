import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: 80,
          background: "linear-gradient(135deg,#1F2A44 0%,#111B2E 100%)",
          color: "#F4EBDD",
          fontFamily: "system-ui",
          direction: "rtl",
        }}
      >
        <div style={{ fontSize: 28, color: "#E89B6B", letterSpacing: 2 }}>{site.seo.siteName}</div>
        <div style={{ fontSize: 72, fontWeight: 900, marginTop: 20, lineHeight: 1.15 }}>{site.seo.tagline}</div>
        <div style={{ fontSize: 28, marginTop: 24, color: "#F4EBDDcc" }}>{site.contact.phoneDisplay}</div>
      </div>
    ),
    { ...size }
  );
}
