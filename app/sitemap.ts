import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = baseUrl();
  return [
    { url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
  ];
}
