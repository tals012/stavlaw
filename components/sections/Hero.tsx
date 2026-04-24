"use client";

import Image from "next/image";
import { Script } from "@/components/ui/Script";
import { HeroPills } from "@/components/sections/HeroPills";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import heroPortrait from "@/figma-assets/hero-portrait.png";

export function Hero() {
  const { dict } = useLocale();

  return (
    <section className="relative bg-navy overflow-hidden text-white">
      {/* top peach accent bar */}
      <div className="absolute start-0 end-0 top-0 h-[3px] bg-peach" />

      <div className="mx-auto w-full max-w-[1600px] px-[clamp(1rem,4vw,4rem)] pt-24 pb-14 md:pt-28 md:pb-16 grid gap-10 md:grid-cols-[1.3fr_1fr] items-center">
        {/* RIGHT col (RTL: 1st child) — text block. In RTL, block default is text-start = right, so NO text-end. */}
        <div className="w-full">
          <h1
            className="font-black text-white leading-[1.1]"
            style={{ fontSize: "clamp(2rem, 4vw, 62px)" }}
          >
            {dict.hero.h1Line1}
            <br />
            {dict.hero.h1Line2Pre}{" "}
            <span className="relative inline-block">
              {dict.hero.h1Line2Underline}
              <span className="absolute -bottom-1 start-0 end-0 h-[3px] bg-peach" />
            </span>
          </h1>

          <p
            className="mt-7 text-white/85 leading-[1.55]"
            style={{ fontSize: "clamp(1rem, 1.2vw, 19px)", maxWidth: "620px" }}
          >
            {dict.hero.subLight}
          </p>
          <p
            className="mt-3 text-white font-bold leading-[1.55]"
            style={{ fontSize: "clamp(1rem, 1.2vw, 19px)", maxWidth: "620px" }}
          >
            {dict.hero.subBold}
          </p>

          <div className="mt-10">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-peach px-10 py-4 text-[18px] font-bold text-navy hover:bg-peach-600 transition-colors"
            >
              {dict.hero.ctaLabel}
            </a>
          </div>

        </div>

        {/* LEFT col (RTL: 2nd child) — square photo card with floating pill overlays + straddling cursive */}
        <div className="relative w-full max-w-[580px] justify-self-start">
          <div className="relative aspect-square rounded-[22px] overflow-hidden">
            <Image
              src={heroPortrait}
              alt={dict.about.portraitAlt}
              fill
              priority
              sizes="(max-width: 768px) 90vw, 580px"
              className="object-cover grayscale"
            />

            {/* Pill overlays — staggered cascade animation */}
            <HeroPills pills={dict.hero.pills} />
          </div>

          {/* Cursive "You Are Not Alone." — white, smaller, anchored to the visual-left (end) edge of the square, straddling the bottom */}
          <Script className="pointer-events-none absolute bottom-0 end-2 translate-y-1/2 -translate-x-2 text-white text-[clamp(1.5rem,2.6vw,44px)] leading-none whitespace-nowrap">
            {dict.hero.scriptAside}
          </Script>
        </div>
      </div>

      {/* Scroll indicator — centered below the hero content, clicks to I Know This Firsthand section */}
      <div className="flex justify-center pt-4 pb-10 md:pt-5 md:pb-12">
        <ScrollIndicator targetId="know-firsthand" ariaLabel={dict.knowFirsthand.eyebrow} />
      </div>

    </section>
  );
}
