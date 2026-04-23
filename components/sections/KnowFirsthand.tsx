import { site } from "@/content/site";
import { Script } from "@/components/ui/Script";

export function KnowFirsthand() {
  return (
    <section className="bg-navy py-20">
      <div className="mx-auto max-w-2xl px-5 text-center">
        <Script className="text-[clamp(3rem,5vw,68px)] leading-none block mb-6">
          {site.about.scriptEyebrow ?? "I Know This Firsthand."}
        </Script>
        <p className="text-[clamp(1rem,1.2vw,20px)] leading-relaxed text-cream-100/85">
          {site.about.introParagraph ?? site.about.paragraphs[0]}
        </p>
      </div>
    </section>
  );
}
