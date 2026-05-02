"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getResult, results } from "@/data/results";
import { clearAssessment, loadAssessment } from "@/lib/assessment";
import { appendHistory } from "@/lib/history";
import { useLanguage } from "@/lib/language-context";
import { questions } from "@/data/questions";
import LanguageToggle from "@/components/LanguageToggle";
import ScoreRing from "@/components/ScoreRing";
import ShareCard from "@/components/ShareCard";
import ResultSkeleton from "@/components/ResultSkeleton";
import AuroraBackground from "@/components/AuroraBackground";

function ResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, lang } = useLanguage();

  const [mounted, setMounted] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const savedToHistory = useRef(false);

  useEffect(() => {
    setMounted(true);
    const saved = loadAssessment();
    if (saved?.answers) setAnswers(saved.answers);
  }, []);

  const scoreParam = searchParams.get("score");
  const score = scoreParam ? parseInt(scoreParam, 10) : null;

  useEffect(() => {
    if (mounted && (score === null || isNaN(score))) {
      router.push("/");
    }
  }, [mounted, score, router]);

  // Save to history once per result view
  useEffect(() => {
    if (!mounted || score === null || isNaN(score)) return;
    if (savedToHistory.current) return;
    savedToHistory.current = true;
    const status = getResult(score);
    const result = results[status];
    appendHistory({
      score,
      status,
      label: result.label.en,
      date: new Date().toISOString(),
    });
  }, [mounted, score]);

  if (!mounted || score === null || isNaN(score)) return <ResultSkeleton />;

  const status = getResult(score);
  const result = results[status];

  const handleRestart = () => {
    clearAssessment();
    router.push("/");
  };

  const statusBg: Record<string, string> = {
    stable: "border-green-400/25",
    "at-risk": "border-yellow-400/25",
    critical: "border-red-400/25",
  };

  // Group answers into dimensions for the breakdown
  const dimensions = [
    { label: { en: "Communication", hi: "बातचीत" }, qIndexes: [0, 3] },
    { label: { en: "Trust", hi: "भरोसा" }, qIndexes: [2, 8] },
    { label: { en: "Respect", hi: "सम्मान" }, qIndexes: [4, 7] },
    { label: { en: "Connection", hi: "जुड़ाव" }, qIndexes: [1, 6] },
    { label: { en: "Future", hi: "भविष्य" }, qIndexes: [5, 9] },
  ];

  return (
    <AuroraBackground>
      <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5">
        <button
          onClick={handleRestart}
          className="text-white/40 hover:text-white transition-colors text-sm pointer-events-auto relative z-10"
        >
          ←&nbsp;{t("Home", "होम")}
        </button>
        <span className="text-[#ffffff] font-semibold tracking-wide text-lg">
          {lang === "en" ? "Saath" : "साथ"}<span className="text-rose-400">.</span>
        </span>
        <LanguageToggle />
      </header>

      <div className="flex-1 px-6 max-w-lg mx-auto w-full pb-14 space-y-6">

        {/* Score ring + label */}
        <div className={`rounded-3xl border bg-[#1a1625] p-6 flex flex-col items-center animate-fade-up ${statusBg[status]}`}>
          <ScoreRing
            score={score}
            maxScore={30}
            color={result.color}
            label={lang === "en" ? result.label.en : result.label.hi}
            sublabel={t("Your clarity score", "आपका क्लैरिटी स्कोर")}
          />
        </div>

        {/* Description */}
        <div className="animate-fade-up-delay-1">
          <p className="text-white/65 text-base leading-relaxed">
            {lang === "en" ? result.description.en : result.description.hi}
          </p>
        </div>

        {/* Dimension breakdown */}
        {answers.length === questions.length && (
          <div className="animate-fade-up-delay-1">
            <h3 className="text-white/30 text-xs uppercase tracking-widest mb-4">
              {t("Dimension Breakdown", "आयामों का विश्लेषण")}
            </h3>
            <div className="space-y-3">
              {dimensions.map((dim) => {
                const dimScore = dim.qIndexes.reduce(
                  (sum, qi) => sum + (answers[qi] ?? 0),
                  0
                );
                const dimMax = dim.qIndexes.length * 3;
                const pct = Math.round((dimScore / dimMax) * 100);
                const barColor =
                  pct >= 67
                    ? "#4ade80"
                    : pct >= 34
                    ? "#facc15"
                    : "#f87171";

                return (
                  <div key={dim.label.en}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-white/60 text-sm">
                        {lang === "en" ? dim.label.en : dim.label.hi}
                      </span>
                      <span className="text-white/30 text-xs tabular-nums">
                        {dimScore}/{dimMax}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-white/8 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: barColor,
                          transitionDelay: "400ms",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="animate-fade-up-delay-2">
          <p className="text-[#8b7fa8] text-xs uppercase tracking-widest mb-2">
            {t("Your Journey", "आपकी यात्रा")}
          </p>
          <div className="space-y-3">
            {(
              [
                {
                  key: "improve",
                  labelEn: "Improve",
                  labelHi: "सुधारें",
                  icon: "↑",
                },
                {
                  key: "reassess",
                  labelEn: "Reassess",
                  labelHi: "फिर से सोचें",
                  icon: "↻",
                },
                {
                  key: "prepare",
                  labelEn: "Prepare",
                  labelHi: "तैयारी करें",
                  icon: "→",
                },
              ] as const
            ).map(({ key, labelEn, labelHi, icon }) => (
              <div
                key={key}
                className="bg-white/4 border border-white/8 rounded-2xl p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-white/25 text-xs">{icon}</span>
                  <h1 className="text-2xl font-bold text-[#ffffff]">
                    {t(labelEn, labelHi)}
                  </h1>
                </div>
                <p className="text-[#a89db5] text-sm mt-1">
                  {lang === "en"
                    ? result.actions[key].en
                    : result.actions[key].hi}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA buttons */}
        <div className="space-y-3 animate-fade-up-delay-3">
          {/* Journal */}
          <button
            onClick={() => router.push("/journal")}
            className="w-full bg-white/8 border border-white/12 hover:bg-white/12 hover:border-white/20 text-white/80 hover:text-white text-base py-4 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 pointer-events-auto relative z-10"
          >
            <span className="text-rose-400">✦</span>
            {t("Open Reflection Journal", "डायरी खोलें")}
          </button>

          {/* History */}
          <button
            onClick={() => router.push("/history")}
            className="w-full bg-white/5 border border-white/10 hover:bg-white/8 hover:border-white/15 text-white/60 hover:text-white/80 text-base py-4 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 pointer-events-auto relative z-10"
          >
            <span className="text-white/30">📊</span>
            {t("View Assessment History", "परीक्षण इतिहास देखें")}
          </button>

          {/* Share */}
          <ShareCard
            status={status}
            score={score}
            label={lang === "en" ? result.label.en : result.label.hi}
            color={result.color}
            emoji={result.emoji}
          />

          {/* Restart */}
          <button
            onClick={handleRestart}
            className="w-full border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 text-sm py-4 rounded-2xl transition-all duration-200"
          >
            {t("Take Assessment Again", "फिर से परीक्षण करें")}
          </button>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-white/20 text-xs leading-relaxed">
          {t(
            "This result is for self-reflection only. Please seek professional help if needed.",
            "यह परिणाम केवल आत्म-चिंतन के लिए है। ज़रूरत हो तो किसी विशेषज्ञ से ज़रूर मिलें।"
          )}
        </p>
      </div>
    </main>
    </AuroraBackground>
  );
}

export default function ResultPage() {
  return (
    <AuroraBackground>
      <Suspense fallback={<div className="min-h-screen relative overflow-hidden" style={{backgroundColor: '#0d0d12'}} />}>
        <ResultContent />
      </Suspense>
    </AuroraBackground>
  );
}
