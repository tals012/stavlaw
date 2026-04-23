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
