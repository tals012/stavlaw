import { site } from "@/content/site";
import { Script } from "@/components/ui/Script";

export function WhyMe() {
  const whyMe = site.whyMe;
  if (!whyMe) return null;

  return (
    <section className="bg-cream-100 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* RIGHT column — decorative header + body copy (FIRST in DOM → visual right in RTL) */}
          <div>
            <Script className="text-[clamp(2.5rem,4vw,60px)] leading-none block mb-3">
              Why Me?
            </Script>
            <h2 className="text-[clamp(2rem,3.5vw,55px)] font-bold text-navy leading-[1.173]">
              {whyMe.heading}
            </h2>
            <div className="mt-5 space-y-4">
              {whyMe.paragraphs.map((p, i) => (
                <p key={i} className="text-[18px] text-navy/80 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* LEFT column — two navy cards stacked (SECOND in DOM → visual left in RTL) */}
          <div className="space-y-6">
            {whyMe.cards.map((card) => (
              <div key={card.n} className="bg-navy rounded-[20px] p-8">
                <span
                  className="text-peach text-[clamp(1.5rem,2vw,36px)] select-none font-[family-name:var(--font-angelic)]"
                >
                  {card.n}
                </span>
                <h3 className="text-[clamp(1.2rem,1.8vw,26px)] font-bold text-white leading-[1.173] mt-2">
                  {card.title}
                </h3>
                <p className="mt-3 text-[17px] text-white/80 leading-[1.5]">
                  {card.body}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
