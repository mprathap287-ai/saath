"use client";

import { questions } from "@/data/questions";
import { useLanguage } from "@/lib/language-context";

type AnswerReviewProps = {
  answers: number[];
  onConfirm: () => void;
  onBack: () => void;
};

export default function AnswerReview({ answers, onConfirm, onBack }: AnswerReviewProps) {
  const { t, lang } = useLanguage();

  return (
    <div className="flex-1 flex flex-col px-6 max-w-lg mx-auto w-full pb-10">
      <p className="text-white/30 text-xs tracking-[0.15em] uppercase mb-3">
        {t("Review Your Answers", "अपने जवाब देखें")}
      </p>
      <h2 className="text-2xl font-semibold mb-6 text-white">
        {t("Does this look right?", "क्या यह सही है?")}
      </h2>

      <div className="space-y-2 mb-8 overflow-y-auto flex-1">
        {questions.map((q, i) => {
          const score = answers[i];
          const option = q.options.find((o) => o.score === score);
          return (
            <div
              key={q.id}
              className="bg-white/5 border border-white/8 rounded-2xl px-4 py-3 flex items-start gap-3"
            >
              <span className="text-white/20 text-xs mt-0.5 w-4 flex-shrink-0">
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="text-white/50 text-xs leading-snug mb-1 truncate">
                  {lang === "en" ? q.en : q.hi}
                </p>
                <p className="text-white/90 text-sm font-medium">
                  {option ? (lang === "en" ? option.en : option.hi) : "—"}
                </p>
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5 ${
                  score === 3
                    ? "bg-green-400/15 text-green-400"
                    : score === 2
                    ? "bg-yellow-400/15 text-yellow-400"
                    : score === 1
                    ? "bg-orange-400/15 text-orange-400"
                    : "bg-red-400/15 text-red-400"
                }`}
              >
                {score}/3
              </span>
            </div>
          );
        })}
      </div>

      <div className="space-y-3">
        <button
          onClick={onConfirm}
          className="w-full bg-white text-black font-semibold text-base py-5 rounded-2xl hover:bg-white/90 active:scale-[0.98] transition-all duration-150"
        >
          {t("Get My Result", "परिणाम देखें")} →
        </button>
        <button
          onClick={onBack}
          className="w-full border border-white/10 text-white/50 hover:text-white hover:border-white/30 text-base py-4 rounded-2xl transition-all duration-200"
        >
          {t("Edit Answers", "जवाब बदलें")}
        </button>
      </div>
    </div>
  );
}
