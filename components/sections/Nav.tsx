"use client";

import Link from "next/link";
import { site } from "@/content/site";

const links = [
  { href: "#about", label: "קצת עלי" },
  { href: "#practice-areas", label: "מעטפת משפטית" },
  { href: "#process", label: "איך עובד התהליך?" },
  { href: "#spotlight", label: "למה אני?" },
  { href: "#testimonials", label: "דוגמאות מהעולם האמיתי" },
  { href: "#faq", label: "שאלות נפוצות" },
  { href: "#contact", label: "יצירת קשר" },
];

export function Nav() {
  return (
    <header className="fixed start-0 end-0 top-0 z-50 h-[84px] backdrop-blur-md bg-[#222439]/90">
      <nav className="mx-auto flex max-w-[1920px] h-full items-center justify-between px-16">
        {/* Nav links — start side in RTL = left */}
        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[18px] text-white hover:text-[#e79c7d] transition-colors whitespace-nowrap"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Logo wordmark — end side in RTL = right */}
        <Link href="/" aria-label={site.brand.name} className="flex items-end gap-3 shrink-0">
          <div className="text-end">
            <div className="text-[12px] font-bold text-white leading-tight">
              <div>stav</div>
              <div>eliyahu</div>
              <div>shukrun</div>
            </div>
            <div className="text-[10px] text-white tracking-[2px] uppercase mt-0.5">Lawyer</div>
          </div>
        </Link>
      </nav>
    </header>
  );
}
