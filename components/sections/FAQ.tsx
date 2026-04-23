import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { site } from "@/content/site";

export function FAQ() {
  return (
    <section id="faq" className="bg-navy py-20 text-cream-100">
      <div className="mx-auto max-w-3xl px-5">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-peach">שאלות נפוצות</span>
          <h2 className="mt-2 text-3xl font-black md:text-4xl">שאלות נפוצות</h2>
        </div>
        <Accordion className="mt-10">
          {site.faq.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-cream-100/20">
              <AccordionTrigger className="text-start text-lg">{item.q}</AccordionTrigger>
              <AccordionContent className="text-cream-100/80">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
