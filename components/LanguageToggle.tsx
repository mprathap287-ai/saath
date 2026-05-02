"use client";

import { useLanguage } from "@/lib/language-context";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1">
      <button
        onClick={() => setLang("en")}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
          lang === "en"
            ? "bg-white text-black"
            : "text-white/50 hover:text-white/80"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("hi")}
        className={`px-3 py-1 rounded-full text-sm font-mono transition-all duration-200 ${
          lang === "hi"
            ? "bg-white text-black"
            : "text-white/50 hover:text-white/80"
        }`}
      >
        हि
      </button>
    </div>
  );
}
