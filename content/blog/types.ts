export type CategorySlug =
  | "piturim"
  | "sachar"
  | "harasament"
  | "heriyon"
  | "maamad";

export type Category = {
  slug: CategorySlug;
  name: string;
  description: string;
};

export type FaqItem = { q: string; a: string };

export type Block =
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string; id?: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; tone: "info" | "warning" | "tip"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "faq"; items: FaqItem[] };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: CategorySlug;
  publishedAt: string; // ISO date
  updatedAt: string; // ISO date
  readingMinutes: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  body: Block[];
};
