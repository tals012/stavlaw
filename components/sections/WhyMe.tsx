"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Script } from "@/components/ui/Script";
import { HighlightedText, DwellHighlight } from "@/components/ui/HighlightedText";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function WhyMe() {
  const { dict } = useLocale();
  const whyMe = dict.whyMe;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    direction: "rtl",
    loop: false,
    containScroll: false,
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  if (!whyMe) return null;

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const scrollTo = (i: number) => emblaApi?.scrollTo(i);

  return (
    <section className="bg-cream-100 py-20 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-12">

          {/* Text - FIRST in DOM → top on mobile, visual RIGHT on desktop (RTL) */}
          <div className="lg:w-[38%] lg:shrink-0">
            <Script className="text-[clamp(1.75rem,2.6vw,42px)] leading-none block mb-3">
              {whyMe.eyebrow}
            </Script>
            <h2 className="text-[clamp(2rem,3.5vw,55px)] font-bold text-navy leading-[1.173]">
              {whyMe.heading}
            </h2>
            <DwellHighlight className="mt-5 space-y-4">
              {whyMe.paragraphs.map((p, i) => (
                <p key={i} className="text-[18px] text-navy/80 leading-relaxed">
                  <HighlightedText text={p} />
                </p>
              ))}
            </DwellHighlight>
          </div>

          {/* Slider - SECOND in DOM → below text on mobile, visual LEFT on desktop (RTL).
              On desktop, extend inline-end (left in RTL) to viewport edge so cards bleed off the left. */}
          <div className="w-full lg:flex-1 lg:min-w-0">
            <div
              ref={emblaRef}
              className="overflow-hidden lg:[margin-inline-end:calc((72rem-100vw)/2-1.5rem)]"
            >
              <div className="flex gap-6 pe-6">
                {whyMe.cards.map((card) => (
                  <div
                    key={card.n}
                    className="shrink-0 basis-[85%] sm:basis-[62%] md:basis-[55%] lg:basis-[62%] bg-navy rounded-[20px] p-8 min-h-[320px]"
                  >
                    <span className="text-peach text-[clamp(1.5rem,2vw,36px)] select-none font-[family-name:var(--font-angelic)]">
                      {card.n}
                    </span>
                    <h3 className="text-[clamp(1.2rem,1.8vw,26px)] font-bold text-white leading-[1.173] mt-2">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-[17px] text-white/80 leading-[1.5]">
                      {card.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls - constrained under the slider's non-bleed area */}
            <div className="mt-8 flex items-center gap-6">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={scrollPrev}
                  disabled={!canPrev}
                  aria-label={whyMe.prev}
                  className="h-12 w-12 rounded-full border-2 border-navy flex items-center justify-center text-navy transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-navy hover:text-white"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={scrollNext}
                  disabled={!canNext}
                  aria-label={whyMe.next}
                  className="h-12 w-12 rounded-full border-2 border-navy flex items-center justify-center text-navy transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-navy hover:text-white"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>

              {/* Progress dots */}
              <div className="flex items-center gap-2">
                {whyMe.cards.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => scrollTo(i)}
                    aria-label={whyMe.dotLabel(i + 1)}
                    className={`h-2 rounded-full transition-all ${
                      i === selectedIndex ? "w-8 bg-peach" : "w-2 bg-navy/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
