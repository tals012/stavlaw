"use client";

import { useState } from "react";
import Image from "next/image";
import { site } from "@/content/site";
import { Script } from "@/components/ui/Script";
import caseStudy from "@/figma-assets/case-study.jpg";

export function Testimonials() {
  const items = site.testimonials;
  const [i, setI] = useState(0);

  // RTL: go(1) = next (shift container leftward in LTR = rightward in RTL)
  const go = (d: -1 | 1) => setI((prev) => (prev + d + items.length) % items.length);

  return (
    <section id="testimonials" className="bg-cream-100 py-20">
      <div className="mx-auto max-w-6xl px-6">

        {/* Section heading */}
        <div className="text-center mb-14">
          <Script className="text-[clamp(2.5rem,4vw,64px)] leading-none block mb-3">
            From The Real World
          </Script>
          <h2 className="text-[clamp(2rem,3.5vw,55px)] font-bold text-navy leading-[1.22]">
            דוגמאות מהעולם האמיתי
          </h2>
        </div>

        {/* Slider container */}
        <div className="relative overflow-hidden rounded-[20px]">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(${i * 100}%)` }}
          >
            {items.map((t, idx) => (
              <article
                key={idx}
                className="w-full shrink-0 bg-navy rounded-[20px] grid grid-cols-1 md:grid-cols-[380px_1fr] overflow-hidden"
              >
                {/* Photo — visual left */}
                <div className="relative min-h-[300px] md:min-h-[440px]">
                  <Image
                    src={caseStudy}
                    alt={t.caseType}
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover grayscale"
                  />
                  <div className="absolute inset-0 bg-navy/30" />
                </div>

                {/* Case text — visual right */}
                <div className="p-10 flex flex-col justify-center text-end gap-4">
                  <div>
                    <p className="text-peach text-[22px] font-bold">{t.author} |</p>
                    <p className="text-peach text-[20px] font-bold">{t.caseType}</p>
                  </div>
                  <div className="w-full h-px bg-white/20" />
                  <p className="text-white text-[18px] leading-[1.5]">
                    &quot;{t.quote}&quot;
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Prev arrow (in RTL layout: visual right = "previous") */}
          <button
            onClick={() => go(-1)}
            aria-label="הקודם"
            className="absolute top-1/2 -translate-y-1/2 end-4 z-10 w-10 h-10 rounded-full bg-cream-100/90 text-navy flex items-center justify-center text-2xl font-bold hover:bg-peach hover:text-white transition-colors shadow-md"
          >
            ›
          </button>

          {/* Next arrow (visual left = "next" in RTL) */}
          <button
            onClick={() => go(1)}
            aria-label="הבא"
            className="absolute top-1/2 -translate-y-1/2 start-4 z-10 w-10 h-10 rounded-full bg-cream-100/90 text-navy flex items-center justify-center text-2xl font-bold hover:bg-peach hover:text-white transition-colors shadow-md"
          >
            ‹
          </button>
        </div>

        {/* Pagination dots */}
        <div className="mt-6 flex justify-center gap-3">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`עבור לשקופית ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                idx === i ? "w-6 bg-peach" : "w-2.5 bg-cream-200"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
