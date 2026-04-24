import { site } from "@/content/site";
import { Script } from "@/components/ui/Script";

export function KnowFirsthand() {
  return (
    <section className="bg-cream-100 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="bg-navy rounded-[22px] px-8 py-16 md:px-16 md:py-20 text-center">
          <Script className="text-[clamp(3rem,5vw,68px)] leading-none block mb-8">
            {site.about.scriptEyebrow ?? "I Know This Firsthand."}
          </Script>
          <p className="text-[clamp(1rem,1.2vw,20px)] leading-[1.7] text-cream-100/85 max-w-3xl mx-auto">
            {site.about.introParagraph ?? site.about.paragraphs[0]}
          </p>
        </div>
      </div>
    </section>
  );
}
