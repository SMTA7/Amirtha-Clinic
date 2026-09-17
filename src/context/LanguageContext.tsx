"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import enDictionary from "@/locales/en.json";
import taDictionary from "@/locales/ta.json";

export type Locale = "en" | "ta";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (path: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const dictionaries: Record<Locale, Record<string, unknown>> = {
  en: enDictionary,
  ta: taDictionary,
};

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const savedLocale = localStorage.getItem("amritha_clinic_locale") as Locale | null;
      if (savedLocale === "en" || savedLocale === "ta") {
        setLocaleState(savedLocale);
      } else {
        const browserLang = typeof navigator !== "undefined" ? navigator.language : "";
        if (browserLang.toLowerCase().startsWith("ta")) {
          setLocaleState("ta");
        }
      }
    } catch {
      // Fallback gracefully if localStorage is unavailable
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem("amritha_clinic_locale", newLocale);
      document.documentElement.lang = newLocale;
    } catch {
      // ignore
    }
  };

  const toggleLocale = () => {
    setLocale(locale === "en" ? "ta" : "en");
  };

  const t = (path: string, fallback?: string): string => {
    const currentDict = dictionaries[locale];
    const val = getNestedValue(currentDict, path);
    if (typeof val === "string") return val;

    // Fallback to English dictionary if key missing in Tamil
    if (locale !== "en") {
      const enVal = getNestedValue(dictionaries.en, path);
      if (typeof enVal === "string") return enVal;
    }

    return fallback ?? path;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale, t }}>
      <div className={locale === "ta" ? "font-tamil-safe" : "font-sans-safe"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
