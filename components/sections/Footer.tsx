"use client";

import Image from "next/image";
import Link from "next/link";
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
          <span className="inline-flex items-center gap-x-2 flex-wrap">
            <Link href="/terms" className="hover:text-peach transition-colors">
              {dict.footer.termsLabel}
            </Link>
            <span className="text-cream-100/50">|</span>
            <Link href="/privacy" className="hover:text-peach transition-colors">
              {dict.footer.privacyLabel}
            </Link>
          </span>

          {/* Left (RTL source end): copyright + credits */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>{dict.footer.copyright}</span>
            <span className="text-cream-100/50">|</span>
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              {dict.footer.designedBy}
              <a
                href="https://lhdigital.co.il"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LH Digital"
                className="inline-flex items-center hover:opacity-80 transition-opacity"
              >
                <Image src="/credits/lh-logo.svg" alt="LH Digital" width={84} height={24} className="h-[18px] w-auto" />
              </a>
            </span>
            <span className="text-cream-100/50">|</span>
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              {dict.footer.builtBy}
              <a
                href="https://tls.codes"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TLS"
                className="inline-flex items-center hover:opacity-80 transition-opacity"
              >
                <Image src="/credits/tls-logo.svg" alt="TLS" width={22} height={22} className="h-[20px] w-auto" />
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
