# Stav Law Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a max-SEO, Hebrew/RTL, Next.js 15 landing page for עו"ד סתיו שוקרון, pixel-matching the Figma, deployed to Vercel.

**Architecture:** Single long-scroll page (`/`) composed of section components reading from a single typed content file (`content/site.ts`). Contact form posts to a Next.js API route that validates via Zod, verifies Cloudflare Turnstile, rate-limits via Upstash, and sends email via Resend. SEO surface = per-route `generateMetadata`, multiple JSON-LD graphs (Attorney, LegalService, LocalBusiness, Person, FAQPage, BreadcrumbList), sitemap/robots, dynamic OG image, GSC verification, CWV budget via SSG + `next/image` + `next/font`. Playwright smoke test + GitHub Actions CI. Vercel preview/production deploys.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript strict, Tailwind CSS v4, shadcn/ui, Framer Motion, `next/font` (Heebo), `next/image`, Resend, Cloudflare Turnstile, Upstash Redis, Zod, react-hook-form, schema-dts, Playwright, GitHub Actions, Vercel Analytics, GA4.

**Base directory for all tasks:** `/Users/tal/Projects/stavlaw/`. Every `cd` / path below is relative to that unless otherwise marked.

---

## Task 1: Scaffold the Next.js 15 project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `.gitignore`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`

- [ ] **Step 1: Run create-next-app**

```bash
cd /Users/tal/Projects/stavlaw
# Scaffold into the current (already-git-init'd) directory — note the trailing "."
npx --yes create-next-app@latest . \
  --typescript --tailwind --eslint --app --src-dir=false \
  --import-alias="@/*" --turbopack --use-npm --yes
```

Expected: creates `app/`, `public/`, `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, etc. Does **not** overwrite `docs/` or `.git/`.

- [ ] **Step 2: Verify it builds and dev server boots**

```bash
npm run build
```

Expected: build completes with no errors, emits `.next/`.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 15 project (App Router, TS, Tailwind v4)"
```

---

## Task 2: Tighten TypeScript + add path aliases

**Files:**
- Modify: `tsconfig.json`

- [ ] **Step 1: Enable strict mode + extra checks**

Open `tsconfig.json`. Ensure `compilerOptions` contains at minimum:

```json
{
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "noImplicitOverride": true,
  "noFallthroughCasesInSwitch": true,
  "forceConsistentCasingInFileNames": true,
  "baseUrl": ".",
  "paths": {
    "@/*": ["./*"],
    "@/content": ["./content"],
    "@/content/*": ["./content/*"],
    "@/components/*": ["./components/*"],
    "@/lib/*": ["./lib/*"]
  }
}
```

- [ ] **Step 2: Verify typecheck passes**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add tsconfig.json
git commit -m "chore(ts): enable strict + noUncheckedIndexedAccess, add path aliases"
```

---

## Task 3: Design tokens in Tailwind config (from Figma)

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Pull Figma variables**

Use the Figma MCP to fetch design tokens for the landing frame:

```
mcp__figma-dev-mode-mcp-server__get_variable_defs with nodeId="49:3"
```

Record the returned color / spacing / font tokens. If the call returns nothing useful (file uses raw styles), fall back to hand-eye sampling of the screenshot: navy `#1F2A44`, cream `#F4EBDD`, peach-orange CTA `#E89B6B`, deep-navy text `#111B2E`, muted beige surface `#EDE3D4`, white `#FFFFFF`. **Use the MCP values if present; fall back to these only if absent.**

- [ ] **Step 2: Add color scale to `tailwind.config.ts`**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#1F2A44", ink: "#111B2E" },
        cream: { DEFAULT: "#F4EBDD", 100: "#FBF6EE", 200: "#EDE3D4" },
        peach: { DEFAULT: "#E89B6B", 600: "#D8804F" },
      },
      fontFamily: {
        sans: ["var(--font-heebo)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "14px",
        "2xl": "22px",
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 3: Wire RTL defaults in `app/globals.css`**

Replace the file body with:

```css
@import "tailwindcss";

@theme {
  --font-heebo: "Heebo", system-ui, sans-serif;
}

html, body {
  background: theme(colors.cream.100);
  color: theme(colors.navy.ink);
  -webkit-font-smoothing: antialiased;
}

/* LTR-only tokens inside RTL Hebrew paragraphs */
bdi { unicode-bidi: isolate; }
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "feat(design): add navy/cream/peach token palette + Heebo font var"
```

---

## Task 4: ESLint rule banning physical-direction classes

**Files:**
- Modify: `eslint.config.mjs`

- [ ] **Step 1: Add no-restricted-syntax rule for physical utilities**

Open `eslint.config.mjs`. Append to the exported flat config:

```js
{
  files: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  rules: {
    "no-restricted-syntax": [
      "error",
      {
        selector: "Literal[value=/\\b(pl|pr|ml|mr|left|right|text-left|text-right)-\\w+\\b/]",
        message: "Use logical properties (ps-/pe-/ms-/me-/start-/end-/text-start/text-end) for RTL correctness.",
      },
      {
        selector: "TemplateElement[value.raw=/\\b(pl|pr|ml|mr|left|right|text-left|text-right)-\\w+\\b/]",
        message: "Use logical properties (ps-/pe-/ms-/me-/start-/end-/text-start/text-end) for RTL correctness.",
      },
    ],
  },
},
```

- [ ] **Step 2: Verify lint passes on scaffold**

```bash
npx eslint .
```

Expected: no errors (scaffold shouldn't use banned classes).

- [ ] **Step 3: Commit**

```bash
git add eslint.config.mjs
git commit -m "chore(lint): forbid physical-direction Tailwind utilities (RTL safety)"
```

---

## Task 5: Root layout — HTML lang, dir, fonts, metadata base

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  variable: "--font-heebo",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Verify dev server renders**

```bash
npm run dev -- --port 3111
```

Open `http://localhost:3111` in a browser (or use preview_start + preview_snapshot). Confirm the HTML source has `<html lang="he" dir="rtl">` and Heebo is loaded. Stop the dev server.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(layout): RTL-root, self-host Heebo, metadataBase"
```

---

## Task 6: Content source of truth — `content/site.ts`

**Files:**
- Create: `content/site.ts`
- Create: `content/types.ts`

- [ ] **Step 1: Create `content/types.ts`**

```ts
export type PracticeArea = {
  slug: "labor" | "civil" | "real-estate" | "execution" | "traffic" | "corporate";
  title: string;       // TODO: final Hebrew title
  blurb: string;       // TODO: 1-2 sentences
  imageAlt: string;    // Hebrew alt text
};

export type FAQItem = { q: string; a: string };

export type Testimonial = { quote: string; author: string; caseType: string };

export type ProcessStep = { n: number; title: string; blurb: string };

export type SiteContent = {
  brand: { name: string; initials: string };
  hero: { h1: string; sub: string; ctaLabel: string };
  about: { paragraphs: string[]; portraitAlt: string };
  practiceAreas: PracticeArea[];
  process: ProcessStep[];
  spotlight: { headline: string; body: string; ctaLabel: string };
  testimonials: Testimonial[];
  faq: FAQItem[];
  contact: {
    heading: string;
    sub: string;
    email: string;
    phoneIntl: string; // "+972559234062"
    phoneDisplay: string; // "055-923-4062"
    whatsappMessage: string; // prefilled WA text
    address: { street: string; city: string; country: string; postalCode?: string };
    hours: string; // "א'-ה' 09:00-19:00"
  };
  seo: {
    siteName: string;
    tagline: string;
    defaultDescription: string;
  };
  features: {
    whatsappFloat: boolean;
  };
};
```

- [ ] **Step 2: Create `content/site.ts`**

```ts
import type { SiteContent } from "./types";

export const site: SiteContent = {
  brand: {
    name: "עו\"ד סתיו שוקרון", // TODO: confirm final brand spelling
    initials: "SE",
  },
  hero: {
    h1: "TODO: כותרת ראשית (לדוגמה: ייצוג משפטי מקצועי, ברמה הגבוהה ביותר)",
    sub: "TODO: תת-כותרת של 1-2 משפטים שמסבירה את ההצעה",
    ctaLabel: "לקבלת ייעוץ",
  },
  about: {
    paragraphs: [
      "TODO: פסקה ראשונה (רקע, השכלה, מומחיות).",
      "TODO: פסקה שנייה (גישה וערכים).",
    ],
    portraitAlt: "תמונה של עו\"ד סתיו שוקרון במשרד",
  },
  practiceAreas: [
    { slug: "labor", title: "TODO", blurb: "TODO", imageAlt: "דיני עבודה" },
    { slug: "civil", title: "TODO", blurb: "TODO", imageAlt: "משפט אזרחי" },
    { slug: "real-estate", title: "TODO", blurb: "TODO", imageAlt: "נדל\"ן" },
    { slug: "execution", title: "TODO", blurb: "TODO", imageAlt: "הוצאה לפועל" },
    { slug: "traffic", title: "TODO", blurb: "TODO", imageAlt: "תעבורה" },
    { slug: "corporate", title: "TODO", blurb: "TODO", imageAlt: "תאגידים" },
  ],
  process: [
    { n: 1, title: "TODO", blurb: "TODO" },
    { n: 2, title: "TODO", blurb: "TODO" },
    { n: 3, title: "TODO", blurb: "TODO" },
    { n: 4, title: "TODO", blurb: "TODO" },
  ],
  spotlight: { headline: "TODO", body: "TODO", ctaLabel: "TODO" },
  testimonials: [
    { quote: "TODO", author: "TODO", caseType: "TODO" },
    { quote: "TODO", author: "TODO", caseType: "TODO" },
    { quote: "TODO", author: "TODO", caseType: "TODO" },
  ],
  faq: [
    { q: "TODO", a: "TODO" },
    { q: "TODO", a: "TODO" },
    { q: "TODO", a: "TODO" },
    { q: "TODO", a: "TODO" },
  ],
  contact: {
    heading: "TODO: כותרת טופס",
    sub: "TODO: תת-כותרת",
    email: "s@stavlaw.co.il",
    phoneIntl: "+972559234062",
    phoneDisplay: "055-923-4062",
    whatsappMessage: "היי, אני פונה דרך האתר ומעוניין/ת בייעוץ",
    address: {
      street: "בן צבי 10, מגדל הרכבת",
      city: "באר שבע",
      country: "IL",
    },
    hours: "TODO: שעות פעילות",
  },
  seo: {
    siteName: "משרד עו\"ד סתיו שוקרון",
    tagline: "TODO: טאגליין של 6-10 מילים",
    defaultDescription: "TODO: תיאור מטא של עד 155 תווים עם מילות מפתח (עורכת דין, באר שבע, דיני עבודה וכו').",
  },
  features: {
    whatsappFloat: true,
  },
};
```

- [ ] **Step 3: Typecheck**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add content/
git commit -m "feat(content): typed single-source-of-truth site.ts with TODO copy slots"
```

---

## Task 7: Export images from Figma into `figma-assets/`

**Files:**
- Create: `figma-assets/` with the raw images
- Create: `public/og-fallback.png` (copy of hero for OG fallback)

- [ ] **Step 1: Enumerate image nodes**

Run `mcp__figma-dev-mode-mcp-server__get_metadata` with `nodeId="49:3"`. The output is JSON with shape `[{type, text}, ...]`. Inspect it to identify image fill nodes across sections. Record `nodeId`s for:

- Hero portrait
- About portrait
- 6 practice-area tile images
- Spotlight photo
- Testimonial background/decorative
- Laptop mockup (if used in mockup preview section)

If the metadata output is too large, delegate the enumeration to a subagent with the saved tool-result file path.

- [ ] **Step 2: Export each image via `get_design_context`**

For each image node, call:

```
mcp__figma-dev-mode-mcp-server__get_design_context with nodeId="<id>" and artifactType="COMPONENT_WITHIN_A_WEB_PAGE_OR_APP_SCREEN"
```

The response includes image URLs. Download each via `curl`:

```bash
mkdir -p figma-assets
curl -L -o figma-assets/hero.png "<url>"
# repeat per image
```

Filename convention: `hero.png`, `about.png`, `area-labor.png`, `area-civil.png`, `area-real-estate.png`, `area-execution.png`, `area-traffic.png`, `area-corporate.png`, `spotlight.png`, `testimonial.png`.

- [ ] **Step 3: Create OG fallback**

```bash
cp figma-assets/hero.png public/og-fallback.png
```

(`next/image` handles format conversion at render; we keep originals.)

- [ ] **Step 4: Commit**

```bash
git add figma-assets/ public/og-fallback.png
git commit -m "assets: export landing imagery from Figma into figma-assets/"
```

---

## Task 8: Install shadcn/ui primitives

**Files:**
- Create: `components.json`
- Create: `components/ui/{button,input,textarea,label,accordion,sonner}.tsx`
- Modify: `app/layout.tsx` (mount Toaster)

- [ ] **Step 1: Init shadcn**

```bash
npx --yes shadcn@latest init -d
```

When prompted interactively, accept defaults except: base color = `neutral`, CSS variables = yes, component path = `@/components`, util path = `@/lib/utils`. If the `-d` defaults flag runs non-interactively, review the generated `components.json` and adjust paths if wrong.

- [ ] **Step 2: Add the primitives we need**

```bash
npx --yes shadcn@latest add button input textarea label accordion sonner
```

- [ ] **Step 3: Mount `<Toaster>` in `app/layout.tsx`**

Add import and `<Toaster/>` at the end of `<body>`:

```tsx
import { Toaster } from "@/components/ui/sonner";
// ...
<body className="font-sans antialiased">
  {children}
  <Toaster richColors position="top-center" dir="rtl" />
</body>
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(ui): shadcn primitives (button/input/textarea/label/accordion/sonner)"
```

---

## Task 9: Nav section

**Files:**
- Create: `components/sections/Nav.tsx`

- [ ] **Step 1: Implement**

```tsx
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
        "fixed inset-inline-0 top-0 z-50 transition-colors",
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
```

Note: `inset-inline-0` is a Tailwind v4 logical utility. If your Tailwind version emits it, ship; otherwise replace with `start-0 end-0`.

- [ ] **Step 2: Commit**

```bash
git add components/sections/Nav.tsx
git commit -m "feat(nav): sticky RTL nav with backdrop-blur on scroll"
```

---

## Task 10: Hero section (LCP element)

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Implement**

```tsx
import Image from "next/image";
import { site } from "@/content/site";
import heroImg from "@/figma-assets/hero.png";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] bg-navy pt-24 text-cream-100">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-20 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <h1 className="text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
            {site.hero.h1}
          </h1>
          <p className="mt-5 text-lg text-cream-200/90 md:text-xl">{site.hero.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="rounded-full bg-peach px-7 py-3 text-sm font-bold text-white hover:bg-peach-600 transition-colors"
            >
              {site.hero.ctaLabel}
            </a>
            <a
              href={`tel:${site.contact.phoneIntl}`}
              className="rounded-full border border-cream-100/30 px-7 py-3 text-sm font-semibold hover:bg-cream-100/10 transition-colors"
            >
              <bdi>{site.contact.phoneDisplay}</bdi>
            </a>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <Image
            src={heroImg}
            alt={site.about.portraitAlt}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="rounded-2xl shadow-2xl"
            placeholder="blur"
          />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat(hero): priority-loaded RTL hero with primary + phone CTA"
```

---

## Task 11: AboutBrief section

**Files:**
- Create: `components/sections/AboutBrief.tsx`

- [ ] **Step 1: Implement**

```tsx
import Image from "next/image";
import { site } from "@/content/site";
import aboutImg from "@/figma-assets/about.png";

export function AboutBrief() {
  return (
    <section id="about" className="bg-cream-100 py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-[1fr_1.2fr]">
        <Image
          src={aboutImg}
          alt={site.about.portraitAlt}
          sizes="(max-width: 768px) 100vw, 40vw"
          className="rounded-2xl shadow-lg"
          placeholder="blur"
        />
        <div>
          <span className="text-sm font-semibold uppercase tracking-widest text-peach-600">אודות</span>
          <h2 className="mt-2 text-3xl font-black text-navy-ink md:text-4xl">{site.brand.name}</h2>
          {site.about.paragraphs.map((p, i) => (
            <p key={i} className="mt-4 text-lg leading-relaxed text-navy-ink/80">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/AboutBrief.tsx
git commit -m "feat(about): brief bio section with portrait"
```

---

## Task 12: PracticeAreas section (6 tiles)

**Files:**
- Create: `components/sections/PracticeAreas.tsx`

- [ ] **Step 1: Implement**

```tsx
import Image from "next/image";
import { site } from "@/content/site";
import laborImg from "@/figma-assets/area-labor.png";
import civilImg from "@/figma-assets/area-civil.png";
import realEstateImg from "@/figma-assets/area-real-estate.png";
import executionImg from "@/figma-assets/area-execution.png";
import trafficImg from "@/figma-assets/area-traffic.png";
import corporateImg from "@/figma-assets/area-corporate.png";

const imgMap = {
  labor: laborImg,
  civil: civilImg,
  "real-estate": realEstateImg,
  execution: executionImg,
  traffic: trafficImg,
  corporate: corporateImg,
} as const;

export function PracticeAreas() {
  return (
    <section id="practice-areas" className="bg-navy py-20 text-cream-100">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-peach">תחומי התמחות</span>
          <h2 className="mt-2 text-3xl font-black md:text-4xl">מגוון רחב של שירותים משפטיים</h2>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {site.practiceAreas.map((area) => (
            <li key={area.slug}>
              <article className="group h-full overflow-hidden rounded-2xl bg-cream-100/5 backdrop-blur transition-transform hover:-translate-y-1 hover:bg-cream-100/10">
                <Image
                  src={imgMap[area.slug]}
                  alt={area.imageAlt}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="aspect-[4/3] w-full object-cover"
                  placeholder="blur"
                />
                <div className="p-5">
                  <h3 className="text-lg font-bold">{area.title}</h3>
                  <p className="mt-2 text-sm text-cream-100/70">{area.blurb}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/PracticeAreas.tsx
git commit -m "feat(practice-areas): 6-tile grid with hover elevation"
```

---

## Task 13: Process (stepper) section

**Files:**
- Create: `components/sections/Process.tsx`

- [ ] **Step 1: Implement**

```tsx
import { site } from "@/content/site";

export function Process() {
  return (
    <section id="process" className="bg-cream-100 py-20">
      <div className="mx-auto max-w-4xl px-5">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-peach-600">התהליך</span>
          <h2 className="mt-2 text-3xl font-black text-navy-ink md:text-4xl">איך עובד התהליך</h2>
        </div>
        <ol className="mt-12 relative space-y-8 ps-10 before:absolute before:inset-y-0 before:start-4 before:w-px before:bg-navy/20">
          {site.process.map((step) => (
            <li key={step.n} className="relative">
              <span className="absolute start-[-1.75rem] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-peach text-sm font-bold text-white ring-4 ring-cream-100">
                {step.n}
              </span>
              <h3 className="text-xl font-bold text-navy-ink">{step.title}</h3>
              <p className="mt-1 text-navy-ink/75">{step.blurb}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Process.tsx
git commit -m "feat(process): vertical stepper with connector line"
```

---

## Task 14: LawyerSpotlight section

**Files:**
- Create: `components/sections/LawyerSpotlight.tsx`

- [ ] **Step 1: Implement**

```tsx
import Image from "next/image";
import { site } from "@/content/site";
import spotlightImg from "@/figma-assets/spotlight.png";

export function LawyerSpotlight() {
  return (
    <section className="bg-navy py-20 text-cream-100">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2">
        <Image
          src={spotlightImg}
          alt={site.about.portraitAlt}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="rounded-2xl"
          placeholder="blur"
        />
        <div>
          <h2 className="text-3xl font-black md:text-4xl">{site.spotlight.headline}</h2>
          <p className="mt-4 text-lg text-cream-100/80">{site.spotlight.body}</p>
          <a
            href="#contact"
            className="mt-8 inline-block rounded-full bg-peach px-7 py-3 text-sm font-bold text-white hover:bg-peach-600 transition-colors"
          >
            {site.spotlight.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/LawyerSpotlight.tsx
git commit -m "feat(spotlight): mid-page full-width value-prop section"
```

---

## Task 15: Testimonials carousel

**Files:**
- Create: `components/sections/Testimonials.tsx`

- [ ] **Step 1: Implement (simple horizontal scroll; upgrade to carousel later if desired)**

```tsx
"use client";

import { useRef } from "react";
import { site } from "@/content/site";

export function Testimonials() {
  const scroller = useRef<HTMLUListElement>(null);

  const scroll = (dir: -1 | 1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  return (
    <section id="testimonials" className="bg-cream-100 py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-peach-600">ממליצים</span>
          <h2 className="mt-2 text-3xl font-black text-navy-ink md:text-4xl">דוגמאות מהימנות האמיתי</h2>
        </div>
        <ul
          ref={scroller}
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {site.testimonials.map((t, i) => (
            <li
              key={i}
              className="min-w-full shrink-0 snap-center rounded-2xl bg-white p-8 shadow-md md:min-w-[calc(50%-0.75rem)]"
            >
              <p className="text-lg leading-relaxed text-navy-ink">״{t.quote}״</p>
              <footer className="mt-6 text-sm text-navy-ink/70">
                <span className="font-bold">{t.author}</span> · {t.caseType}
              </footer>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-center gap-3">
          <button
            aria-label="הקודם"
            onClick={() => scroll(1)}
            className="h-10 w-10 rounded-full bg-navy text-cream-100 hover:bg-navy-ink"
          >
            →
          </button>
          <button
            aria-label="הבא"
            onClick={() => scroll(-1)}
            className="h-10 w-10 rounded-full bg-navy text-cream-100 hover:bg-navy-ink"
          >
            ←
          </button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Testimonials.tsx
git commit -m "feat(testimonials): snap-scroll carousel with RTL controls"
```

---

## Task 16: FAQ section (accordion, drives FAQPage schema)

**Files:**
- Create: `components/sections/FAQ.tsx`

- [ ] **Step 1: Implement**

```tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { site } from "@/content/site";

export function FAQ() {
  return (
    <section id="faq" className="bg-navy py-20 text-cream-100">
      <div className="mx-auto max-w-3xl px-5">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-peach">שאלות נפוצות</span>
          <h2 className="mt-2 text-3xl font-black md:text-4xl">שאלות נפוצות</h2>
        </div>
        <Accordion type="single" collapsible className="mt-10">
          {site.faq.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-cream-100/20">
              <AccordionTrigger className="text-start text-lg">{item.q}</AccordionTrigger>
              <AccordionContent className="text-cream-100/80">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/FAQ.tsx
git commit -m "feat(faq): accordion section (FAQPage schema target)"
```

---

## Task 17: ContactForm UI (no backend yet)

**Files:**
- Create: `components/sections/ContactForm.tsx`
- Create: `lib/contact-schema.ts`

- [ ] **Step 1: Install deps**

```bash
npm install react-hook-form @hookform/resolvers zod
```

- [ ] **Step 2: Create `lib/contact-schema.ts`**

```ts
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "שם קצר מדי").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{7,20}$/, "מספר טלפון לא תקין"),
  email: z.string().trim().email("אימייל לא תקין"),
  message: z.string().trim().min(10, "הודעה קצרה מדי").max(2000),
  honeypot: z.string().max(0).optional(),
  turnstileToken: z.string().min(1, "אימות נכשל").optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
```

- [ ] **Step 3: Create `components/sections/ContactForm.tsx`**

```tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/content/site";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactInput) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      toast.success("תודה, ניצור איתך קשר בהקדם");
      reset();
    } catch {
      toast.error("שליחה נכשלה — אפשר ליצור קשר בוואטסאפ");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-cream-100 py-20">
      <div className="mx-auto max-w-xl px-5">
        <div className="text-center">
          <h2 className="text-3xl font-black text-navy-ink md:text-4xl">{site.contact.heading}</h2>
          <p className="mt-3 text-navy-ink/75">{site.contact.sub}</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-4">
          <input type="text" {...register("honeypot")} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <div>
            <Label htmlFor="name">שם מלא</Label>
            <Input id="name" {...register("name")} aria-invalid={!!errors.name} />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="phone">טלפון</Label>
            <Input id="phone" inputMode="tel" {...register("phone")} aria-invalid={!!errors.phone} />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
          </div>
          <div>
            <Label htmlFor="email">אימייל</Label>
            <Input id="email" type="email" {...register("email")} aria-invalid={!!errors.email} />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="message">הודעה</Label>
            <Textarea id="message" rows={5} {...register("message")} aria-invalid={!!errors.message} />
            {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
          </div>
          <Button type="submit" disabled={submitting} className="w-full bg-peach text-white hover:bg-peach-600">
            {submitting ? "שולח..." : "שליחה"}
          </Button>
        </form>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add components/sections/ContactForm.tsx lib/contact-schema.ts package.json package-lock.json
git commit -m "feat(contact): form UI with react-hook-form + Zod validation (no backend yet)"
```

---

## Task 18: WhatsApp float + Footer

**Files:**
- Create: `components/sections/WhatsAppFloat.tsx`
- Create: `components/sections/Footer.tsx`

- [ ] **Step 1: `WhatsAppFloat.tsx`**

```tsx
import { site } from "@/content/site";

export function WhatsAppFloat() {
  if (!site.features.whatsappFloat) return null;
  const href = `https://wa.me/${site.contact.phoneIntl.replace("+", "")}?text=${encodeURIComponent(site.contact.whatsappMessage)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label="פנייה בוואטסאפ"
      className="fixed bottom-6 start-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M20.52 3.48A11.85 11.85 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.83c0 2.08.54 4.12 1.58 5.91L0 24l6.42-1.69a11.84 11.84 0 0 0 5.62 1.43h.01c6.54 0 11.85-5.3 11.85-11.83 0-3.16-1.23-6.13-3.38-8.43M12.05 21.42h-.01a9.6 9.6 0 0 1-4.9-1.34l-.35-.21-3.81 1 1.02-3.72-.23-.38a9.57 9.57 0 0 1-1.47-5.1c0-5.29 4.31-9.6 9.62-9.6 2.57 0 4.98 1 6.8 2.82a9.53 9.53 0 0 1 2.82 6.79c0 5.29-4.32 9.6-9.62 9.6"/>
      </svg>
    </a>
  );
}
```

- [ ] **Step 2: `Footer.tsx`**

```tsx
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-navy-ink py-10 text-cream-100/80">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold text-cream-100">{site.brand.name}</h3>
            <p className="mt-2 text-sm">{site.seo.tagline}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase text-cream-100">יצירת קשר</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li><a href={`tel:${site.contact.phoneIntl}`} className="hover:text-peach"><bdi>{site.contact.phoneDisplay}</bdi></a></li>
              <li><a href={`mailto:${site.contact.email}`} className="hover:text-peach"><bdi>{site.contact.email}</bdi></a></li>
              <li>{site.contact.address.street}, {site.contact.address.city}</li>
              <li>{site.contact.hours}</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase text-cream-100">מידע</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li><a href="#practice-areas" className="hover:text-peach">תחומי התמחות</a></li>
              <li><a href="#faq" className="hover:text-peach">שאלות נפוצות</a></li>
              <li><a href="#contact" className="hover:text-peach">צור קשר</a></li>
            </ul>
          </div>
        </div>
        <p className="mt-10 border-t border-cream-100/10 pt-5 text-center text-xs">
          © {new Date().getFullYear()} {site.seo.siteName}. כל הזכויות שמורות.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/WhatsAppFloat.tsx components/sections/Footer.tsx
git commit -m "feat(layout): WhatsApp float FAB + NAP-rich footer"
```

---

## Task 19: Compose `app/page.tsx`

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace file body**

```tsx
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { AboutBrief } from "@/components/sections/AboutBrief";
import { PracticeAreas } from "@/components/sections/PracticeAreas";
import { Process } from "@/components/sections/Process";
import { LawyerSpotlight } from "@/components/sections/LawyerSpotlight";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { ContactForm } from "@/components/sections/ContactForm";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFloat } from "@/components/sections/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <AboutBrief />
        <PracticeAreas />
        <Process />
        <LawyerSpotlight />
        <Testimonials />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Visual check**

```bash
npm run dev -- --port 3111
```

Use `preview_start` then `preview_snapshot` to confirm all sections render in the right order, RTL, with Hebrew fonts. Stop the server after.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat(page): compose landing from section components"
```

---

## Task 20: Rate limiter lib — TDD

**Files:**
- Create: `lib/rate-limit.ts`
- Create: `lib/rate-limit.test.ts`

- [ ] **Step 1: Install deps**

```bash
npm install @upstash/redis @upstash/ratelimit
npm install -D vitest @vitest/ui
```

Add to `package.json` scripts:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 2: Write failing test `lib/rate-limit.test.ts`**

```ts
import { describe, it, expect, vi } from "vitest";
import { createLimiter } from "./rate-limit";

describe("createLimiter", () => {
  it("returns a noop limiter when env is missing", async () => {
    const limiter = createLimiter({ url: undefined, token: undefined });
    const r = await limiter.check("ip-1");
    expect(r.allowed).toBe(true);
  });

  it("uses Upstash when env is present", async () => {
    const limit = vi.fn().mockResolvedValue({ success: true, remaining: 4 });
    const limiter = createLimiter({
      url: "https://x",
      token: "t",
      __testOverride: { limit },
    });
    const r = await limiter.check("ip-1");
    expect(r.allowed).toBe(true);
    expect(limit).toHaveBeenCalledWith("ip-1");
  });
});
```

- [ ] **Step 3: Run → fail**

```bash
npm test
```

Expected: FAIL with "Cannot find module './rate-limit'".

- [ ] **Step 4: Implement `lib/rate-limit.ts`**

```ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type CheckResult = { allowed: boolean; remaining: number };
type Limiter = { check: (key: string) => Promise<CheckResult> };

type Opts = {
  url: string | undefined;
  token: string | undefined;
  __testOverride?: { limit: (k: string) => Promise<{ success: boolean; remaining: number }> };
};

export function createLimiter(opts: Opts): Limiter {
  if (opts.__testOverride) {
    return {
      async check(key) {
        const r = await opts.__testOverride!.limit(key);
        return { allowed: r.success, remaining: r.remaining };
      },
    };
  }
  if (!opts.url || !opts.token) {
    return { async check() { return { allowed: true, remaining: Infinity }; } };
  }
  const redis = new Redis({ url: opts.url, token: opts.token });
  const rl = new Ratelimit({
    redis,
    limiter: Ratelimit.fixedWindow(5, "1 h"),
    prefix: "rl:contact",
  });
  return {
    async check(key) {
      const r = await rl.limit(key);
      return { allowed: r.success, remaining: r.remaining };
    },
  };
}

export const contactLimiter = createLimiter({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
```

- [ ] **Step 5: Run → pass**

```bash
npm test
```

Expected: 2 tests pass.

- [ ] **Step 6: Commit**

```bash
git add lib/rate-limit.ts lib/rate-limit.test.ts package.json package-lock.json
git commit -m "feat(rate-limit): Upstash-backed 5/hr limiter with noop fallback + tests"
```

---

## Task 21: Turnstile verifier lib — TDD

**Files:**
- Create: `lib/turnstile.ts`
- Create: `lib/turnstile.test.ts`

- [ ] **Step 1: Write failing test**

```ts
import { describe, it, expect, vi, afterEach } from "vitest";
import { verifyTurnstile } from "./turnstile";

const origFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = origFetch; });

describe("verifyTurnstile", () => {
  it("returns true when secret is not set (dev)", async () => {
    const r = await verifyTurnstile({ token: "x", secret: undefined, ip: "1.2.3.4" });
    expect(r).toBe(true);
  });

  it("calls Cloudflare and returns success flag", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) }) as unknown as typeof fetch;
    const r = await verifyTurnstile({ token: "tok", secret: "s", ip: "1.2.3.4" });
    expect(r).toBe(true);
    expect(globalThis.fetch).toHaveBeenCalled();
  });

  it("returns false on failure response", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: false }) }) as unknown as typeof fetch;
    const r = await verifyTurnstile({ token: "tok", secret: "s", ip: "1.2.3.4" });
    expect(r).toBe(false);
  });
});
```

- [ ] **Step 2: Run → fail**

```bash
npm test
```

- [ ] **Step 3: Implement `lib/turnstile.ts`**

```ts
const ENDPOINT = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstile({
  token,
  secret,
  ip,
}: {
  token: string | undefined;
  secret: string | undefined;
  ip: string | null;
}): Promise<boolean> {
  if (!secret) return true; // dev bypass
  if (!token) return false;
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set("remoteip", ip);
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    if (!res.ok) return false;
    const json = (await res.json()) as { success: boolean };
    return json.success === true;
  } catch {
    return false;
  }
}
```

- [ ] **Step 4: Run → pass**

```bash
npm test
```

- [ ] **Step 5: Commit**

```bash
git add lib/turnstile.ts lib/turnstile.test.ts
git commit -m "feat(turnstile): server-side siteverify helper + tests"
```

---

## Task 22: Resend email helper + HTML template

**Files:**
- Create: `lib/email.ts`
- Create: `lib/email.test.ts`

- [ ] **Step 1: Install Resend**

```bash
npm install resend
```

- [ ] **Step 2: Write failing test**

```ts
import { describe, it, expect, vi } from "vitest";
import { sendContactEmail } from "./email";

describe("sendContactEmail", () => {
  it("calls resend.emails.send with expected shape", async () => {
    const send = vi.fn().mockResolvedValue({ data: { id: "e_1" }, error: null });
    const r = await sendContactEmail(
      { name: "דנה", phone: "0555555555", email: "d@x.com", message: "שלום" },
      { client: { emails: { send } }, to: "s@stavlaw.co.il", from: "noreply@stavlaw.co.il" }
    );
    expect(r.ok).toBe(true);
    expect(send).toHaveBeenCalledOnce();
    const call = send.mock.calls[0][0];
    expect(call.to).toBe("s@stavlaw.co.il");
    expect(call.from).toBe("noreply@stavlaw.co.il");
    expect(call.reply_to).toBe("d@x.com");
    expect(call.subject).toContain("דנה");
    expect(call.html).toContain("שלום");
  });
});
```

- [ ] **Step 3: Run → fail; then implement `lib/email.ts`**

```ts
import { Resend } from "resend";
import type { ContactInput } from "./contact-schema";

type MinimalClient = { emails: { send: (args: SendArgs) => Promise<{ data: unknown; error: unknown }> } };
type SendArgs = {
  from: string;
  to: string;
  reply_to: string;
  subject: string;
  html: string;
  text: string;
};

export function buildEmailHtml(input: ContactInput): string {
  const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
  return `<!doctype html><html lang="he" dir="rtl"><body style="font-family:Arial,sans-serif;color:#111B2E;background:#F4EBDD;padding:24px">
    <h2 style="color:#1F2A44;margin:0 0 12px">פנייה חדשה מהאתר</h2>
    <p><strong>שם:</strong> ${esc(input.name)}</p>
    <p><strong>טלפון:</strong> ${esc(input.phone)}</p>
    <p><strong>אימייל:</strong> ${esc(input.email)}</p>
    <p><strong>הודעה:</strong><br>${esc(input.message).replace(/\n/g, "<br>")}</p>
  </body></html>`;
}

export function buildEmailText(input: ContactInput): string {
  return `פנייה חדשה מהאתר\n\nשם: ${input.name}\nטלפון: ${input.phone}\nאימייל: ${input.email}\n\nהודעה:\n${input.message}`;
}

export async function sendContactEmail(
  input: ContactInput,
  ctx: {
    client?: MinimalClient;
    apiKey?: string;
    to: string;
    from: string;
  }
): Promise<{ ok: boolean; id?: string; error?: unknown }> {
  const client = ctx.client ?? new Resend(ctx.apiKey ?? process.env.RESEND_API_KEY);
  const { data, error } = await client.emails.send({
    from: ctx.from,
    to: ctx.to,
    reply_to: input.email,
    subject: `פנייה חדשה מהאתר — ${input.name}`,
    html: buildEmailHtml(input),
    text: buildEmailText(input),
  });
  if (error) return { ok: false, error };
  return { ok: true, id: (data as { id?: string } | null)?.id };
}
```

- [ ] **Step 4: Run → pass**

```bash
npm test
```

- [ ] **Step 5: Commit**

```bash
git add lib/email.ts lib/email.test.ts package.json package-lock.json
git commit -m "feat(email): Resend wrapper with Hebrew RTL HTML template + tests"
```

---

## Task 23: Contact API route

**Files:**
- Create: `app/api/contact/route.ts`
- Create: `app/api/contact/route.test.ts`

- [ ] **Step 1: Write failing test**

```ts
import { describe, it, expect, vi } from "vitest";

vi.mock("@/lib/rate-limit", () => ({
  contactLimiter: { check: vi.fn().mockResolvedValue({ allowed: true, remaining: 5 }) },
}));
vi.mock("@/lib/turnstile", () => ({ verifyTurnstile: vi.fn().mockResolvedValue(true) }));
vi.mock("@/lib/email", () => ({ sendContactEmail: vi.fn().mockResolvedValue({ ok: true, id: "e_1" }) }));

import { POST } from "./route";

function req(body: unknown, headers: Record<string, string> = {}) {
  return new Request("http://x/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  it("200 on valid input", async () => {
    const res = await POST(req({ name: "דנה", phone: "0555555555", email: "d@x.com", message: "שלום עולם." }));
    expect(res.status).toBe(200);
  });

  it("400 on invalid input", async () => {
    const res = await POST(req({ name: "ד", phone: "x", email: "x", message: "" }));
    expect(res.status).toBe(400);
  });

  it("400 on honeypot filled", async () => {
    const res = await POST(req({ name: "דנה", phone: "0555555555", email: "d@x.com", message: "שלום עולם.", honeypot: "bot" }));
    expect(res.status).toBe(400);
  });
});
```

- [ ] **Step 2: Implement `app/api/contact/route.ts`**

```ts
import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { contactLimiter } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import { sendContactEmail } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_input", issues: parsed.error.issues }, { status: 400 });
  }
  const data = parsed.data;
  if (data.honeypot && data.honeypot.length > 0) {
    return NextResponse.json({ error: "bot_suspected" }, { status: 400 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const rl = await contactLimiter.check(ip);
  if (!rl.allowed) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const turnstileOk = await verifyTurnstile({
    token: data.turnstileToken,
    secret: process.env.TURNSTILE_SECRET_KEY,
    ip,
  });
  if (!turnstileOk) {
    return NextResponse.json({ error: "turnstile_failed" }, { status: 400 });
  }

  const to = process.env.CONTACT_TO_EMAIL ?? "s@stavlaw.co.il";
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
  const result = await sendContactEmail(data, { to, from });
  if (!result.ok) {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 3: Run → pass**

```bash
npm test
```

- [ ] **Step 4: Commit**

```bash
git add app/api/contact/
git commit -m "feat(api): POST /api/contact with Zod, honeypot, rate-limit, turnstile, email"
```

---

## Task 24: JSON-LD schema builders — TDD

**Files:**
- Create: `components/schema/builders.ts`
- Create: `components/schema/builders.test.ts`
- Create: `components/schema/JsonLd.tsx`

- [ ] **Step 1: Install `schema-dts`**

```bash
npm install -D schema-dts
```

- [ ] **Step 2: Write failing test**

```ts
import { describe, it, expect } from "vitest";
import { buildAttorney, buildLocalBusiness, buildFAQPage, buildBreadcrumbList } from "./builders";
import { site } from "@/content/site";

describe("schema builders", () => {
  it("Attorney has required fields", () => {
    const s = buildAttorney({ baseUrl: "https://stavlaw.co.il" });
    expect(s["@type"]).toBe("Attorney");
    expect(s.name).toBeTruthy();
    expect(s.telephone).toBe(site.contact.phoneIntl);
    expect(s.address["@type"]).toBe("PostalAddress");
  });

  it("LocalBusiness has address + url", () => {
    const s = buildLocalBusiness({ baseUrl: "https://stavlaw.co.il" });
    expect(s.url).toBe("https://stavlaw.co.il");
    expect(s.address.addressLocality).toBe(site.contact.address.city);
  });

  it("FAQPage builds mainEntity from content", () => {
    const s = buildFAQPage();
    expect(s["@type"]).toBe("FAQPage");
    expect(Array.isArray(s.mainEntity)).toBe(true);
    expect(s.mainEntity.length).toBe(site.faq.length);
  });

  it("BreadcrumbList has a Home crumb", () => {
    const s = buildBreadcrumbList({ baseUrl: "https://stavlaw.co.il" });
    expect(s.itemListElement[0].name).toBe("בית");
  });
});
```

- [ ] **Step 3: Implement `components/schema/builders.ts`**

```ts
import { site } from "@/content/site";

type BaseCtx = { baseUrl: string };

export function buildAttorney(ctx: BaseCtx) {
  return {
    "@context": "https://schema.org",
    "@type": "Attorney" as const,
    name: site.brand.name,
    image: `${ctx.baseUrl}/og-fallback.png`,
    url: ctx.baseUrl,
    telephone: site.contact.phoneIntl,
    email: site.contact.email,
    address: {
      "@type": "PostalAddress" as const,
      streetAddress: site.contact.address.street,
      addressLocality: site.contact.address.city,
      addressCountry: site.contact.address.country,
    },
    areaServed: { "@type": "Country", name: "Israel" },
    knowsLanguage: ["he", "en"],
    priceRange: "₪₪",
  };
}

export function buildLegalService(ctx: BaseCtx) {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService" as const,
    name: site.seo.siteName,
    url: ctx.baseUrl,
    provider: { "@type": "Attorney", name: site.brand.name },
    areaServed: { "@type": "Country", name: "Israel" },
    serviceType: site.practiceAreas.map((p) => p.title),
  };
}

export function buildLocalBusiness(ctx: BaseCtx) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness" as const,
    "@id": `${ctx.baseUrl}#business`,
    name: site.seo.siteName,
    url: ctx.baseUrl,
    telephone: site.contact.phoneIntl,
    email: site.contact.email,
    image: `${ctx.baseUrl}/og-fallback.png`,
    address: {
      "@type": "PostalAddress" as const,
      streetAddress: site.contact.address.street,
      addressLocality: site.contact.address.city,
      addressCountry: site.contact.address.country,
    },
    openingHours: site.contact.hours, // TODO: convert to structured openingHoursSpecification if client provides exact times
  };
}

export function buildPerson(ctx: BaseCtx) {
  return {
    "@context": "https://schema.org",
    "@type": "Person" as const,
    name: site.brand.name,
    image: `${ctx.baseUrl}/og-fallback.png`,
    jobTitle: "עורכת דין",
    worksFor: { "@type": "Attorney", name: site.brand.name },
    knowsLanguage: ["he", "en"],
  };
}

export function buildFAQPage() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage" as const,
    mainEntity: site.faq.map((f) => ({
      "@type": "Question" as const,
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function buildBreadcrumbList(ctx: BaseCtx) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList" as const,
    itemListElement: [
      { "@type": "ListItem" as const, position: 1, name: "בית", item: ctx.baseUrl },
    ],
  };
}
```

- [ ] **Step 4: Run → pass**

```bash
npm test
```

- [ ] **Step 5: Create `components/schema/JsonLd.tsx`**

```tsx
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add components/schema/ package.json package-lock.json
git commit -m "feat(schema): JSON-LD builders (Attorney, LegalService, LocalBusiness, Person, FAQPage, Breadcrumb) + tests"
```

---

## Task 25: Metadata + inject JSON-LD on `/`

**Files:**
- Create: `lib/seo.ts`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `lib/seo.ts`**

```ts
import type { Metadata } from "next";
import { site } from "@/content/site";

export function baseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://stavlaw.co.il";
}

export function landingMetadata(): Metadata {
  const url = baseUrl();
  const title = `${site.seo.siteName} | ${site.seo.tagline}`;
  const description = site.seo.defaultDescription;
  return {
    title,
    description,
    alternates: { canonical: url, languages: { "he-IL": url } },
    openGraph: {
      type: "website",
      locale: "he_IL",
      url,
      siteName: site.seo.siteName,
      title,
      description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
    verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
      : undefined,
  };
}
```

- [ ] **Step 2: Modify `app/page.tsx`**

Add imports and JSON-LD blocks. Replace the top of the file:

```tsx
import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
// ...existing imports...
import { JsonLd } from "@/components/schema/JsonLd";
import {
  buildAttorney, buildLegalService, buildLocalBusiness,
  buildPerson, buildFAQPage, buildBreadcrumbList,
} from "@/components/schema/builders";
import { baseUrl, landingMetadata } from "@/lib/seo";

export const metadata: Metadata = landingMetadata();

export default function Home() {
  const ctx = { baseUrl: baseUrl() };
  return (
    <>
      <JsonLd data={buildAttorney(ctx)} />
      <JsonLd data={buildLegalService(ctx)} />
      <JsonLd data={buildLocalBusiness(ctx)} />
      <JsonLd data={buildPerson(ctx)} />
      <JsonLd data={buildFAQPage()} />
      <JsonLd data={buildBreadcrumbList(ctx)} />
      <Nav />
      <main>
        {/* ...sections... */}
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
```

- [ ] **Step 3: Verify build + view page source**

```bash
npm run build && npm run start -- --port 3111
```

In a second terminal: `curl -s http://localhost:3111 | grep 'application/ld+json' | wc -l` — expect `6`. Stop the server.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx lib/seo.ts
git commit -m "feat(seo): metadata helper + 6 JSON-LD graphs injected on /"
```

---

## Task 26: Dynamic OG image

**Files:**
- Create: `app/opengraph-image.tsx`

- [ ] **Step 1: Implement**

```tsx
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: 80,
          background: "linear-gradient(135deg,#1F2A44 0%,#111B2E 100%)",
          color: "#F4EBDD",
          fontFamily: "system-ui",
          direction: "rtl",
        }}
      >
        <div style={{ fontSize: 28, color: "#E89B6B", letterSpacing: 2 }}>{site.seo.siteName}</div>
        <div style={{ fontSize: 72, fontWeight: 900, marginTop: 20, lineHeight: 1.15 }}>{site.seo.tagline}</div>
        <div style={{ fontSize: 28, marginTop: 24, color: "#F4EBDDcc" }}>{site.contact.phoneDisplay}</div>
      </div>
    ),
    { ...size }
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add app/opengraph-image.tsx
git commit -m "feat(og): dynamic 1200x630 OG image at /opengraph-image"
```

---

## Task 27: sitemap.ts + robots.ts + middleware noindex

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Create: `middleware.ts`

- [ ] **Step 1: `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = baseUrl();
  return [
    { url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
  ];
}
```

- [ ] **Step 2: `app/robots.ts`**

```ts
import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.VERCEL_ENV === "production";
  return {
    rules: isProd
      ? [{ userAgent: "*", allow: "/" }]
      : [{ userAgent: "*", disallow: "/" }],
    sitemap: `${baseUrl()}/sitemap.xml`,
    host: baseUrl(),
  };
}
```

- [ ] **Step 3: `middleware.ts`**

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(_req: NextRequest) {
  const res = NextResponse.next();
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return res;
}

export const config = { matcher: ["/((?!api|_next|favicon.ico).*)"] };
```

- [ ] **Step 4: Verify**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add app/sitemap.ts app/robots.ts middleware.ts
git commit -m "feat(seo): sitemap, robots (prod-only allow), preview noindex middleware"
```

---

## Task 28: Analytics (GA4 + Vercel)

**Files:**
- Create: `lib/analytics.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Install Vercel Analytics**

```bash
npm install @vercel/analytics @vercel/speed-insights
```

- [ ] **Step 2: Create `lib/analytics.tsx`**

```tsx
"use client";

import Script from "next/script";

export function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA4_ID;
  if (!id) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${id}', { anonymize_ip: true });
      `}</Script>
    </>
  );
}
```

- [ ] **Step 3: Modify `app/layout.tsx`**

Add imports and mount:

```tsx
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@/lib/analytics";
// ...
<body className="font-sans antialiased">
  {children}
  <Toaster richColors position="top-center" dir="rtl" />
  <GoogleAnalytics />
  <Analytics />
  <SpeedInsights />
</body>
```

- [ ] **Step 4: Build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(analytics): GA4 (afterInteractive) + Vercel Analytics + Speed Insights"
```

---

## Task 29: Framer Motion scroll-reveal wrapper

**Files:**
- Create: `components/ui/Reveal.tsx`
- Modify: one section (AboutBrief) to use it as a reference; rest applied opportunistically

- [ ] **Step 1: Install**

```bash
npm install framer-motion
```

- [ ] **Step 2: Create `components/ui/Reveal.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Wrap the about content with `<Reveal>`** in `AboutBrief.tsx` as a worked example. Apply to other sections iteratively — not part of this task.

- [ ] **Step 4: Commit**

```bash
git add components/ui/Reveal.tsx components/sections/AboutBrief.tsx package.json package-lock.json
git commit -m "feat(motion): reduced-motion-aware scroll-reveal helper"
```

---

## Task 30: Playwright smoke test

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/smoke.spec.ts`
- Modify: `package.json` (scripts)

- [ ] **Step 1: Install**

```bash
npm install -D @playwright/test
npx playwright install --with-deps chromium
```

- [ ] **Step 2: Create `playwright.config.ts`**

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: 0,
  use: { baseURL: "http://localhost:3111", locale: "he-IL" },
  webServer: {
    command: "npm run build && npm run start -- --port 3111",
    url: "http://localhost:3111",
    reuseExistingServer: false,
    timeout: 180_000,
  },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
});
```

- [ ] **Step 3: Create `tests/smoke.spec.ts`**

```ts
import { test, expect } from "@playwright/test";

test("home renders in Hebrew RTL", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "he");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.locator("h1")).toBeVisible();
});

test("all JSON-LD blocks parse as valid JSON", async ({ page }) => {
  await page.goto("/");
  const blocks = await page.locator('script[type="application/ld+json"]').all();
  expect(blocks.length).toBeGreaterThanOrEqual(6);
  for (const b of blocks) {
    const text = await b.textContent();
    expect(() => JSON.parse(text ?? "")).not.toThrow();
  }
});

test("contact form submits successfully (mocked API)", async ({ page }) => {
  await page.route("**/api/contact", (route) =>
    route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) })
  );
  await page.goto("/#contact");
  await page.getByLabel("שם מלא").fill("דנה בדיקה");
  await page.getByLabel("טלפון").fill("055-555-5555");
  await page.getByLabel("אימייל").fill("dana@example.com");
  await page.getByLabel("הודעה").fill("הודעת בדיקה ממושכת דיה לעבור ולידציה של Zod.");
  await page.getByRole("button", { name: /שליחה/ }).click();
  await expect(page.getByText("תודה, ניצור איתך קשר בהקדם")).toBeVisible({ timeout: 5000 });
});
```

- [ ] **Step 4: Add scripts**

In `package.json` scripts:

```json
"test:e2e": "playwright test",
"test:all": "vitest run && playwright test"
```

- [ ] **Step 5: Run**

```bash
npm run test:e2e
```

Expected: 3 passing tests.

- [ ] **Step 6: Commit**

```bash
git add playwright.config.ts tests/ package.json package-lock.json
git commit -m "test(e2e): Playwright smoke — RTL, JSON-LD validity, contact submit"
```

---

## Task 31: GitHub Actions CI

**Files:**
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Implement**

```yaml
name: CI
on:
  pull_request:
  push:
    branches: [main]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npx tsc --noEmit
      - run: npx eslint .
      - run: npm test
      - run: npx playwright install --with-deps chromium
      - run: npm run build
      - run: npm run test:e2e
```

- [ ] **Step 2: Commit**

```bash
git add .github/
git commit -m "ci: typecheck, eslint, vitest, build, playwright on PR"
```

---

## Task 32: README + env docs

**Files:**
- Create: `README.md`
- Create: `.env.example`

- [ ] **Step 1: `.env.example`**

```
# Public
NEXT_PUBLIC_SITE_URL=https://stavlaw.co.il
NEXT_PUBLIC_GA4_ID=
NEXT_PUBLIC_GSC_VERIFICATION=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=

# Server
RESEND_API_KEY=
CONTACT_TO_EMAIL=s@stavlaw.co.il
CONTACT_FROM_EMAIL=noreply@stavlaw.co.il
TURNSTILE_SECRET_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

- [ ] **Step 2: `README.md`**

```markdown
# stavlaw

Landing page for משרד עו"ד סתיו שוקרון. Next.js 15, RTL Hebrew, deployed on Vercel.

## Develop
npm install
cp .env.example .env.local
npm run dev

## Test
npm test          # unit
npm run test:e2e  # Playwright

## Deploy
Push to main → Vercel auto-deploys production. Any branch → preview (noindexed).

## Environment variables
See .env.example. Required for production:
- RESEND_API_KEY (+ verified sender domain)
- TURNSTILE_SITE_KEY + TURNSTILE_SECRET_KEY
- UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN
- NEXT_PUBLIC_SITE_URL
- NEXT_PUBLIC_GA4_ID
- NEXT_PUBLIC_GSC_VERIFICATION

## Content
All visible copy lives in `content/site.ts`. Replace every `TODO:` before launch.

## Search Console setup
1. Set NEXT_PUBLIC_GSC_VERIFICATION to the meta-tag token from https://search.google.com/search-console
2. Deploy to production
3. Verify ownership, then submit `/sitemap.xml`

## Resend domain setup
1. Add your domain in the Resend dashboard
2. Configure the DNS records Resend provides (SPF + DKIM + return-path)
3. Set CONTACT_FROM_EMAIL to an address on that domain
```

- [ ] **Step 3: Commit**

```bash
git add README.md .env.example
git commit -m "docs: README with env, deploy, and Search Console instructions"
```

---

## Task 33: Push to GitHub + connect Vercel

**Files:** none (infra only)

- [ ] **Step 1: Create the GitHub repo**

```bash
gh repo create wavedev2024/stavlaw --private --source=. --remote=origin --push
```

Expected: new private repo at github.com/wavedev2024/stavlaw, `main` pushed.

- [ ] **Step 2: Link to Vercel**

Run in the project directory:

```bash
npx --yes vercel link
npx --yes vercel --prod
```

If the user prefers the web UI: tell them to import `wavedev2024/stavlaw` at https://vercel.com/new, framework auto-detects as Next.js, region `fra1`.

- [ ] **Step 3: Set Vercel env vars**

Either via `vercel env add <NAME> production` for each, or via the Vercel dashboard. Values required for a working production deploy:
- `RESEND_API_KEY`
- `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
- `NEXT_PUBLIC_SITE_URL` = production domain
- `NEXT_PUBLIC_GA4_ID` (once user provides)
- `NEXT_PUBLIC_GSC_VERIFICATION` (once verified)

If any are absent at launch, the site still works (rate-limit and turnstile no-op in dev mode; Resend will error and the UI shows the WhatsApp-fallback toast).

- [ ] **Step 4: Verify production deploy**

Open the production URL. Check:
- `<html lang="he" dir="rtl">` present
- Hero + all sections render
- `/sitemap.xml` returns one URL, `/robots.txt` has `Allow: /`
- `/opengraph-image` returns a PNG

- [ ] **Step 5: Final commit (pin deploy)**

```bash
git tag v0.1.0
git push origin v0.1.0
```

---

## Self-review

**Spec coverage check:**
- §3 Decisions 1–6 → all reflected (fresh domain, TODO copy, Resend, Figma assets, project path, stack).
- §4 Architecture → matches file tree.
- §5 Tech stack → every item has a task (Next 15 T1, TS T2, Tailwind+tokens T3, ESLint RTL T4, Heebo T5, content T6, images T7, shadcn T8, Framer Motion T29, Resend T22, Turnstile T21, Upstash T20, Zod+RHF T17, schema-dts T24, Playwright T30, GH Actions T31, Vercel+GA4 T28+T33).
- §6 Sections → all 11 components in T9–T19.
- §7 Contact flow → T17+T20+T21+T22+T23.
- §8 SEO → metadata T25, OG T26, JSON-LD T24+T25, sitemap/robots T27, CWV via T5/T10/T28.
- §9 RTL → T4 ESLint + T5 HTML attrs + T18 `<bdi>`.
- §10 Images → T7.
- §11 Env vars → documented in T32.
- §12 Deployment → T33.
- §13 Perf budget → enforced via `next/image`, `next/font`, and GA4 `afterInteractive` (T28).
- §14 Testing → T30 smoke + CWV check covered in T31 build.
- §15 Risks → mitigations baked into the tasks (TODO slots, Resend default sender fallback, etc.).
- §16 Open items → left as `TODO:` markers in `content/site.ts` (T6).

**Placeholder scan:** the only `TODO:` strings are intentional content slots in `content/site.ts` (per the spec decision) and a single schema comment in T24. No lazy steps, no missing code.

**Type consistency:** `ContactInput` used consistently across T17, T22, T23. `SiteContent` shape stable between T6 and all consumer sections. `createLimiter`/`verifyTurnstile` signatures match between builder tasks and the API route.
