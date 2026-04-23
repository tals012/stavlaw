import Image from "next/image";
import { site } from "@/content/site";
import heroImg from "@/figma-assets/hero.jpg";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] bg-navy pt-24 text-cream-100">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-20 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <h1 className="text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
            {site.hero.h1}
          </h1>
          <p className="mt-5 text-lg text-cream-200/90 md:text-xl">{site.hero.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="rounded-full bg-peach px-7 py-3 text-sm font-bold text-white hover:bg-peach-600 transition-colors"
            >
              {site.hero.ctaLabel}
            </a>
            <a
              href={`tel:${site.contact.phoneIntl}`}
              className="rounded-full border border-cream-100/30 px-7 py-3 text-sm font-semibold hover:bg-cream-100/10 transition-colors"
            >
              <bdi>{site.contact.phoneDisplay}</bdi>
            </a>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <Image
            src={heroImg}
            alt={site.about.portraitAlt}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
