import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { LOCALES, LOCALE_META, TRANSLATIONS, getPath, type Locale } from "./translations";

const STORAGE_KEY = "velsatis_locale";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  dir: "ltr" | "rtl";
};

const I18nContext = createContext<Ctx | null>(null);

function format(str: string, vars?: Record<string, string | number>) {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && (LOCALES as readonly string[]).includes(saved)) {
        setLocaleState(saved as Locale);
      }
    } catch {}
  }, []);

  useEffect(() => {
    const meta = LOCALE_META[locale];
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
      document.documentElement.dir = meta.dir;
    }
  }, [locale]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch {}
  };

  const value = useMemo<Ctx>(() => {
    const dict = TRANSLATIONS[locale];
    const fallback = TRANSLATIONS.en;
    return {
      locale,
      setLocale,
      dir: LOCALE_META[locale].dir,
      t: (key, vars) => {
        const v = getPath(dict, key) ?? getPath(fallback, key) ?? key;
        return typeof v === "string" ? format(v, vars) : key;
      },
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}

export function useT() {
  return useI18n().t;
}

export function useTList<T = any>(key: string, fallback: T[] = []): T[] {
  const { locale } = useI18n();
  const dict = TRANSLATIONS[locale];
  const v = getPath(dict, key) ?? getPath(TRANSLATIONS.en, key) ?? fallback;
  return Array.isArray(v) ? v : fallback;
}

export function useTObject<T = any>(key: string): T | undefined {
  const { locale } = useI18n();
  const dict = TRANSLATIONS[locale];
  return (getPath(dict, key) ?? getPath(TRANSLATIONS.en, key)) as T | undefined;
}
