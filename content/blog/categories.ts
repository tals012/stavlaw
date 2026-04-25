import type { Category } from "./types";

export const categories: Category[] = [
  {
    slug: "piturim",
    name: "פיטורים ושימוע",
    description: "מאמרים על פיטורים שלא כדין, הליך שימוע, התפטרות בדין מפוטר ופיצויי פיטורים.",
  },
  {
    slug: "sachar",
    name: "שכר וזכויות",
    description: "שעות נוספות, פנסיה, פיצויים, דמי הבראה - מיצוי זכויות שכר וסוציאליות.",
  },
  {
    slug: "harasament",
    name: "התעמרות והטרדה",
    description: "התעמרות בעבודה, הטרדה מינית, סביבת עבודה עוינת - דרכי טיפול ופיצוי.",
  },
  {
    slug: "heriyon",
    name: "הריון ולידה",
    description: "זכויות עובדות בהריון, פיטורים בהיריון, חופשת לידה והוראות חוק עבודת נשים.",
  },
  {
    slug: "maamad",
    name: "מעמד והתקשרות",
    description: "פרילנסרים, יחסי עובד-מעביד, עובדים זרים, חוזי העסקה ומעבר ממעמד למעמד.",
  },
];

export const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));
