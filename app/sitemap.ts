import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/seo";
import { articles, categories } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = baseUrl();
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${url}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${url}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${url}/blog/category/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${url}/blog/${a.slug}`,
    lastModified: new Date(a.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...articlePages];
}
