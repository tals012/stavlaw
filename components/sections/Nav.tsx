"use client";

import Image from "next/image";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function Nav() {
  const { dict } = useLocale();

  const links = [
    { href: "#about", label: dict.nav.about, active: true },
    { href: "#practice-areas", label: dict.nav.practiceAreas },
    { href: "#process", label: dict.nav.process },
    { href: "#testimonials", label: dict.nav.testimonials },
    { href: "#why-me", label: dict.nav.whyMe },
    { href: "#faq", label: dict.nav.faq },
    { href: "#contact", label: dict.nav.contact },
  ];

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

        {/* Language switcher — visible on all breakpoints */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />

          {/* Logo — appears on the far RIGHT visually in RTL via order-first */}
          <Link href="/" aria-label="עמוד הבית" className="order-first flex items-center shrink-0">
            <Image
              src="/stav-logo.svg"
              alt="עו״ד סתיו אליהו שוקרון"
              width={140}
              height={104}
              priority
              className="block h-14 w-auto [filter:brightness(0)_invert(1)]"
            />
          </Link>
        </div>
      </nav>
    </header>
  );
}
