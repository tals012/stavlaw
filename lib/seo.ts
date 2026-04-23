import type { Metadata } from "next";
import { site } from "@/content/site";

export function baseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://stavlaw.co.il";
}

export function landingMetadata(): Metadata {
  const url = baseUrl();
  const title = `${site.seo.siteName} | ${site.seo.tagline}`;
  const description = site.seo.defaultDescription;
  return {
    title,
    description,
    alternates: { canonical: url, languages: { "he-IL": url } },
    openGraph: {
      type: "website",
      locale: "he_IL",
      url,
      siteName: site.seo.siteName,
      title,
      description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
    verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
      : undefined,
  };
}
