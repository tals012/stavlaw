export type PracticeAreaEntry = {
  slug: string;
  title: string;
  blurb: string;
  imageAlt: string;
};

export type FAQEntry = { q: string; a: string };

export type TestimonialEntry = { quote: string; author: string; caseType: string; imageSlug?: string };

export type ProcessStepEntry = { n: number; title: string; blurb: string };

export type Dictionary = {
  nav: {
    about: string;
    practiceAreas: string;
    process: string;
    testimonials: string;
    whyMe: string;
    faq: string;
    contact: string;
    homeAria: string;
  };
  cta: {
    consult: string;
  };
  languageSwitcher: {
    label: string;
  };
  brand: { name: string; initials: string };
  hero: {
    h1Line1: string;
    h1Line2Pre: string;
    h1Line2Underline: string;
    subLight: string;
    subBold: string;
    ctaLabel: string;
    pills: Array<{ label: string; position: "name" | "top" | "mid" | "bottom" }>;
    scriptAside: string;
  };
  about: {
    paragraphs: string[];
    portraitAlt: string;
    scriptEyebrow: string;
    introParagraph: string;
    greeting: string;
    namePlate: string;
    signature: string;
  };
  practiceAreas: {
    eyebrow: string;
    heading: string;
    sub: string;
    panelHeading: string;
    panelBody: string;
    items: PracticeAreaEntry[];
  };
  process: {
    heading: string;
    sub: string;
    eyebrow: string;
    steps: ProcessStepEntry[];
  };
  spotlight: { headline: string; body: string; ctaLabel: string };
  testimonials: {
    eyebrow: string;
    heading: string;
    prev: string;
    next: string;
    slideLabel: (n: number) => string;
    items: TestimonialEntry[];
  };
  faq: {
    eyebrow: string;
    heading: string;
    bottomPrompt: string;
    bottomCta: string;
    items: FAQEntry[];
  };
  contact: {
    eyebrow: string;
    headingLine1: string;
    headingLine2: string;
    sub: string;
    whatsappMessage: string;
    form: {
      namePlaceholder: string;
      phonePlaceholder: string;
      emailPlaceholder: string;
      messagePlaceholder: string;
      disclaimer: string;
      submit: string;
      submitting: string;
      successToast: string;
      errorToast: string;
    };
  };
  whyMe: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    cards: Array<{ n: string; title: string; body: string }>;
    prev: string;
    next: string;
    dotLabel: (n: number) => string;
  };
  knowFirsthand: {
    eyebrow: string;
    body: string;
  };
  footer: {
    termsLabel: string;
    privacyLabel: string;
    copyright: string;
    designedBy: string;
    builtBy: string;
  };
};
