"use client";

import { Script } from "@/components/ui/Script";
import { PracticeAreaCard } from "./PracticeAreaCard";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function PracticeAreas() {
  const { dict } = useLocale();
  const pa = dict.practiceAreas;

  return (
    <section id="practice-areas" className="bg-navy py-20">
      <div className="mx-auto max-w-6xl px-6">

        {/* Section heading */}
        <div className="text-center mb-14">
          <Script className="text-[clamp(2.5rem,4.5vw,68px)] leading-none block mb-3">
            {pa.eyebrow}
          </Script>
          <h2 className="text-[clamp(2rem,3.5vw,53px)] font-bold text-white leading-[1.116]">
            {pa.heading}
          </h2>
          <p className="mt-3 text-[18px] text-white/75 max-w-2xl mx-auto leading-relaxed">
            {pa.sub}
          </p>
        </div>

        {/* 3-column × 2-row grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pa.items.map((area, i) => (
            <PracticeAreaCard key={area.slug} area={area} index={i} />
          ))}
        </div>

        {/* Peach-bordered navy CTA panel — centered heading + description + CTA */}
        <div className="mt-10 border-2 border-peach rounded-2xl px-8 py-14 md:px-16 md:py-16 bg-navy-ink text-center">
          <h3 className="text-[clamp(1.75rem,3vw,42px)] font-bold text-white leading-[1.2]">
            {pa.panelHeading}
          </h3>
          <p className="mt-5 text-[15px] text-white/75 leading-[1.6] max-w-2xl mx-auto">
            {pa.panelBody}
          </p>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-peach px-10 py-3 text-[18px] font-bold text-navy hover:bg-peach-600 transition-colors"
          >
            {dict.hero.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
