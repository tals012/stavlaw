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
