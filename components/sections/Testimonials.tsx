"use client";

import { useRef } from "react";
import { site } from "@/content/site";

export function Testimonials() {
  const scroller = useRef<HTMLUListElement>(null);

  const scroll = (dir: -1 | 1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  return (
    <section id="testimonials" className="bg-cream-100 py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-peach-600">ממליצים</span>
          <h2 className="mt-2 text-3xl font-black text-navy-ink md:text-4xl">דוגמאות מהימנות האמיתי</h2>
        </div>
        <ul
          ref={scroller}
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {site.testimonials.map((t, i) => (
            <li
              key={i}
              className="min-w-full shrink-0 snap-center rounded-2xl bg-white p-8 shadow-md md:min-w-[calc(50%-0.75rem)]"
            >
              <p className="text-lg leading-relaxed text-navy-ink">״{t.quote}״</p>
              <footer className="mt-6 text-sm text-navy-ink/70">
                <span className="font-bold">{t.author}</span> · {t.caseType}
              </footer>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-center gap-3">
          <button
            aria-label="הקודם"
            onClick={() => scroll(1)}
            className="h-10 w-10 rounded-full bg-navy text-cream-100 hover:bg-navy-ink"
          >
            →
          </button>
          <button
            aria-label="הבא"
            onClick={() => scroll(-1)}
            className="h-10 w-10 rounded-full bg-navy text-cream-100 hover:bg-navy-ink"
          >
            ←
          </button>
        </div>
      </div>
    </section>
  );
}
