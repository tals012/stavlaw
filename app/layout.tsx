import type { Metadata } from "next";
import localFont from "next/font/local";
import { Heebo, Allura, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAnalytics } from "@/lib/analytics";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import { AccessibilityWidget } from "@/components/ui/AccessibilityWidget";
import { CookieBanner } from "@/components/ui/CookieBanner";
import "./globals.css";

// Google Sans - self-hosted from /fonts/google-sans (proprietary, user-supplied)
const googleSans = localFont({
  src: [
    { path: "../fonts/google-sans/GoogleSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/google-sans/GoogleSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/google-sans/GoogleSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/google-sans/GoogleSans-Bold.ttf", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-google-sans",
});

// Angelic Bonques Script - decorative cursive for English section headers
const angelic = localFont({
  src: [
    { path: "../fonts/angelic/AngelicBonquesScript.ttf", weight: "400", style: "normal" },
  ],
  display: "swap",
  variable: "--font-angelic",
});

// Heebo retained as Hebrew fallback (Google Sans static files don't include Hebrew glyphs)
const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  variable: "--font-heebo",
});

const allura = Allura({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-allura",
});

// Playfair Display - elegant serif for numerals in the Process stepper
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${googleSans.variable} ${angelic.variable} ${heebo.variable} ${allura.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <LocaleProvider>
          {children}
          <AccessibilityWidget />
          <CookieBanner />
          <Toaster richColors position="top-center" dir="rtl" />
        </LocaleProvider>
        <GoogleAnalytics />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
