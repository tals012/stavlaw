import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { articleBySlug, articles, categoryBySlug } from "@/content/blog";
import { site } from "@/content/site";

type Params = { slug: string };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug.get(slug);
  if (!article) return {};
  const url = `/blog/${article.slug}`;
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: article.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: "article",
      locale: "he_IL",
      url,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [site.brand.name],
      tags: article.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle,
      description: article.metaDescription,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = articleBySlug.get(slug);
  if (!article) notFound();

  const category = categoryBySlug.get(article.category);
  const related = articles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  const datePublishedLabel = new Date(article.publishedAt).toLocaleDateString(
    "he-IL",
    { year: "numeric", month: "long", day: "numeric" },
  );
  const dateUpdatedLabel = new Date(article.updatedAt).toLocaleDateString(
    "he-IL",
    { year: "numeric", month: "long", day: "numeric" },
  );

  // JSON-LD: Article + BreadcrumbList + FAQPage when applicable
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Person",
      name: site.brand.name,
      jobTitle: "עורכת דין דיני עבודה",
    },
    publisher: {
      "@type": "LegalService",
      name: site.brand.name,
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/stav-logo.svg`,
      },
    },
    inLanguage: "he",
    keywords: article.keywords.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/blog/${article.slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ראשי", item: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/` },
      { "@type": "ListItem", position: 2, name: "בלוג", item: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/blog` },
      ...(category
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: category.name,
              item: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/blog/category/${category.slug}`,
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: category ? 4 : 3,
        name: article.title,
        item: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/blog/${article.slug}`,
      },
    ],
  };

  const faqBlock = article.body.find((b) => b.type === "faq");
  const faqSchema =
    faqBlock && faqBlock.type === "faq"
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqBlock.items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }
      : null;

  return (
    <main className="bg-cream-100 min-h-screen pb-20">
      <div className="bg-navy text-white pt-12 md:pt-16 pb-10 md:pb-12">
        <div className="mx-auto max-w-3xl px-6">
          <nav aria-label="ניווט" className="text-[13px] text-cream-100/70 mb-5">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-peach">ראשי</Link></li>
              <li className="opacity-60">/</li>
              <li><Link href="/blog" className="hover:text-peach">בלוג</Link></li>
              {category && (
                <>
                  <li className="opacity-60">/</li>
                  <li>
                    <Link href={`/blog/category/${category.slug}`} className="hover:text-peach">
                      {category.name}
                    </Link>
                  </li>
                </>
              )}
            </ol>
          </nav>

          <h1 className="text-[clamp(1.75rem,3.5vw,46px)] font-bold leading-[1.18]">
            {article.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-cream-100/75">
            <span>פורסם: <time dateTime={article.publishedAt}>{datePublishedLabel}</time></span>
            {article.updatedAt !== article.publishedAt && (
              <>
                <span className="opacity-50">•</span>
                <span>עודכן: <time dateTime={article.updatedAt}>{dateUpdatedLabel}</time></span>
              </>
            )}
            <span className="opacity-50">•</span>
            <span>{article.readingMinutes} דק׳ קריאה</span>
            <span className="opacity-50">•</span>
            <span>מאת {site.brand.name}</span>
          </div>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-6 pt-10 md:pt-12">
        <ArticleBody blocks={article.body} />

        {/* Disclaimer + CTA */}
        <section className="mt-14 rounded-[20px] bg-navy text-white p-7 md:p-9 text-center">
          <h2 className="text-[22px] md:text-[26px] font-bold leading-tight">
            המאמר עורר אצלך שאלה לגבי המקרה שלך?
          </h2>
          <p className="mt-3 text-cream-100/85 max-w-xl mx-auto leading-relaxed">
            המידע במאמר הוא כללי ואינו מהווה ייעוץ משפטי. כל מקרה שונה ודורש בחינה אישית.
            פגישת ייעוץ קצרה יכולה לחסוך לך כסף רב ולמנוע טעויות יקרות.
          </p>
          <Link
            href="/#contact"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-peach text-navy px-8 py-3 text-[16px] font-bold hover:bg-peach-600 transition-colors"
          >
            לשיחת ייעוץ
          </Link>
        </section>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-[22px] md:text-[26px] font-bold text-navy mb-5">
              עוד מאותה קטגוריה
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        )}
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </main>
  );
}
