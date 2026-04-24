"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_STORAGE_KEY,
  getLocaleMeta,
  type LocaleCode,
  type LocaleMeta,
} from "./config";
import { DICTIONARIES } from "./dictionaries";
import type { Dictionary } from "./types";

type LocaleContextValue = {
  locale: LocaleCode;
  meta: LocaleMeta;
  dict: Dictionary;
  setLocale: (code: LocaleCode) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleCode>(DEFAULT_LOCALE);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY) as LocaleCode | null;
      if (stored && LOCALES.some((l) => l.code === stored)) {
        setLocaleState(stored);
      }
    } catch {
      // ignore storage access errors
    }
  }, []);

  useEffect(() => {
    const meta = getLocaleMeta(locale);
    document.documentElement.lang = meta.code;
    document.documentElement.dir = meta.dir;
  }, [locale]);

  const setLocale = useCallback((code: LocaleCode) => {
    setLocaleState(code);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, code);
    } catch {
      // ignore storage access errors
    }
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      meta: getLocaleMeta(locale),
      dict: DICTIONARIES[locale],
      setLocale,
    }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within <LocaleProvider>");
  return ctx;
}
