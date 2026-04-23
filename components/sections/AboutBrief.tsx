import Image from "next/image";
import { site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import aboutImg from "@/figma-assets/about.jpg";

export function AboutBrief() {
  return (
    <section id="about" className="bg-cream-100 py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <Image
            src={aboutImg}
            alt={site.about.portraitAlt}
            sizes="(max-width: 768px) 100vw, 40vw"
            className="rounded-2xl shadow-lg"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-peach-600">אודות</span>
            <h2 className="mt-2 text-3xl font-black text-navy-ink md:text-4xl">{site.brand.name}</h2>
            {site.about.paragraphs.map((p, i) => (
              <p key={i} className="mt-4 text-lg leading-relaxed text-navy-ink/80">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
