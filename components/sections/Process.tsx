import { site } from "@/content/site";

export function Process() {
  return (
    <section id="process" className="bg-cream-100 py-20">
      <div className="mx-auto max-w-4xl px-5">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-peach-600">התהליך</span>
          <h2 className="mt-2 text-3xl font-black text-navy-ink md:text-4xl">איך עובד התהליך</h2>
        </div>
        <ol className="mt-12 relative space-y-8 ps-10 before:absolute before:inset-y-0 before:start-4 before:w-px before:bg-navy/20">
          {site.process.map((step) => (
            <li key={step.n} className="relative">
              <span className="absolute start-[-1.75rem] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-peach text-sm font-bold text-white ring-4 ring-cream-100">
                {step.n}
              </span>
              <h3 className="text-xl font-bold text-navy-ink">{step.title}</h3>
              <p className="mt-1 text-navy-ink/75">{step.blurb}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
