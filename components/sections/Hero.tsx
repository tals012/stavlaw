import Image from "next/image";
import { site } from "@/content/site";
import { Script } from "@/components/ui/Script";
import heroPortrait from "@/figma-assets/hero-portrait.png";

export function Hero() {
  return (
    <section className="relative bg-navy min-h-screen overflow-hidden text-white">
      {/* top peach accent bar */}
      <div className="absolute start-0 end-0 top-0 h-[3px] bg-peach" />

      <div className="mx-auto w-full max-w-[1600px] px-[clamp(1rem,4vw,4rem)] pt-40 pb-16 grid gap-10 md:grid-cols-[1.3fr_1fr] items-center">
        {/* RIGHT col (RTL: 1st child) — text block. In RTL, block default is text-start = right, so NO text-end. */}
        <div className="w-full">
          <h1
            className="font-black text-white leading-[1.1]"
            style={{ fontSize: "clamp(2rem, 4vw, 62px)" }}
          >
            {site.hero.h1Line1}
            <br />
            {site.hero.h1Line2Pre}{" "}
            <span className="relative inline-block">
              {site.hero.h1Line2Underline}
              <span className="absolute -bottom-1 start-0 end-0 h-[3px] bg-peach" />
            </span>
          </h1>

          <p
            className="mt-7 text-white/85 leading-[1.55]"
            style={{ fontSize: "clamp(1rem, 1.2vw, 19px)", maxWidth: "620px" }}
          >
            {site.hero.subLight}
          </p>
          <p
            className="mt-3 text-white font-bold leading-[1.55]"
            style={{ fontSize: "clamp(1rem, 1.2vw, 19px)", maxWidth: "620px" }}
          >
            {site.hero.subBold}
          </p>

          <div className="mt-10">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-peach px-10 py-4 text-[18px] font-bold text-navy hover:bg-peach-600 transition-colors"
            >
              {site.hero.ctaLabel}
            </a>
          </div>
        </div>

        {/* LEFT col (RTL: 2nd child) — photo card with floating pill overlays */}
        <div className="relative w-full max-w-[560px] justify-self-start">
          <div
            className="relative rounded-[22px] overflow-hidden"
            style={{ aspectRatio: "5 / 6" }}
          >
            <Image
              src={heroPortrait}
              alt={site.about.portraitAlt}
              fill
              priority
              sizes="(max-width: 768px) 90vw, 540px"
              className="object-cover grayscale"
            />

            {/* Pill overlays — positions keyed by `position` on each pill */}
            {site.hero.pills.map((pill, i) => {
              const pos =
                pill.position === "top"
                  ? "top-[14%] start-[30%]"
                  : pill.position === "mid"
                  ? "top-[52%] end-[6%]"
                  : "bottom-[10%] start-[34%]";
              return (
                <div
                  key={i}
                  className={`absolute ${pos} bg-navy rounded-full ps-3 pe-4 py-2 flex items-center gap-2 shadow-md`}
                >
                  <span className="w-[7px] h-[7px] rounded-full bg-peach shrink-0" />
                  <span className="text-white text-[13px] font-medium whitespace-nowrap">
                    {pill.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Cursive line under the image, visual-left aligned */}
          <div className="mt-6 ps-2">
            <Script className="text-[clamp(2.5rem,5vw,68px)] leading-none">
              You Are Not Alone.
            </Script>
          </div>
        </div>
      </div>

      {/* Scroll indicator — bottom end (visual right in RTL) */}
      <div className="absolute bottom-8 end-8 text-peach/80">
        <svg width="20" height="32" viewBox="0 0 20 32" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="18" height="30" rx="9" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="10" cy="9" r="2" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}
