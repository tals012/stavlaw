import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { articles, categories } from "@/content/blog";

export const metadata: Metadata = {
  title: "בלוג | מאמרים על דיני עבודה | עו״ד סתיו אליהו שוקרון",
  description:
    "מאמרים מקצועיים ומעודכנים על דיני עבודה בישראל - פיטורים, שעות נוספות, פיצויים, הטרדה והתעמרות, הריון ולידה ועוד. מאת עו״ד סתיו אליהו שוקרון.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "בלוג דיני עבודה | עו״ד שוקרון",
    description:
      "מאמרים מקצועיים על זכויות עובדים, פיטורים, שעות נוספות, הטרדה ועוד. עו״ד דיני עבודה.",
    type: "website",
    locale: "he_IL",
  },
};

export default function BlogIndexPage() {
  return (
    <main className="bg-cream-100 min-h-screen pb-20">
      <div className="bg-navy text-white pt-16 md:pt-20 pb-12 md:pb-16">
        <div className="mx-auto max-w-5xl px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[14px] text-cream-100/70 hover:text-peach transition-colors mb-6"
          >
            <ChevronRight className="h-4 w-4" />
            חזרה לעמוד הבית
          </Link>
          <h1 className="text-[clamp(2rem,4vw,52px)] font-bold leading-[1.15]">
            בלוג דיני עבודה
          </h1>
          <p className="mt-4 text-[18px] text-cream-100/85 max-w-2xl leading-relaxed">
            מאמרים מקצועיים על זכויות עובדים בישראל - מבוססים על פסיקה עדכנית
            וכתובים בשפה ברורה. כל מה שצריך לדעת לפני שמדברים עם המעסיק.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 pt-10 md:pt-12">
        {/* Categories pill nav */}
        <nav aria-label="קטגוריות" className="flex flex-wrap gap-2 mb-10">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/blog/category/${c.slug}`}
              className="inline-flex items-center rounded-full border border-navy/15 bg-white px-4 py-2 text-[14px] font-medium text-navy hover:border-peach hover:text-peach transition-colors"
            >
              {c.name}
            </Link>
          ))}
        </nav>

        {/* Articles grid */}
        <div className="grid gap-5 md:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </main>
  );
}
