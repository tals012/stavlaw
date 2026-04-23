import Image from "next/image";
import { site } from "@/content/site";
import { Script } from "@/components/ui/Script";
import heroPortrait from "@/figma-assets/hero-portrait.jpg";

export function Hero() {
  return (
    <section className="bg-cream-100 min-h-screen flex flex-col">
      {/* Two-column hero content — full height minus nav */}
      <div className="flex-1 mx-auto w-full max-w-[1280px] px-6 pt-28 pb-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* RIGHT column (RTL: source order first = renders on right) — text content */}
        <div className="flex flex-col items-end text-end order-1 md:order-1">
          <h1
            className="font-black text-navy leading-[1.19]"
            style={{ fontSize: "clamp(2rem, 3.8vw, 58px)", maxWidth: "620px" }}
          >
            הזכויות שלך בעבודה הן לא המלצה{" "}
            <span className="text-navy">הן חובה!</span>
          </h1>

          <p
            className="mt-6 text-navy/80 leading-relaxed"
            style={{ fontSize: "clamp(1rem, 1.3vw, 20px)", maxWidth: "560px" }}
          >
            {site.hero.sub}
          </p>

          <a
            href="#contact"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-peach border-2 border-peach px-8 py-4 text-[18px] font-bold text-text-dark hover:bg-peach-600 hover:border-peach-600 transition-colors"
          >
            {site.hero.ctaLabel}
          </a>

          <a
            href={`tel:${site.contact.phoneIntl}`}
            className="mt-4 text-peach text-lg hover:underline"
          >
            <bdi>{site.contact.phoneDisplay}</bdi>
          </a>
        </div>

        {/* LEFT column (RTL: source order second = renders on left) — navy photo card */}
        <div className="order-2 md:order-2 flex justify-center md:justify-start">
          <div
            className="relative bg-navy rounded-[22px] overflow-hidden shadow-2xl"
            style={{ width: "420px", height: "520px", maxWidth: "100%" }}
          >
            <Image
              src={heroPortrait}
              alt={site.about.portraitAlt}
              fill
              priority
              sizes="(max-width: 768px) 90vw, 420px"
              className="object-cover object-top"
            />

            {/* Floating chip inside card */}
            <div className="absolute bottom-6 end-6 bg-cream-100 rounded-full px-4 py-2 flex items-center gap-2 shadow-md">
              <span className="w-[7px] h-[7px] rounded-full bg-peach shrink-0" />
              <span className="text-navy text-[14px] font-bold whitespace-nowrap">אישת לי משפטית</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative cursive bottom line */}
      <div className="pb-8 flex justify-center">
        <Script className="text-[clamp(3rem,6vw,80px)] leading-none">
          You Are Not Alone.
        </Script>
      </div>
    </section>
  );
}
