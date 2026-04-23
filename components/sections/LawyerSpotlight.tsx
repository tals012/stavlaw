import Image from "next/image";
import { site } from "@/content/site";
import spotlightImg from "@/figma-assets/spotlight.jpg";

export function LawyerSpotlight() {
  return (
    <section className="bg-navy py-20 text-cream-100">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2">
        <Image
          src={spotlightImg}
          alt={site.about.portraitAlt}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="rounded-2xl"
        />
        <div>
          <h2 className="text-3xl font-black md:text-4xl">{site.spotlight.headline}</h2>
          <p className="mt-4 text-lg text-cream-100/80">{site.spotlight.body}</p>
          <a
            href="#contact"
            className="mt-8 inline-block rounded-full bg-peach px-7 py-3 text-sm font-bold text-white hover:bg-peach-600 transition-colors"
          >
            {site.spotlight.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
