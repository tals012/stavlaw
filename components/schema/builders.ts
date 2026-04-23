import { site } from "@/content/site";

type BaseCtx = { baseUrl: string };

export function buildAttorney(ctx: BaseCtx) {
  return {
    "@context": "https://schema.org",
    "@type": "Attorney" as const,
    name: site.brand.name,
    image: `${ctx.baseUrl}/og-fallback.jpg`,
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
    image: `${ctx.baseUrl}/og-fallback.jpg`,
    address: {
      "@type": "PostalAddress" as const,
      streetAddress: site.contact.address.street,
      addressLocality: site.contact.address.city,
      addressCountry: site.contact.address.country,
    },
    openingHours: site.contact.hours,
  };
}

export function buildPerson(ctx: BaseCtx) {
  return {
    "@context": "https://schema.org",
    "@type": "Person" as const,
    name: site.brand.name,
    image: `${ctx.baseUrl}/og-fallback.jpg`,
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
