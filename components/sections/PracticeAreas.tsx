import Image from "next/image";
import { site } from "@/content/site";
import laborImg from "@/figma-assets/area-labor.jpg";
import civilImg from "@/figma-assets/area-civil.jpg";
import realEstateImg from "@/figma-assets/area-real-estate.jpg";
import executionImg from "@/figma-assets/area-execution.jpg";
import trafficImg from "@/figma-assets/area-traffic.jpg";
import corporateImg from "@/figma-assets/area-corporate.jpg";

const imgMap = {
  labor: laborImg,
  civil: civilImg,
  "real-estate": realEstateImg,
  execution: executionImg,
  traffic: trafficImg,
  corporate: corporateImg,
} as const;

export function PracticeAreas() {
  return (
    <section id="practice-areas" className="bg-navy py-20 text-cream-100">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-peach">תחומי התמחות</span>
          <h2 className="mt-2 text-3xl font-black md:text-4xl">מגוון רחב של שירותים משפטיים</h2>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {site.practiceAreas.map((area) => (
            <li key={area.slug}>
              <article className="group h-full overflow-hidden rounded-2xl bg-cream-100/5 backdrop-blur transition-transform hover:-translate-y-1 hover:bg-cream-100/10">
                <Image
                  src={imgMap[area.slug]}
                  alt={area.imageAlt}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-bold">{area.title}</h3>
                  <p className="mt-2 text-sm text-cream-100/70">{area.blurb}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
