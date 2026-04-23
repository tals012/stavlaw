import Image from "next/image";
import { site } from "@/content/site";
import heroPortrait from "@/figma-assets/hero-portrait.jpg";

export function Hero() {
  return (
    <section className="relative bg-[#222439] min-h-[1080px] overflow-hidden">
      {/* Person photo — left side */}
      <div className="absolute start-0 top-0 h-full w-[47%] min-h-[860px]">
        <Image
          src={heroPortrait}
          alt={site.about.portraitAlt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 47vw"
          className="object-cover object-top rounded-[23px] ms-8 mt-[125px]"
          style={{ borderRadius: "23px" }}
        />
      </div>

      {/* Floating chips on the photo */}
      <div className="absolute start-[31%] top-[288px] bg-[#222439] rounded-[30px] shadow-[8px_8px_24px_rgba(0,0,0,0.25)] px-5 py-3 hidden lg:flex items-center gap-2">
        <span className="w-[7px] h-[7px] rounded-full bg-[#e79c7d] shrink-0" />
        <span className="text-[#e79c7d] text-[19px] whitespace-nowrap">ייצוג בבית הדין לעבודה</span>
      </div>
      <div className="absolute start-[28%] top-[810px] bg-[#222439] rounded-[30px] shadow-[8px_8px_24px_rgba(0,0,0,0.25)] px-5 py-3 hidden lg:flex items-center gap-2">
        <span className="w-[7px] h-[7px] rounded-full bg-[#e79c7d] shrink-0" />
        <span className="text-[#e79c7d] text-[19px] whitespace-nowrap">ייצוג בעת שימוע לפני פיטורין</span>
      </div>
      <div className="absolute start-[8%] top-[690px] bg-[#222439] rounded-[30px] px-5 py-3 hidden lg:flex items-center gap-2">
        <span className="w-[7px] h-[7px] rounded-full bg-[#e79c7d] shrink-0" />
        <span className="text-[#e79c7d] text-[19px] whitespace-nowrap">מיצוי הזכויות שלך</span>
      </div>

      {/* Peach underline accent */}
      <div className="absolute end-[310px] top-[490px] h-[7px] w-[257px] bg-[#e79c7d] hidden lg:block" />

      {/* Hero text — right side */}
      <div className="relative z-10 flex flex-col items-end justify-center min-h-[1080px] pe-8 ps-4 lg:pe-24 pt-24 pb-20 lg:ms-[46%]">
        {/* Main headline */}
        <h1 className="text-end text-white font-black leading-[1.19]" style={{ fontSize: "clamp(2rem, 4.5vw, 65px)", maxWidth: "700px" }}>
          <span>הזכויות שלך בעבודה הן לא המלצה </span>
          <br />
          <span className="text-white">הן חובה!</span>
        </h1>

        {/* Sub */}
        <p className="mt-6 text-end text-white/90 leading-relaxed" style={{ fontSize: "clamp(1rem, 1.4vw, 22px)", maxWidth: "680px" }}>
          פיטרו אותך ללא שימוע? המעסיק מתעלם מהזכויות שלך, לא משולם פנסיה או שעות נוספות?
        </p>
        <p className="mt-2 text-end text-white font-bold leading-relaxed" style={{ fontSize: "clamp(1rem, 1.4vw, 22px)", maxWidth: "680px" }}>
          בדיוק בשביל זה אני כאן. אני אדאג שתקבל את כל הפיצויים והזכויות שלך מהמעסיק, בנחישות ובלי פשרות
        </p>

        {/* CTA */}
        <a
          href="#contact"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-[#e79c7d] border-2 border-[#e79c7d] px-8 py-4 text-[20px] font-bold text-[#30303b] hover:bg-[#d4845f] hover:border-[#d4845f] transition-colors"
        >
          {site.hero.ctaLabel}
        </a>

        {/* Phone */}
        <a
          href={`tel:${site.contact.phoneIntl}`}
          className="mt-4 text-[#e79c7d] text-lg hover:underline"
        >
          <bdi>{site.contact.phoneDisplay}</bdi>
        </a>
      </div>
    </section>
  );
}
