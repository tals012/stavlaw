import Image from "next/image";
import { site } from "@/content/site";
import shieldIcon from "@/figma-assets/shield-icon.svg";
import heroPortrait from "@/figma-assets/hero-portrait.jpg";

// All 6 cards use the same stock image for now (the Figma uses imgRectangle164 for all)
const cardImage = heroPortrait;

export function PracticeAreas() {
  return (
    <section id="practice-areas" className="bg-[#222439] py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section heading */}
        <div className="text-center mb-14">
          <p className="font-['Angelic_Bonques_Script',cursive,serif] text-[60px] text-[#e79c7d] leading-[1.078] rotate-[-3.49deg] inline-block select-none mb-2"
            style={{ fontFamily: "'Angelic Bonques Script', cursive" }}>
            Legal assistance
          </p>
          <h2 className="text-[53px] font-bold text-white leading-[1.116]">
            מעטפת ליווי משפטית לשכירים
          </h2>
          <p className="mt-3 text-[20px] text-white/80 max-w-2xl mx-auto">
            ייצוג מקצועי ואישי בכל שלבי ההליך המשפטי מול המעסיק
          </p>
        </div>

        {/* 2-column × 3-row grid of cards */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {site.practiceAreas.map((area) => (
            <article
              key={area.slug}
              className="bg-[#2b2e47] rounded-[20px] overflow-hidden relative group hover:-translate-y-1 transition-transform"
            >
              {/* Card image */}
              <div className="relative h-[260px] overflow-hidden rounded-[10px] mx-4 mt-4" >
                <Image
                  src={cardImage}
                  alt={area.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Shield icon badge */}
              <div className="absolute top-6 end-6 w-[47px] h-[47px] border border-[#e79c7d] rounded-[10px] flex items-center justify-center bg-[#2b2e47]">
                <Image src={shieldIcon} alt="" width={20} height={20} />
              </div>

              {/* Text */}
              <div className="px-5 pb-6 pt-2">
                <h3 className="text-[30px] font-bold text-white leading-[1.116]">{area.title}</h3>
                <p className="mt-2 text-[16px] text-white/80 leading-relaxed">{area.blurb}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
