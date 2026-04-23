import { site } from "@/content/site";
import heroPortrait from "@/figma-assets/hero-portrait.jpg";
import Image from "next/image";

const stepColors = ["#222439", "#e79c7d", "#e79c7d", "#e79c7d", "#e79c7d"];

export function Process() {
  return (
    <section id="process" className="bg-[#f4f0eb] py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading row */}
        <div className="flex flex-col items-end gap-2 mb-16">
          <p
            className="font-['Angelic_Bonques_Script',cursive,serif] text-[60px] text-[#30303b] leading-[1.078] rotate-[-9.42deg] inline-block select-none self-center"
            style={{ fontFamily: "'Angelic Bonques Script', cursive" }}
          >
            The process
          </p>
          <h2 className="text-[55px] font-bold text-[#222439] leading-[1.22] text-end">
            איך עובד התהליך?
          </h2>
        </div>

        {/* Two-column: steps list + portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Steps */}
          <ol className="space-y-6">
            {site.process.map((step, idx) => (
              <li key={step.n} className="bg-[#222439] rounded-[20px] p-6 relative">
                {/* Step number in decorative script */}
                <div className="absolute -end-3 -top-5 text-[50px] leading-[1.078] font-normal select-none"
                  style={{
                    fontFamily: "'Beau Rivage', cursive",
                    color: stepColors[idx],
                  }}>
                  {String(step.n).padStart(2, "0")}
                </div>
                <h3 className="text-[35px] font-bold text-white leading-[1.173] mt-2 text-end">
                  {step.title}
                </h3>
                <p className="mt-2 text-[18px] text-white/80 leading-[1.37] text-end">
                  {step.blurb}
                </p>
              </li>
            ))}
          </ol>

          {/* Portrait */}
          <div className="relative rounded-[10px] overflow-hidden hidden lg:block" style={{ height: "652px" }}>
            <Image
              src={heroPortrait}
              alt={site.about.portraitAlt}
              fill
              sizes="50vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
