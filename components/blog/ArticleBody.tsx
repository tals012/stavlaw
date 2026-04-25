import type { Block, FaqItem } from "@/content/blog/types";

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5 text-[17px] text-navy/85 leading-[1.85]">
      {blocks.map((block, i) => renderBlock(block, i))}
    </div>
  );
}

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          key={i}
          id={block.id}
          className="!mt-12 text-[26px] md:text-[30px] font-bold text-navy leading-[1.25] scroll-mt-24"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={i}
          id={block.id}
          className="!mt-8 text-[20px] md:text-[22px] font-bold text-navy leading-[1.3] scroll-mt-24"
        >
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p key={i} className="text-navy/85">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul key={i} className="list-disc ps-6 space-y-2 text-navy/85 marker:text-peach">
          {block.items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={i} className="list-decimal ps-6 space-y-2 text-navy/85 marker:text-peach marker:font-bold">
          {block.items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ol>
      );
    case "callout":
      return <Callout key={i} tone={block.tone} text={block.text} />;
    case "quote":
      return (
        <blockquote key={i} className="border-s-4 border-peach/60 ps-5 py-2 text-navy/80 italic">
          {block.text}
          {block.cite && <cite className="block mt-1 text-[14px] not-italic text-navy/55">— {block.cite}</cite>}
        </blockquote>
      );
    case "faq":
      return <FaqList key={i} items={block.items} />;
  }
}

function Callout({ tone, text }: { tone: "info" | "warning" | "tip"; text: string }) {
  const palette = {
    info: { bg: "bg-navy/[0.04]", border: "border-navy/20", label: "💡 לידיעתך" },
    warning: { bg: "bg-[#fff4ec]", border: "border-peach/45", label: "⚠ שים לב" },
    tip: { bg: "bg-peach/[0.08]", border: "border-peach/45", label: "✓ טיפ" },
  }[tone];
  return (
    <aside
      role="note"
      className={`${palette.bg} ${palette.border} border rounded-[14px] p-5`}
    >
      <p className="text-[13px] font-bold text-peach uppercase tracking-wide mb-1.5">
        {palette.label}
      </p>
      <p className="text-navy/85">{text}</p>
    </aside>
  );
}

function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <section className="!mt-10 rounded-[20px] border border-navy/10 bg-cream-50 p-6 md:p-7" aria-label="שאלות נפוצות">
      <h2 className="text-[22px] md:text-[26px] font-bold text-navy mb-5">
        שאלות נפוצות
      </h2>
      <dl className="space-y-5">
        {items.map((item, i) => (
          <div key={i}>
            <dt className="text-[17px] font-bold text-navy">{item.q}</dt>
            <dd className="mt-1.5 text-navy/80">{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
