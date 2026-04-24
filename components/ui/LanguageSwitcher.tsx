"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, Check } from "lucide-react";
import { LOCALES, type LocaleCode } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function LanguageSwitcher() {
  const { locale, setLocale, dict } = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onPick = (code: LocaleCode) => {
    setLocale(code);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label={dict.languageSwitcher.label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 text-white/90 hover:text-peach transition-colors px-2 py-1.5 rounded-full"
      >
        <Globe className="w-5 h-5" />
        <span className="text-[13px] font-medium uppercase tracking-wide">{locale}</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute end-0 mt-2 min-w-[180px] rounded-2xl bg-navy-mid border border-white/10 shadow-xl overflow-hidden z-50"
        >
          {LOCALES.map((l) => {
            const active = l.code === locale;
            return (
              <button
                key={l.code}
                role="menuitemradio"
                aria-checked={active}
                onClick={() => onPick(l.code)}
                dir={l.dir}
                className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-[14px] text-start transition-colors ${
                  active ? "bg-peach/10 text-peach" : "text-white/85 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{l.nativeName}</span>
                {active && <Check className="w-4 h-4 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
