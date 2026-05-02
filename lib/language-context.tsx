"use client";

import React, { createContext, useContext, useState } from "react";

export type Language = "en" | "hi";

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (en: string, hi: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (en) => en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  const t = (en: string, hi: string) => (lang === "en" ? en : hi);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
