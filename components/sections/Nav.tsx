"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function Nav() {
  const { dict } = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "#about", label: dict.nav.about, active: true },
    { href: "#practice-areas", label: dict.nav.practiceAreas },
    { href: "#process", label: dict.nav.process },
    { href: "#testimonials", label: dict.nav.testimonials },
    { href: "#why-me", label: dict.nav.whyMe },
    { href: "#faq", label: dict.nav.faq },
    { href: "#contact", label: dict.nav.contact },
  ];

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const onNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href") ?? "";
    const id = href.replace(/^#/, "");
    const el = document.getElementById(id);
    document.body.style.overflow = "";
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
  };

  return (
    <header className="absolute start-0 end-0 top-0 z-50">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-8 pt-5 pb-4 md:pt-6">
        {/* Desktop links */}
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

        {/* Mobile hamburger - visible below lg, sits on the visual-start side (opposite of logo) */}
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label={dict.nav.about /* labelled via sr-only below */}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors"
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
          <span className="sr-only">תפריט</span>
        </button>

        {/* Language switcher + Logo */}
        <div className="flex items-center gap-2 md:gap-3">
          <LanguageSwitcher />
          <Link href="/" aria-label="עמוד הבית" className="order-first flex items-center shrink-0">
            <Image
              src="/stav-logo.svg"
              alt="עו״ד סתיו אליהו שוקרון"
              width={140}
              height={104}
              priority
              className="block h-12 md:h-14 w-auto [filter:brightness(0)_invert(1)]"
            />
          </Link>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => {
              document.body.style.overflow = "";
              setMobileOpen(false);
            }}
            aria-hidden="true"
          />
        )}
        {mobileOpen && (
          <motion.div
            key="mobile-nav-panel"
            id="mobile-nav"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-0 z-50 bg-navy border-b border-white/10 shadow-2xl lg:hidden"
            role="dialog"
            aria-modal="true"
          >
              <div className="flex items-center justify-between px-6 pt-5 pb-4">
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="סגור תפריט"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors"
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
                <Image
                  src="/stav-logo.svg"
                  alt="עו״ד סתיו אליהו שוקרון"
                  width={140}
                  height={104}
                  className="h-12 w-auto [filter:brightness(0)_invert(1)]"
                />
              </div>

              <ul className="px-2 pb-4">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.25 }}
                  >
                    <a
                      href={l.href}
                      onClick={onNavLinkClick}
                      className="block px-5 py-4 text-[18px] font-medium text-white hover:bg-white/5 rounded-xl transition-colors"
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="px-6 pb-6">
                <a
                  href="#contact"
                  onClick={onNavLinkClick}
                  className="block w-full text-center rounded-full bg-peach px-6 py-3.5 text-[16px] font-bold text-navy hover:bg-peach-600 transition-colors"
                >
                  {dict.hero.ctaLabel}
                </a>
              </div>
            </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
