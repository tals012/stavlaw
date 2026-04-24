import { site } from "@/content/site";
import { Script } from "@/components/ui/Script";

export function Process() {
  return (
    <section id="process" className="bg-cream-100 py-20">
      <div className="mx-auto max-w-6xl px-6">

        {/* Heading — right-aligned in RTL (default text-align: start = right) */}
        <div className="mb-16">
          <Script className="text-[clamp(2.5rem,4vw,60px)] leading-none block mb-2">
            The Process
          </Script>
          <h2 className="text-[clamp(2rem,3.5vw,55px)] font-bold text-navy leading-[1.22]">
            איך עובד ההליך?
          </h2>
        </div>

        {/* Vertical stepper — centered connector line */}
        <div className="relative">
          {/* Vertical dotted connector line */}
          <div className="absolute start-1/2 top-0 bottom-0 w-px -translate-x-1/2 border-s-2 border-dashed border-peach/40 hidden md:block" />

          <ol className="space-y-6">
            {site.process.map((step, idx) => {
              const isLeft = idx % 2 === 0; // alternating: even = card on left of connector
              return (
                <li key={step.n} className="relative flex items-center gap-0 md:gap-6">
                  {/* Step number bubble — centered on the line */}
                  <div className="hidden md:flex absolute start-1/2 -translate-x-1/2 z-10 items-center justify-center w-12 h-12 rounded-full bg-peach text-navy font-bold text-[16px] shadow-md">
                    {String(step.n).padStart(2, "0")}
                  </div>

                  {/* Card — alternates left/right on desktop. In RTL:
                      ms-auto me-0 → margin-right:auto, margin-left:0 → push LEFT
                      ms-0 me-auto → margin-right:0, margin-left:auto → push RIGHT */}
                  <div
                    className={`w-full md:w-[calc(50%-3rem)] bg-navy rounded-[20px] p-6 ${
                      isLeft ? "md:ms-auto md:me-0" : "md:ms-0 md:me-auto"
                    }`}
                  >
                    {/* Mobile number */}
                    <span className="md:hidden inline-block mb-2 text-peach font-bold text-[18px]">
                      {String(step.n).padStart(2, "0")}.
                    </span>
                    <h3 className="text-[22px] font-bold text-white leading-[1.2]">{step.title}</h3>
                    <p className="mt-2 text-[16px] text-white/75 leading-relaxed">{step.blurb}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
