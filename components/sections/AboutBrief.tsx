import Image from "next/image";
import { site } from "@/content/site";
import { Script } from "@/components/ui/Script";
import lawyerPhoto from "@/figma-assets/lawyer-photo.jpg";

export function AboutBrief() {
  return (
    <section id="about" className="bg-cream-100 py-20">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 md:grid-cols-[1.8fr_1fr]">

        {/* Bio — FIRST in DOM → visual RIGHT in RTL */}
        <div className="py-4 text-end">
          <p className="text-[22px] text-navy leading-[1.116]">נעים מאוד,</p>
          <h2 className="text-[38px] font-bold text-navy leading-[1.116] mt-1">
            עו&quot;ד סתיו אליהו שוקרון
          </h2>
          <div className="mt-6 space-y-4">
            {site.about.paragraphs.map((p, i) => (
              <p key={i} className="text-[17px] text-navy/80 leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          <a
            href="#contact"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-peach border-2 border-peach px-8 py-3 text-[18px] font-bold text-text-dark hover:bg-peach-600 hover:border-peach-600 transition-colors"
          >
            {site.hero.ctaLabel}
          </a>

          {/* Cursive signature */}
          <div className="mt-6 flex justify-end">
            <Script className="text-[clamp(2rem,2.5vw,44px)] text-text-mid leading-none">
              Stav Eliyahu Shokron.
            </Script>
          </div>
        </div>

        {/* Portrait — SECOND in DOM → visual LEFT in RTL */}
        <div
          className="relative rounded-[20px] overflow-hidden shadow-xl aspect-[3/4] w-full max-w-[360px] justify-self-start"
        >
          <Image
            src={lawyerPhoto}
            alt={site.about.portraitAlt}
            fill
            sizes="(max-width: 768px) 100vw, 360px"
            className="object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}
