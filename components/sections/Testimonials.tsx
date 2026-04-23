"use client";

import Image from "next/image";
import { site } from "@/content/site";
import caseStudy from "@/figma-assets/case-study.jpg";

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#222439] py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section heading */}
        <div className="text-center mb-14">
          <p
            className="font-['Angelic_Bonques_Script',cursive,serif] text-[60px] text-[#e79c7d] leading-[1.078] rotate-[-2.2deg] inline-block select-none mb-2"
            style={{ fontFamily: "'Angelic Bonques Script', cursive" }}
          >
            From the real world
          </p>
          <h2 className="text-[68px] font-bold text-[#f4f0eb] leading-[1.22]">
            דוגמאות מהעולם האמיתי
          </h2>
        </div>

        {/* Case study card */}
        <div className="bg-[#2b2e47] rounded-[30px] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-0">
            {/* Case image */}
            <div className="relative min-h-[400px] lg:min-h-[600px] p-4">
              <div className="relative w-full h-full min-h-[380px] rounded-[15px] overflow-hidden">
                <Image
                  src={caseStudy}
                  alt="דוגמה מהעולם האמיתי"
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Case text */}
            <div className="p-10 flex flex-col gap-6">
              <div>
                <p className="text-[#e79c7d] text-[25px] font-bold">א. |</p>
                <p className="text-[#e79c7d] text-[25px] font-bold -mt-1">נפצע במקום העבודה ופוטר שלא כדין</p>
              </div>

              <div className="w-full h-px bg-white/20" />

              <p className="text-white text-[20px] leading-[1.371] text-end">
                {site.testimonials[0]?.quote}
              </p>

              <div>
                <p className="text-white text-[20px] font-bold text-end mt-4">התוצאה המשפטית:</p>
                <ul className="mt-2 space-y-2 text-end">
                  {["קבלת פיצויים מלאים בגין פיטורים שלא כדין", "פיצוי בגין פגיעה בעבודה", "השלמת זכויות סוציאליות לכל שנות העסקה"].map((item, i) => (
                    <li key={i} className="flex items-center justify-end gap-2 text-white text-[16px]">
                      <span>{item}</span>
                      <span className="w-[7px] h-[7px] rounded-full bg-[#e79c7d] shrink-0" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Additional testimonial quotes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {site.testimonials.slice(1).map((t: { quote: string; author: string; caseType: string }, i: number) => (
            <div key={i} className="bg-[#2b2e47] rounded-[20px] p-8">
              <p className="text-white text-[20px] leading-relaxed text-end">״{t.quote}״</p>
              <footer className="mt-6 text-end text-[#e79c7d] font-bold">{t.author} · {t.caseType}</footer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
