"use client";

import Image from "next/image";
import navLogoMark from "@/figma-assets/nav-logo-mark.svg";

const links = [
  { href: "#about", label: "קצת עלי" },
  { href: "#practice-areas", label: "מעטפת משפטית" },
  { href: "#process", label: "איך עובד התהליך?" },
  { href: "#spotlight", label: "למה אני?" },
  { href: "#testimonials", label: "דוגמאות" },
  { href: "#faq", label: "שאלות נפוצות" },
];

export function Nav() {
  return (
    <header className="fixed start-0 end-0 top-0 z-50 h-[84px] bg-cream-100/90 backdrop-blur-sm border-b border-cream-200">
      <nav className="mx-auto flex max-w-[1280px] h-full items-center justify-between px-6 lg:px-10">

        {/* LEFT side (RTL: start) — CTA button */}
        <a
          href="#contact"
          className="shrink-0 rounded-full bg-peach border-2 border-peach px-5 py-2 text-[15px] font-bold text-text-dark hover:bg-peach-600 hover:border-peach-600 transition-colors"
        >
          צור קשר
        </a>

        {/* CENTER — nav links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[15px] text-navy hover:text-peach transition-colors whitespace-nowrap font-medium"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* RIGHT side (RTL: end) — logo mark */}
        <a href="/" aria-label="עמוד הבית" className="shrink-0">
          <Image
            src={navLogoMark}
            alt="SE logo"
            width={52}
            height={52}
            className="block"
          />
        </a>
      </nav>
    </header>
  );
}
