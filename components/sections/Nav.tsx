"use client";

import Image from "next/image";
import Link from "next/link";
import navLogoMark from "@/figma-assets/nav-logo-mark.svg";

const links = [
  { href: "#about", label: "קצת עלי", active: true },
  { href: "#practice-areas", label: "מעטפת משפטית" },
  { href: "#process", label: "איך עובד התהליך?" },
  { href: "#testimonials", label: "דוגמאות מהעולם האמיתי" },
  { href: "#why-me", label: "למה אני?" },
  { href: "#faq", label: "שאלות נפוצות" },
  { href: "#contact", label: "יצירת קשר" },
];

export function Nav() {
  return (
    <header className="absolute start-0 end-0 top-0 z-50">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-8 pt-6 pb-4">
        {/* Links — FIRST in DOM → visual RIGHT in RTL; the ul itself flows RTL so first <li> is rightmost */}
        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`text-[15px] text-white hover:text-peach transition-colors whitespace-nowrap ${
                  l.active ? "underline decoration-peach decoration-2 underline-offset-[8px]" : ""
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Logo + brand — SECOND in DOM → visual LEFT in RTL. But we want it on the far RIGHT visually,
            which in RTL means it must come FIRST in DOM. Fix by using flex-row-reverse OR swapping order. */}
        <Link href="/" aria-label="עמוד הבית" className="order-first flex items-center gap-3 shrink-0">
          <Image
            src={navLogoMark}
            alt="SE logo"
            width={52}
            height={52}
            className="block"
          />
          <div className="hidden sm:block leading-[1.1] text-white text-[10px] tracking-wide">
            <div>stav</div>
            <div>eliyahu</div>
            <div>shukran</div>
            <div className="text-peach mt-0.5">Lawyer</div>
          </div>
        </Link>
      </nav>
    </header>
  );
}
