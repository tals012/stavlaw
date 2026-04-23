import { site } from "@/content/site";

export function LawyerSpotlight() {
  return (
    <section id="spotlight" className="bg-[#f4f0eb] py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section heading */}
        <div className="flex flex-col items-end gap-2 mb-16">
          <p
            className="font-['Angelic_Bonques_Script',cursive,serif] text-[60px] text-[#222439] leading-[1.078] rotate-[-8.98deg] inline-block select-none self-center"
            style={{ fontFamily: "'Angelic Bonques Script', cursive" }}
          >
            Why me
          </p>
          <h2 className="text-[70px] font-bold text-[#222439] leading-[1.173] text-end">
            למה אני?
          </h2>
          <p className="text-[22px] text-[#222439] leading-relaxed text-end max-w-xl">
            לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית נולום ארווס סאפיאן.
          </p>
        </div>

        {/* Two dark cards side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Card 1 */}
          <div className="bg-[#222439] rounded-[20px] p-8">
            <span className="text-[#e79c7d] text-[36px] select-none" style={{ fontFamily: "'Beau Rivage', cursive" }}>01</span>
            <h3 className="text-[35px] font-bold text-white leading-[1.173] mt-2 text-end">
              הניסיון של המשרדים הגדולים – בשירות האישי שלך
            </h3>
            <p className="mt-4 text-[20px] text-white/80 leading-[1.5] text-end">
              אחרי 5 שנים שבהן ניהלתי תיקים מורכבים במשרדים המובילים בארץ, אני מכירה את עולם דיני העבודה מבפנים. אני מביאה איתי את הידע האסטרטגי והסטנדרטים הגבוהים ביותר, אבל בלי הריחוק והבירוקרטיה של משרד גדול.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#222439] rounded-[20px] p-8">
            <span className="text-[#e79c7d] text-[36px] select-none" style={{ fontFamily: "'Beau Rivage', cursive" }}>02</span>
            <h3 className="text-[35px] font-bold text-white leading-[1.173] mt-2 text-end">
              אסטרטגיה של 360 מעלות
            </h3>
            <p className="mt-4 text-[20px] text-white/80 leading-[1.5] text-end">
              ניהלתי תיקים עבור מעסיקים ועבור עובדים כאחד. הניסיון הזה מאפשר לי &apos;לקרוא את המפה&apos; מראש, לצפות את המהלכים של המעסיק שלך ולבנות אסטרטגיה שתנטרל את ההגנות שלו עוד לפני שהן הועלו.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-[#e79c7d] border-2 border-[#e79c7d] px-8 py-4 text-[20px] font-bold text-[#30303b] hover:bg-[#d4845f] hover:border-[#d4845f] transition-colors"
          >
            {site.spotlight.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
