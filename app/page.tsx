"use client";

import { useRouter } from "next/navigation";
import { clearAssessment } from "@/lib/assessment";
import { useLanguage } from "@/lib/language-context";
import LanguageToggle from "@/components/LanguageToggle";
import AuroraBackground from "@/components/AuroraBackground";

const STEPS = [
  {
    n: "01",
    en: "Pick your language and answer 10 honest questions.",
    hi: "भाषा चुनें और 10 सच्चे सवालों के जवाब दें।",
  },
  {
    n: "02",
    en: "Review your answers, then see your clarity score.",
    hi: "अपने जवाब देखें, फिर अपना क्लैरिटी स्कोर जानें।",
  },
  {
    n: "03",
    en: "Get a breakdown + 3 concrete next steps.",
    hi: "आयाम-वार विश्लेषण और 3 ठोस अगले कदम पाएं।",
  },
];

export default function Home() {
  const router = useRouter();
  const { t, lang } = useLanguage();

  const handleStart = () => {
    clearAssessment();
    router.push("/assessment");
  };

  return (
    <AuroraBackground>
      <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5">
        <span className="text-[#ffffff] font-semibold tracking-wide text-lg">
          {lang === "en" ? "Saath" : "साथ"}<span className="text-rose-400">.</span>
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/journal")}
            className="text-white/30 hover:text-white/70 text-xs transition-colors pointer-events-auto relative z-10"
          >
            {t("Journal", "डायरी")}
          </button>
          <button
            onClick={() => router.push("/history")}
            className="text-white/30 hover:text-white/70 text-xs transition-colors pointer-events-auto relative z-10"
          >
            {t("History", "इतिहास")}
          </button>
          <LanguageToggle />
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col justify-center px-6 pb-4 max-w-lg mx-auto w-full">
        {/* Eyebrow */}
        <p className="text-[#ffffff] text-xs tracking-[0.2em] uppercase mb-6 animate-fade-up">
          {t("Private · Honest · Bilingual", "निजी · ईमानदार · द्विभाषिक")}
        </p>

        {/* Headline */}
        <h1 className="text-4xl font-bold leading-tight mb-4 animate-fade-up-delay-1 text-[#ffffff]">
          {lang === "en" ? (
            <>
              Feeling stuck in your{" "}
              <span className="text-[#c084a0]">relationship?</span>
            </>
          ) : (
            <>
              क्या आप अपने रिश्ते में{" "}
              <span className="text-[#c084a0]">उलझन</span> महसूस कर रहे हैं?
            </>
          )}
        </h1>

        {/* Subtext */}
        <p className="text-[#a89db5] text-base leading-relaxed mb-10 animate-fade-up-delay-2">
          {t(
            "Saath helps you see your relationship clearly — no judgment, no advice. Just honest clarity.",
            "साथ आपको आपके रिश्ते को साफ़ नज़रिए से देखने में मदद करता है — बिना किसी फ़ैसले के, बस सच्ची समझ।"
          )}
        </p>

        {/* CTA */}
        <button
          onClick={handleStart}
          className="w-full font-semibold text-lg py-5 rounded-2xl active:scale-[0.98] transition-all duration-150 animate-fade-up-delay-3 text-[#ffffff]"
          style={{background: 'linear-gradient(to right, #7c3a5e, #4a2060)'}}
        >
          {t("Start Assessment", "शुरुआत करें")}
          <span className="ml-2 opacity-50">→</span>
        </button>

        {/* Trust pills */}
        <div className="flex items-center justify-center gap-3 mt-5 animate-fade-up-delay-4 flex-wrap">
          {[
            { en: "10 questions", hi: "10 सवाल" },
            { en: "Anonymous", hi: "गुमनाम" },
            { en: "~3 minutes", hi: "~3 मिनट" },
          ].map((pill) => (
            <span
              key={pill.en}
              className="text-[#a89db5] text-xs border border-white/10 rounded-full px-3 py-1"
            >
              {t(pill.en, pill.hi)}
            </span>
          ))}
        </div>

        {/* How it works */}
        <div className="mt-14 animate-fade-up-delay-4">
          <p className="text-[#8b7fa8] text-xs uppercase tracking-widest mb-5">
            {t("How it works", "कैसे काम करता है")}
          </p>
          <div className="space-y-4">
            {STEPS.map((step) => (
              <div key={step.n} className="flex items-start gap-4">
                <span className="text-[#8b7fa8] text-xs font-mono mt-0.5 flex-shrink-0 w-6">
                  {step.n}
                </span>
                <p className="text-[#a89db5] text-sm leading-relaxed">
                  {t(step.en, step.hi)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-5 text-center">
        <p className="text-[#a89db5] text-xs">
          {t(
            "Your answers are never stored or shared.",
            "आपके जवाब कभी सेव या शेयर नहीं किए जाते।"
          )}
        </p>
      </footer>
    </main>
    </AuroraBackground>
  );
}
