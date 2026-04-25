import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ArticleCard } from "@/components/blog/ArticleCard";
import {
  articlesByCategory,
  categories,
  categoryBySlug,
} from "@/content/blog";
import type { CategorySlug } from "@/content/blog/types";

type Params = { category: string };

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = categoryBySlug.get(slug as CategorySlug);
  if (!category) return {};
  return {
    title: `${category.name} | בלוג | עו״ד שוקרון`,
    description: category.description,
    alternates: { canonical: `/blog/category/${category.slug}` },
    openGraph: {
      title: category.name,
      description: category.description,
      type: "website",
      locale: "he_IL",
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category: slug } = await params;
  const category = categoryBySlug.get(slug as CategorySlug);
  if (!category) notFound();

  const list = articlesByCategory(category.slug);

  return (
    <main className="bg-cream-100 min-h-screen pb-20">
      <div className="bg-navy text-white pt-16 md:pt-20 pb-12 md:pb-16">
        <div className="mx-auto max-w-5xl px-6">
          <nav aria-label="ניווט" className="text-[13px] text-cream-100/70 mb-5">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-peach">ראשי</Link></li>
              <li className="opacity-60">/</li>
              <li><Link href="/blog" className="hover:text-peach">בלוג</Link></li>
              <li className="opacity-60">/</li>
              <li>{category.name}</li>
            </ol>
          </nav>
          <h1 className="text-[clamp(2rem,4vw,52px)] font-bold leading-[1.15]">
            {category.name}
          </h1>
          <p className="mt-4 text-[18px] text-cream-100/85 max-w-2xl leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 pt-10 md:pt-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-[14px] text-navy/70 hover:text-peach transition-colors mb-8"
        >
          <ChevronRight className="h-4 w-4" />
          חזרה לכל המאמרים
        </Link>

        {list.length === 0 ? (
          <p className="text-navy/70">אין עדיין מאמרים בקטגוריה זו.</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {list.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
