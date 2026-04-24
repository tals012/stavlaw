"use client";

import { Script } from "@/components/ui/Script";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function KnowFirsthand() {
  const { dict } = useLocale();

  return (
    <section id="know-firsthand" className="bg-cream-100 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="bg-navy rounded-[22px] px-8 py-16 md:px-16 md:py-20 text-center">
          <Script className="text-[clamp(3rem,5vw,68px)] leading-none block mb-8">
            {dict.knowFirsthand.eyebrow}
          </Script>
          <p className="text-[clamp(1rem,1.2vw,20px)] leading-[1.7] text-cream-100/85 max-w-3xl mx-auto">
            {dict.knowFirsthand.body}
          </p>
        </div>
      </div>
    </section>
  );
}
