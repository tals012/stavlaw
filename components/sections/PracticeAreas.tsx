import Image from "next/image";
import { site } from "@/content/site";
import { Script } from "@/components/ui/Script";
import shieldIcon from "@/figma-assets/shield-icon.svg";
import heroPortrait from "@/figma-assets/hero-portrait.jpg";

export function PracticeAreas() {
  return (
    <section id="practice-areas" className="bg-navy py-20">
      <div className="mx-auto max-w-6xl px-6">

        {/* Section heading */}
        <div className="text-center mb-14">
          <Script className="text-[clamp(2.5rem,4.5vw,68px)] leading-none block mb-3">
            Legal Assistance
          </Script>
          <h2 className="text-[clamp(2rem,3.5vw,53px)] font-bold text-white leading-[1.116]">
            מעטפת ליווי משפטית לשכירים
          </h2>
          <p className="mt-3 text-[18px] text-white/75 max-w-2xl mx-auto leading-relaxed">
            ייצוג מקצועי ואישי בכל שלבי ההליך המשפטי מול המעסיק
          </p>
        </div>

        {/* 3-column × 2-row grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {site.practiceAreas.map((area) => (
            <article
              key={area.slug}
              className="bg-navy-mid rounded-xl overflow-hidden relative group hover:-translate-y-1 transition-transform"
              style={{ minHeight: "200px" }}
            >
              {/* Card image — small thumbnail */}
              <div className="relative h-[140px] overflow-hidden rounded-[10px] mx-3 mt-3">
                <Image
                  src={heroPortrait}
                  alt={area.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>

              {/* Shield icon badge */}
              <div className="absolute top-5 end-5 w-[44px] h-[44px] border border-peach rounded-[10px] flex items-center justify-center bg-navy-mid">
                <Image src={shieldIcon} alt="" width={20} height={20} />
              </div>

              {/* Text — default text-align: start = right in RTL */}
              <div className="px-4 pb-5 pt-2">
                <h3 className="text-[20px] font-bold text-white leading-[1.2]">{area.title}</h3>
                <p className="mt-1 text-[14px] text-white/70 leading-relaxed line-clamp-3">{area.blurb}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Peach-bordered cream CTA panel */}
        <div className="mt-10 border-2 border-peach rounded-xl p-6 bg-cream-100 flex flex-col md:flex-row items-center justify-between gap-5">
          <p className="text-[20px] font-bold text-navy text-center md:text-start">
            אני מלווה אותך בכל שאלה / בעיה
          </p>
          <a
            href="#contact"
            className="shrink-0 inline-flex items-center justify-center rounded-full bg-peach border-2 border-peach px-8 py-3 text-[18px] font-bold text-text-dark hover:bg-peach-600 hover:border-peach-600 transition-colors"
          >
            {site.hero.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
