import type { Metadata } from "next";
import localFont from "next/font/local";
import { Heebo, Allura } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAnalytics } from "@/lib/analytics";
import "./globals.css";

// Google Sans — self-hosted from /fonts/google-sans (proprietary, user-supplied)
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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${googleSans.variable} ${heebo.variable} ${allura.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster richColors position="top-center" dir="rtl" />
        <GoogleAnalytics />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
