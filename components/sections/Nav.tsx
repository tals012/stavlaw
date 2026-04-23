"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const links = [
  { href: "#practice-areas", label: "תחומי התמחות" },
  { href: "#process", label: "איך עובדים" },
  { href: "#testimonials", label: "לקוחות ממליצים" },
  { href: "#faq", label: "שאלות נפוצות" },
  { href: "#contact", label: "צור קשר" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed start-0 end-0 top-0 z-50 transition-colors",
        scrolled ? "bg-cream-100/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" aria-label={site.brand.name} className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-cream-100 text-sm font-bold">
            {site.brand.initials}
          </span>
          <span className="text-sm font-bold text-navy-ink">{site.brand.name}</span>
        </Link>
        <ul className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm text-navy-ink hover:text-peach transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="rounded-full bg-peach px-5 py-2 text-sm font-semibold text-white hover:bg-peach-600 transition-colors"
        >
          לקבלת ייעוץ
        </a>
      </nav>
    </header>
  );
}
