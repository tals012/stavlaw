"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Script } from "@/components/ui/Script";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import caseStudyFallback from "@/figma-assets/case-study.jpg";

export function Testimonials() {
  const { dict } = useLocale();
  const t = dict.testimonials;
  const items = t.items;
  const [i, setI] = useState(0);

  const go = (d: -1 | 1) => setI((prev) => (prev + d + items.length) % items.length);

  return (
    <section id="testimonials" className="bg-cream-100 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* Section heading */}
        <div className="text-center mb-8 md:mb-14">
          <Script className="text-[clamp(2rem,4vw,64px)] leading-none block mb-3">
            {t.eyebrow}
          </Script>
          <h2 className="text-[clamp(1.5rem,3.5vw,55px)] font-bold text-navy leading-[1.22]">
            {t.heading}
          </h2>
        </div>

        {/* Slider container */}
        <div className="relative overflow-hidden rounded-[20px]">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(${i * 100}%)` }}
          >
            {items.map((item, idx) => {
              const src = item.imageSlug
                ? `/case-studies/${item.imageSlug}.jpg`
                : caseStudyFallback;
              return (
                <article
                  key={idx}
                  className="w-full shrink-0 bg-navy rounded-[20px] grid grid-cols-1 md:grid-cols-[1fr_380px] overflow-hidden"
                >
                  {/* Photo - mobile bottom, desktop visual-LEFT (DOM second) */}
                  <div className="relative h-[200px] md:h-auto md:min-h-[440px] order-2 md:order-2">
                    <Image
                      src={src}
                      alt={item.caseType}
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-cover grayscale"
                    />
                    <div className="absolute inset-0 bg-navy/30" />
                  </div>

                  {/* Case text - mobile top, desktop visual-RIGHT */}
                  <div className="p-6 md:p-10 flex flex-col justify-center gap-3 md:gap-4 order-1 md:order-1">
                    <div>
                      <p className="text-peach text-[17px] md:text-[22px] font-bold leading-tight">
                        {item.author} |
                      </p>
                      <p className="text-peach text-[15px] md:text-[20px] font-bold leading-snug mt-1">
                        {item.caseType}
                      </p>
                    </div>
                    <div className="w-full h-px bg-white/20" />
                    <p className="text-white text-[14px] md:text-[18px] leading-[1.55]">
                      &quot;{item.quote}&quot;
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

        </div>

        {/* Controls row: arrows + dots (same layout on mobile + desktop). RTL flex: first DOM child = visual right = prev */}
        <div className="mt-5 md:mt-8 flex items-center justify-center gap-3 md:gap-5">
          <button
            onClick={() => go(-1)}
            aria-label={t.prev}
            className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-navy/90 text-cream-100 flex items-center justify-center hover:bg-peach hover:text-navy transition-colors shadow"
          >
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
          </button>

          <div className="flex justify-center gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={t.slideLabel(idx + 1)}
                className={`h-2.5 rounded-full transition-all ${
                  idx === i ? "w-6 bg-peach" : "w-2.5 bg-cream-200"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            aria-label={t.next}
            className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-navy/90 text-cream-100 flex items-center justify-center hover:bg-peach hover:text-navy transition-colors shadow"
          >
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
