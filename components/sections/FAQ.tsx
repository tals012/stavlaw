"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Script } from "@/components/ui/Script";
import Image from "next/image";
import faqOpen from "@/figma-assets/faq-open.svg";
import faqClosed from "@/figma-assets/faq-closed.svg";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function FAQ() {
  const { dict, meta } = useLocale();
  const f = dict.faq;

  return (
    <section id="faq" className="bg-cream-100 py-20">
      <div className="mx-auto max-w-6xl px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <Script className="text-[clamp(2.5rem,4vw,64px)] leading-none block mb-3">
            {f.eyebrow}
          </Script>
          <h2 className="text-[clamp(2rem,3.5vw,60px)] font-bold text-navy leading-[1.173]">
            {f.heading}
          </h2>
        </div>

        {/* Accordion */}
        <Accordion className="space-y-3">
          {f.items.map((item, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-2 border-navy rounded-2xl px-8 py-1 transition-all overflow-hidden"
            >
              <AccordionTrigger dir={meta.dir} className="text-[clamp(1rem,1.4vw,22px)] font-medium text-navy py-5 hover:no-underline [&_svg[data-slot=accordion-trigger-icon]]:hidden flex items-center justify-between w-full gap-4 text-start group-[data-state=open]/accordion-trigger:border-b">
                <span className="flex-1 text-start">{item.q}</span>
                {/* Custom toggle icons */}
                <span className="shrink-0 data-[state=open]:hidden">
                  <Image src={faqClosed} alt="" width={24} height={24} />
                </span>
                <span className="shrink-0 hidden data-[state=open]:block">
                  <Image src={faqOpen} alt="" width={24} height={24} />
                </span>
              </AccordionTrigger>
              <AccordionContent dir={meta.dir} className="text-[16px] text-navy/75 pb-5 pt-4 leading-relaxed text-start border-t border-navy/15">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-[clamp(1.5rem,2.5vw,42px)] font-bold text-navy leading-[1.173]">
            {f.bottomPrompt}{" "}
            <a href="#contact" className="text-peach hover:underline">
              {f.bottomCta}
            </a>
          </h3>
        </div>
      </div>
    </section>
  );
}
