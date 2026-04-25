import Link from "next/link";
import type { Article } from "@/content/blog/types";
import { categoryBySlug } from "@/content/blog/categories";

export function ArticleCard({ article }: { article: Article }) {
  const cat = categoryBySlug.get(article.category);
  const dateLabel = new Date(article.publishedAt).toLocaleDateString("he-IL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <article className="group relative bg-white rounded-2xl border border-navy/10 p-6 md:p-7 transition-all hover:border-peach/60 hover:shadow-lg">
      <div className="flex items-center gap-2 text-[12px] font-medium">
        {cat && (
          <Link
            href={`/blog/category/${cat.slug}`}
            className="inline-flex items-center rounded-full bg-peach/15 text-peach px-3 py-1 hover:bg-peach/25 transition-colors"
          >
            {cat.name}
          </Link>
        )}
        <time className="text-navy/50" dateTime={article.publishedAt}>
          {dateLabel}
        </time>
        <span className="text-navy/30">•</span>
        <span className="text-navy/50">{article.readingMinutes} דק׳ קריאה</span>
      </div>

      <h3 className="mt-3 text-[20px] md:text-[22px] font-bold text-navy leading-[1.25]">
        <Link
          href={`/blog/${article.slug}`}
          className="after:absolute after:inset-0 hover:text-peach transition-colors"
        >
          {article.title}
        </Link>
      </h3>

      <p className="mt-3 text-[15px] text-navy/70 leading-relaxed">
        {article.excerpt}
      </p>

      <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-bold text-peach">
        להמשך קריאה ←
      </span>
    </article>
  );
}
