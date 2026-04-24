import Image from "next/image";
import { site } from "@/content/site";
import { Script } from "@/components/ui/Script";
import shieldIcon from "@/figma-assets/shield-icon.svg";

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
              className="bg-navy-mid rounded-2xl p-7 hover:-translate-y-1 transition-transform"
            >
              {/* Shield badge — peach-bordered circle, on visual-right (start) in RTL */}
              <div className="w-[52px] h-[52px] border border-peach rounded-full flex items-center justify-center">
                <Image src={shieldIcon} alt="" width={22} height={22} />
              </div>

              {/* Title + body */}
              <h3 className="mt-6 text-[22px] font-bold text-white leading-[1.2]">{area.title}</h3>
              <p className="mt-3 text-[15px] text-white/70 leading-relaxed">{area.blurb}</p>
            </article>
          ))}
        </div>

        {/* Peach-bordered cream CTA panel */}
        <div className="mt-10 border-2 border-peach rounded-2xl p-6 bg-cream-100 flex flex-col md:flex-row items-center justify-between gap-5">
          <p className="text-[22px] font-bold text-navy text-center md:text-start">
            אני מלווה אותך בכל שאלה / בעיה
          </p>
          <a
            href="#contact"
            className="shrink-0 inline-flex items-center justify-center rounded-full bg-peach px-8 py-3 text-[18px] font-bold text-text-dark hover:bg-peach-600 transition-colors"
          >
            {site.hero.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
