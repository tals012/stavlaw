# stavlaw

Landing page for משרד עו"ד סתיו שוקרון. Next.js 16, RTL Hebrew, deployed on Vercel.

## Develop

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Test

```bash
npm test          # unit (vitest)
npm run test:e2e  # end-to-end (Playwright)
```

## Deploy

Push to `main` → Vercel auto-deploys production. Any branch → preview (noindexed via `middleware.ts`).

## Environment variables

See `.env.example`. Required for production:

- `RESEND_API_KEY` (and a verified sender domain in the Resend dashboard)
- `TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY`
- `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GA4_ID`
- `NEXT_PUBLIC_GSC_VERIFICATION`

## Content

All visible copy lives in `content/site.ts`. Replace every `TODO:` before launch.

## Search Console setup

1. Set `NEXT_PUBLIC_GSC_VERIFICATION` to the meta-tag token from https://search.google.com/search-console
2. Deploy to production
3. Verify ownership, then submit `/sitemap.xml`

## Resend domain setup

1. Add your domain in the Resend dashboard (https://resend.com/domains)
2. Configure the DNS records Resend provides (SPF + DKIM + return-path)
3. Set `CONTACT_FROM_EMAIL` to an address on that domain
