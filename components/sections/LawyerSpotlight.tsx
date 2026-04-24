import Image from "next/image";
import { site } from "@/content/site";
import lawyerPhoto from "@/figma-assets/lawyer-photo.jpg";

export function LawyerSpotlight() {
  return (
    <section id="spotlight" className="bg-navy py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Text — FIRST in DOM → visual RIGHT in RTL (default text-align: start = right) */}
          <div>
            <h2
              className="font-bold text-white leading-[1.173]"
              style={{ fontSize: "clamp(2rem, 3.2vw, 48px)" }}
            >
              {site.spotlight.headline}
            </h2>
            <p className="mt-5 text-[18px] text-white/80 leading-[1.5]">
              {site.spotlight.body}
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-peach border-2 border-peach px-8 py-3 text-[18px] font-bold text-text-dark hover:bg-peach-600 hover:border-peach-600 transition-colors"
            >
              {site.spotlight.ctaLabel}
            </a>
          </div>

          {/* Image — SECOND in DOM → visual LEFT in RTL */}
          <div
            className="relative rounded-[20px] overflow-hidden aspect-[4/3] w-full"
          >
            <Image
              src={lawyerPhoto}
              alt={site.about.portraitAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
