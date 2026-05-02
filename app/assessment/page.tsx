"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/data/questions";
import { saveAssessment, computeScore } from "@/lib/assessment";
import { useLanguage } from "@/lib/language-context";
import ProgressBar from "@/components/ProgressBar";
import OptionButton from "@/components/OptionButton";
import LanguageToggle from "@/components/LanguageToggle";
import AnswerReview from "@/components/AnswerReview";
import AuroraBackground from "@/components/AuroraBackground";

type Screen = "question" | "review";

export default function AssessmentPage() {
  const router = useRouter();
  const { t, lang } = useLanguage();

  const [screen, setScreen] = useState<Screen>("question");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  useEffect(() => {
    setSelected(answers[currentIndex] ?? null);
  }, [currentIndex, answers]);

  const handleNext = useCallback(() => {
    if (selected === null) return;

    const newAnswers = [...answers];
    newAnswers[currentIndex] = selected;
    setAnswers(newAnswers);

    if (isLast) {
      setScreen("review");
      return;
    }

    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setAnimating(false);
    }, 150);
  }, [selected, answers, currentIndex, isLast]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (screen !== "question") return;
      const num = parseInt(e.key);
      if (num >= 1 && num <= 4) {
        const option = questions[currentIndex].options[num - 1];
        if (option) setSelected(option.score);
      }
      if (e.key === "Enter") handleNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [screen, currentIndex, handleNext]);

  const handleBack = () => {
    if (screen === "review") {
      setScreen("question");
      return;
    }
    if (currentIndex === 0) {
      router.push("/");
      return;
    }
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => prev - 1);
      setAnimating(false);
    }, 150);
  };

  const handleConfirmResult = () => {
    const score = computeScore(answers);
    saveAssessment({ answers, currentQuestion: currentIndex, totalScore: score });
    router.push(`/result?score=${score}`);
  };

  return (
    <AuroraBackground>
      <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5">
        <button
          onClick={handleBack}
          className="text-white/40 hover:text-white transition-colors text-sm flex items-center gap-1 relative z-10"
        >
          ←&nbsp;{t("Back", "वापस")}
        </button>
        <span className="text-[#ffffff] font-semibold tracking-wide text-lg">
          {lang === "en" ? "Saath" : "साथ"}<span className="text-rose-400">.</span>
        </span>
        <LanguageToggle />
      </header>

      {/* Progress */}
      {screen === "question" && (
        <div className="px-6 mb-8">
          <ProgressBar current={currentIndex + 1} total={questions.length} />
        </div>
      )}
      {screen === "review" && (
        <div className="px-6 mb-6">
          <div className="w-full h-1 bg-rose-400 rounded-full" />
          <p className="text-[#8b7fa8] text-xs uppercase tracking-widest mb-2">
            {t("Question", "सवाल")} {currentIndex + 1} {t("of", "का")} {questions.length}
          </p>
        </div>
      )}

      {/* Review screen */}
      {screen === "review" ? (
        <AnswerReview
          answers={answers}
          onConfirm={handleConfirmResult}
          onBack={() => setScreen("question")}
        />
      ) : (
        <div
          className={`flex-1 flex flex-col px-6 max-w-lg mx-auto w-full transition-opacity duration-150 ${
            animating ? "opacity-0" : "opacity-100"
          }`}
        >
          <p className="text-[#a89db5] text-base leading-relaxed mb-6">
            {t(`Question ${currentIndex + 1}`, `सवाल ${currentIndex + 1}`)}
          </p>

          <h2 className="text-2xl font-bold text-[#ffffff] mb-4">
            {lang === "en" ? question.en : question.hi}
          </h2>

          <div className="space-y-3 mb-10">
            {question.options.map((option, i) => (
              <OptionButton
                key={i}
                label={lang === "en" ? option.en : option.hi}
                selected={selected === option.score}
                onClick={() => setSelected(option.score)}
                shortcut={i + 1}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={selected === null}
            className={`w-full py-5 rounded-2xl font-semibold text-base transition-all duration-200 relative z-10
              ${
                selected !== null
                  ? "bg-white text-black hover:bg-white/90 active:scale-[0.98]"
                  : "bg-white/10 text-white/30 cursor-not-allowed"
              }
            `}
          >
            {isLast ? t("Review Answers", "जवाब देखें") : t("Next", "आगे")}
            {selected !== null && <span className="ml-2 opacity-50">→</span>}
          </button>

          <p className="text-center text-white/15 text-xs mt-4 hidden md:block">
            {t(
              "Press 1–4 to select · Enter to continue",
              "1–4 दबाएं चुनने के लिए · Enter जारी रखने के लिए"
            )}
          </p>
        </div>
      )}

      <div className="h-10" />
    </main>
    </AuroraBackground>
  );
}
