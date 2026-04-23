import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { site } from "@/content/site";

export function FAQ() {
  return (
    <section id="faq" className="bg-[#f4f0eb] py-20">
      <div className="mx-auto max-w-5xl px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <p
            className="font-['Angelic_Bonques_Script',cursive,serif] text-[60px] text-[#222439] leading-[1.078] rotate-[-8.98deg] inline-block select-none mb-2"
            style={{ fontFamily: "'Angelic Bonques Script', cursive" }}
          >
            FAQ
          </p>
          <h2 className="text-[70px] font-bold text-[#222439] leading-[1.173]">
            שאלות נפוצות
          </h2>
        </div>

        {/* Accordion — navy rounded pills */}
        <Accordion className="space-y-4">
          {site.faq.map((item, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-2 border-[#222439] rounded-[200px] px-8 data-[state=open]:rounded-[30px] transition-all overflow-hidden"
            >
              <AccordionTrigger className="text-[25px] font-medium text-[#222439] text-end py-5 hover:no-underline [&>svg]:hidden">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-[18px] text-[#222439]/80 text-end pb-6">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* CTA below FAQ */}
        <div className="mt-20 text-center">
          <h3 className="text-[50px] font-bold text-[#222439] leading-[1.173]">
            לא עניתי לך על השאלה?
          </h3>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#e79c7d] border-2 border-[#e79c7d] px-8 py-4 text-[20px] font-bold text-[#222439] hover:bg-[#d4845f] hover:border-[#d4845f] transition-colors"
          >
            בואו נדבר
          </a>
        </div>
      </div>
    </section>
  );
}
