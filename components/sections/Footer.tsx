"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";

export function Footer() {
  const { dict } = useLocale();

  return (
    <footer className="bg-[#1a1c2d] py-4">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-cream-100/80 text-[14px]">
          {/* Right (RTL source start): brand */}
          <span className="font-medium">{dict.brand.name}</span>

          {/* Center: legal links */}
          <span>{dict.footer.legal}</span>

          {/* Left (RTL source end): copyright + attribution */}
          <div className="flex items-center gap-4">
            <span>{dict.footer.copyright}</span>
            <span className="text-cream-100/50">|</span>
            <span>{dict.footer.attribution}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
