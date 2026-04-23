# Stav Law Landing Page — Design Spec

**Date:** 2026-04-23
**Client:** Stav Eliahu Shokron, Law Office (עו"ד סתיו שוקרון)
**Deliverable:** Single long-scroll landing page, Next.js 15, deployed to Vercel.
**Figma:** https://www.figma.com/design/vMrJPSlYvAXH8lPShMDAR0/ (node 49:3)
**Reference (content source for TODO fill-ins, not copied):** https://stavlaw.co.il/

---

## 1. Goals

- Ship a high-conversion, SEO-maximised Hebrew landing page that matches the Figma pixel-for-pixel.
- Stand alone on a fresh Vercel deployment — no migration/redirects from the old site.
- Structure the code so extending to a multi-page site later (blog, per-practice-area pages) requires no refactor.

## 2. Non-goals (deferred)

- Blog / CMS (Sanity or MDX) — to be added later for long-tail SEO.
- Per-practice-area subpages (`/practice-areas/[slug]`).
- Hebrew ↔ English toggle.
- Appointment-booking (Calendly/Cal.com).
- Content migration or 301 redirects from `stavlaw.co.il`.

## 3. Decisions (resolved during brainstorming)

| # | Decision | Choice |
|---|----------|--------|
| Q1 | Domain / SEO strategy | Fresh site, no redirects. Client will point her domain to Vercel. |
| Q2 | Content source | Final copy supplied by client. Build uses visible `TODO:` slots in `content/site.ts`. |
| Q3 | Contact form backend | Resend (API route sends email to `s@stavlaw.co.il`). |
| Q4 | Images | Exported directly from the Figma file via the dev-mode MCP. |
| Q5 | Project location / repo | `/Users/tal/Projects/stavlaw/` → GitHub `wavedev2024/stavlaw`. |
| Q6 | Tech stack | Confirmed opinionated stack (see §5). |

## 4. Architecture

```
stavlaw/
├─ app/
│  ├─ layout.tsx            # <html lang="he" dir="rtl"> + fonts + global SEO + analytics
│  ├─ page.tsx              # Landing — composes section components
│  ├─ sitemap.ts
│  ├─ robots.ts
│  ├─ opengraph-image.tsx   # Dynamic 1200×630 OG image
│  ├─ api/contact/route.ts  # POST → Zod validate → Turnstile verify → Resend
│  └─ not-found.tsx
├─ components/
│  ├─ sections/             # One component per Figma section (see §6)
│  ├─ ui/                   # shadcn primitives (Button, Input, Accordion, Toast, ...)
│  └─ schema/               # JSON-LD builders (Attorney, LocalBusiness, FAQPage, …)
├─ content/
│  └─ site.ts               # SINGLE SOURCE OF TRUTH for all copy. TODO markers here.
├─ lib/
│  ├─ seo.ts                # generateMetadata helpers
│  ├─ analytics.ts          # GA4 + Vercel Analytics wrapper
│  └─ rate-limit.ts         # Upstash-based IP limiter for contact endpoint
├─ public/                  # favicons, manifest.json, og fallback
├─ figma-assets/            # Exported images (committed; sourced via Figma MCP)
├─ tests/
│  └─ smoke.spec.ts         # Playwright: / renders, JSON-LD valid, form submits
├─ .github/workflows/ci.yml # typecheck + build + Playwright on PR
├─ README.md                # Setup, env vars, Search Console verification steps
└─ (Next.js + tsconfig + tailwind.config.ts + etc.)
```

Strict single-source-of-truth: **every visible string is in `content/site.ts`**. Section components import and consume typed content; they contain zero hardcoded text. Client edits copy in one file.

## 5. Tech stack

- **Framework:** Next.js 15 (App Router, RSC by default), React 19, TypeScript (strict).
- **Styling:** Tailwind CSS v4, shadcn/ui for accessible primitives.
- **i18n / RTL:** `<html lang="he" dir="rtl">`, Tailwind logical properties only (`ps-*`, `pe-*`, `ms-*`, `me-*`, `start-*`, `end-*`), `<bdi>` around LTR tokens (phone, email, numbers) inside Hebrew paragraphs.
- **Fonts:** `next/font/google` → **Heebo** (weights 400/500/700/900). Self-hosted, preloaded, `display: swap`, zero layout shift. Substitutes the Figma's "Google Sans" (which lacks a free web licence) with a close Hebrew-capable alternative.
- **Images:** `next/image` everywhere; AVIF + WebP with responsive `sizes`; hero image `priority`; all other images lazy-loaded.
- **Animations:** Framer Motion — subtle fade/slide on scroll reveal, hover on practice-area tiles. Respects `prefers-reduced-motion`.
- **Email:** Resend (API key in Vercel env).
- **Spam protection:** Cloudflare Turnstile (free), server-side verification in the contact route, plus a honeypot field, plus Upstash Redis rate-limit (5 submissions / IP / hour).
- **Analytics:** Vercel Analytics + Google Analytics 4. Cookie banner not required (GA4 with IP anonymisation + no ads features is the standard light-touch setup; revisit if client wants EU-grade consent).
- **Testing:** Playwright smoke test (one file) — homepage 200, all JSON-LD parses and validates, contact form submits end-to-end against a mocked Resend.
- **CI:** GitHub Actions — typecheck + build + Playwright on every PR. Vercel auto-deploys `main` → production and every branch → preview.
- **Package manager:** npm (default; no preference given).

## 6. Sections (top-to-bottom, mirrors Figma)

| # | Component | Content scope | Notes |
|---|-----------|---------------|-------|
| 1 | `<Nav/>` | Logo (SE monogram), nav links (anchor scroll), "צור קשר" CTA | Sticky, translucent backdrop-blur on scroll. |
| 2 | `<Hero/>` | H1, subhead, primary CTA ("לקבלת ייעוץ"), hero photo | One `h1` on the page. LCP element. |
| 3 | `<AboutBrief/>` | Portrait, 2-paragraph bio | Credentials highlighted for schema. |
| 4 | `<PracticeAreas/>` | 6 tiles: labor, civil, real estate, execution, traffic, corporate | Each tile → link to `#` for now; future: `/practice-areas/[slug]`. |
| 5 | `<Process/>` | "איך עובד התהליך" — numbered steps | Vertical connected stepper from Figma. |
| 6 | `<LawyerSpotlight/>` | Full-bleed photo + value-prop copy | Second CTA. |
| 7 | `<Testimonials/>` | Carousel, 3 cards | Real testimonials — client provides final text. Carousel pauses on hover, respects reduced motion. |
| 8 | `<FAQ/>` | Accordion, ≥ 4 Q&A | Drives `FAQPage` JSON-LD. |
| 9 | `<ContactForm/>` | Fields: name, phone, email, message. Submit → `/api/contact` | Inline validation (Zod + react-hook-form). Success toast. |
| 10 | `<Footer/>` | NAP (name/address/phone), WhatsApp, email, hours, copyright | Duplicates LocalBusiness data for crawlers. |
| +  | `<WhatsAppFloat/>` | Fixed corner FAB → `wa.me/972559234062?text=...` | Included by default; can be removed via a flag in `content/site.ts`. |

## 7. Contact form flow

```
User submits form (client, react-hook-form + Zod schema)
  ↓
POST /api/contact { name, phone, email, message, honeypot, turnstileToken }
  ↓
Server: validate schema → reject if honeypot filled
       → verify Turnstile token with Cloudflare
       → rate-limit check (Upstash Redis, 5/IP/hour)
       → Resend.send({ to: CONTACT_TO_EMAIL, from: "noreply@<verified-domain>", reply_to: email, subject, html })
  ↓
200 → client shows Hebrew success toast ("תודה, ניצור איתך קשר בהקדם")
4xx / 5xx → client shows Hebrew error toast with WhatsApp fallback link
```

No user data persisted. Email body renders as a simple branded HTML template (also includes a plaintext alternative).

## 8. SEO implementation

### 8.1 Metadata (per route via `generateMetadata`)
- `title` ≤ 60 chars, `description` ≤ 155 chars — both Hebrew, keyword-researched once client supplies final copy.
- Canonical URL (absolute, HTTPS, no trailing slash).
- OG: `og:title`, `og:description`, `og:image` (1200×630), `og:locale=he_IL`, `og:type=website`.
- Twitter: `summary_large_image`.
- `alternates.canonical` set per page.

### 8.2 JSON-LD (injected on `/`, each as its own `<script type="application/ld+json">`)
- **Attorney** — name, image, url, telephone, email, address, areaServed, knowsLanguage (`he`, `en` if applicable), priceRange, sameAs (social links when provided).
- **LegalService** — one graph node referencing Attorney as provider; `serviceType` array enumerates the 6 practice areas.
- **LocalBusiness** — address (Ben Tzvi 10, Beer Sheva), geo coordinates (to be filled from Google Maps), `openingHours`.
- **Person** — credentials: `hasCredential` for LL.M. Bar-Ilan and bailiff licence.
- **FAQPage** — auto-generated from the FAQ section data.
- **BreadcrumbList** — single crumb on landing; structure ready for future nested pages.
- All schemas emitted from `components/schema/*` builders, unit-type-checked against `schema-dts`.

### 8.3 Crawl / indexation
- `app/sitemap.ts` — all public routes.
- `app/robots.ts` — `Allow: /`, sitemap URL, production-only (previews stay `noindex`).
- `X-Robots-Tag: noindex` on all non-production deployments (middleware + Vercel env check).
- Search Console verification via meta tag (`NEXT_PUBLIC_GSC_VERIFICATION` env var).

### 8.4 Core Web Vitals budget
- **LCP** < 1.8 s (hero image `priority`, Heebo preloaded, no render-blocking JS, CSS in `<head>`).
- **CLS** ≈ 0 (explicit `width`/`height` on every image, font `display: swap` with fallback metrics adjust).
- **INP** < 200 ms (Framer Motion set to GPU-friendly transforms only; no heavy JS on interaction).
- **Lighthouse targets:** Performance ≥ 95, Accessibility ≥ 95, SEO = 100, Best Practices ≥ 95.

### 8.5 Accessibility (ranking factor, not just compliance)
- Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- Exactly one `<h1>`; ordered heading hierarchy.
- `alt` text on every image (Hebrew, descriptive — not keyword-stuffed).
- Visible focus rings, keyboard-navigable accordion + carousel.
- WCAG AA contrast checked on navy-on-beige and orange-on-navy combos from the Figma.

## 9. RTL / Hebrew

- `<html lang="he" dir="rtl">` in `app/layout.tsx`.
- Tailwind config uses logical properties only. An ESLint rule (`no-restricted-syntax` on class strings) forbids physical-direction classes — `pl-*`, `pr-*`, `ml-*`, `mr-*`, `left-*`, `right-*`, `text-left`, `text-right` — in `components/**` and `app/**`.
- Numbers, phone, email wrapped in `<bdi>`; dates formatted with `Intl.DateTimeFormat('he-IL')`.
- Keyboard: Hebrew users' natural Tab order preserved (DOM order = visual RTL order).

## 10. Images

- Exported from the Figma file via `mcp__figma-dev-mode-mcp-server__get_design_context` per node (hero, about portrait, 6 practice-area tiles, lawyer spotlight, testimonials avatar slots, any decorative pattern). Originals committed to `figma-assets/`.
- Rendered through `next/image`; AVIF + WebP generated at build time.
- `alt` text authored per image in `content/site.ts` (Hebrew, descriptive).
- Hero is `priority`; all others lazy.

## 11. Environment variables

| Name | Scope | Purpose |
|------|-------|---------|
| `RESEND_API_KEY` | server | Resend API auth |
| `CONTACT_TO_EMAIL` | server | Destination inbox (default `s@stavlaw.co.il`) |
| `CONTACT_FROM_EMAIL` | server | Verified sender (e.g. `noreply@stavlaw.co.il` once domain verified) |
| `TURNSTILE_SITE_KEY` | client | Cloudflare Turnstile public key |
| `TURNSTILE_SECRET_KEY` | server | Turnstile verification |
| `UPSTASH_REDIS_REST_URL` | server | Rate limit store |
| `UPSTASH_REDIS_REST_TOKEN` | server | Rate limit auth |
| `NEXT_PUBLIC_GA4_ID` | client | GA4 measurement ID |
| `NEXT_PUBLIC_GSC_VERIFICATION` | client | Search Console meta-tag token |
| `NEXT_PUBLIC_SITE_URL` | both | Canonical base URL (for OG/sitemap) |

README documents each, plus the one-time Resend domain verification + GSC + GA4 setup.

## 12. Deployment

- GitHub: new repo `wavedev2024/stavlaw` (private until launch, public if desired).
- Vercel: new project, framework preset = Next.js, region = fra1 (closest to IL audience).
- Production domain: client points her DNS to Vercel when ready.
- Preview deploys on every branch. Previews are `noindex` via middleware.

## 13. Performance budget

- Initial JS ≤ 90 KB gzip on `/`.
- Total image weight ≤ 400 KB on initial viewport (AVIF).
- No third-party script in critical path (GA4 loaded `strategy="afterInteractive"`).

## 14. Testing

One Playwright smoke test covering:
1. `/` returns 200 and HTML includes `<html lang="he" dir="rtl">`.
2. Every JSON-LD `<script>` parses as valid JSON and validates against `schema-dts` types.
3. Contact form submit → POST `/api/contact` with mocked Resend returns 200 and shows success toast.
4. Lighthouse CI run (GitHub Action) asserts Performance ≥ 95, SEO = 100.

## 15. Risks & mitigations

| Risk | Mitigation |
|------|-----------|
| Client copy arrives late → launch delay | Build with typed TODO placeholders; ship with visible "דוגמא" tags if needed; flip real copy via single PR. |
| Resend domain not verified at launch | Use Resend's default sender (`onboarding@resend.dev`) as fallback; swap once domain verified. |
| Figma images are low-res for some tiles | Export at 2× from Figma; upscale only via CSS, not resampling. |
| "Google Sans" licencing in Figma | Substitute Heebo; client signs off on font at first preview. |
| Fresh domain = no initial SEO authority | Submit to GSC day one, acquire links (her existing profiles), ensure structured data is impeccable — this is what "max SEO on a new domain" looks like. |

## 16. Open items (not blocking)

- Exact Hebrew `<title>` / `<description>` pending final copy.
- Geo coordinates for `LocalBusiness` schema pending verification.
- Final testimonial author names (initials? full name?) — client to confirm.
- Whether to include Google Maps embed in Footer (weight vs. value tradeoff).
