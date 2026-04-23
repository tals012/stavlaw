import Image from "next/image";
import { site } from "@/content/site";
import lawyerPhoto from "@/figma-assets/lawyer-photo.jpg";

export function AboutBrief() {
  return (
    <>
      {/* Navy strip with script quotes */}
      <div id="about" className="relative bg-[#222439] py-24 overflow-hidden">
        {/* Background width override — full bleed */}
        <div className="mx-auto max-w-6xl px-6 flex flex-col items-center gap-4">
          <p className="font-['Angelic_Bonques_Script',cursive,serif] text-[68px] text-[#e79c7d] leading-[1.078] rotate-[-3.27deg] whitespace-nowrap text-center select-none"
            style={{ fontFamily: "'Angelic Bonques Script', cursive" }}>
            I know this firsthand.
          </p>
          <p className="font-['Angelic_Bonques_Script',cursive,serif] text-[65px] text-white leading-[1.078] rotate-[-3.67deg] whitespace-nowrap text-center select-none mt-4"
            style={{ fontFamily: "'Angelic Bonques Script', cursive" }}>
            You are not alone.
          </p>
        </div>
      </div>

      {/* About section — portrait left + bio right */}
      <section className="bg-[#f4f0eb] py-20">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-6 md:grid-cols-[1fr_1.1fr]">
          {/* Portrait with overlay */}
          <div className="relative rounded-[20px] overflow-hidden shadow-xl" style={{ minHeight: "600px" }}>
            <Image
              src={lawyerPhoto}
              alt={site.about.portraitAlt}
              fill
              sizes="(max-width: 768px) 100vw, 44vw"
              className="object-cover object-top"
            />
            {/* Subtle overlay for the WhatsApp-style cutout */}
            <div className="absolute inset-0 bg-[rgba(48,48,59,0.05)] rounded-[20px]" />
          </div>

          {/* Bio */}
          <div className="py-4">
            <p className="text-[30px] text-[#222439] leading-[1.116]">נעים מאוד,</p>
            <h2 className="text-[40px] font-bold text-[#222439] leading-[1.116] mt-1">
              עו&quot;ד סתיו אליהו שוקרון
            </h2>
            <div className="mt-6 space-y-4">
              {site.about.paragraphs.map((p, i) => (
                <p key={i} className="text-[18px] text-[#222439] leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
