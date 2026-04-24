import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { site } from "@/content/site";
import { Script } from "@/components/ui/Script";
import Image from "next/image";
import faqOpen from "@/figma-assets/faq-open.svg";
import faqClosed from "@/figma-assets/faq-closed.svg";

export function FAQ() {
  return (
    <section id="faq" className="bg-cream-100 py-20">
      <div className="mx-auto max-w-4xl px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <Script className="text-[clamp(2.5rem,4vw,64px)] leading-none block mb-3">
            FAQ
          </Script>
          <h2 className="text-[clamp(2rem,3.5vw,60px)] font-bold text-navy leading-[1.173]">
            שאלות נפוצות
          </h2>
        </div>

        {/* Accordion */}
        <Accordion className="space-y-3">
          {site.faq.map((item, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-2 border-navy rounded-full px-8 py-1 data-[state=open]:rounded-[30px] transition-all overflow-hidden"
            >
              <AccordionTrigger className="text-[clamp(1rem,1.4vw,22px)] font-medium text-navy py-5 hover:no-underline [&>svg]:hidden flex items-center justify-between w-full gap-4">
                <span className="flex-1">{item.q}</span>
                {/* Custom toggle icons */}
                <span className="shrink-0 data-[state=open]:hidden">
                  <Image src={faqClosed} alt="" width={24} height={24} />
                </span>
                <span className="shrink-0 hidden data-[state=open]:block">
                  <Image src={faqOpen} alt="" width={24} height={24} />
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-[16px] text-navy/75 pb-5 leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-[clamp(1.5rem,2.5vw,42px)] font-bold text-navy leading-[1.173]">
            לא עניתי לך על השאלה?{" "}
            <a href="#contact" className="text-peach hover:underline">
              בואו נדבר
            </a>
          </h3>
        </div>
      </div>
    </section>
  );
}
