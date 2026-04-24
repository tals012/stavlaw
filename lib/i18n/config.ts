export type LocaleCode = "he" | "en" | "ru" | "ar";

export type LocaleMeta = {
  code: LocaleCode;
  nativeName: string;
  englishName: string;
  dir: "rtl" | "ltr";
};

export const LOCALES: LocaleMeta[] = [
  { code: "he", nativeName: "עברית", englishName: "Hebrew", dir: "rtl" },
  { code: "en", nativeName: "English", englishName: "English", dir: "ltr" },
  { code: "ru", nativeName: "Русский", englishName: "Russian", dir: "ltr" },
  { code: "ar", nativeName: "العربية", englishName: "Arabic", dir: "rtl" },
];

export const DEFAULT_LOCALE: LocaleCode = "he";

export const LOCALE_STORAGE_KEY = "stavlaw.locale";

export function getLocaleMeta(code: LocaleCode): LocaleMeta {
  return LOCALES.find((l) => l.code === code) ?? LOCALES[0]!;
}
