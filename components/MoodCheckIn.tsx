"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";

const MOOD_KEY = "saath_mood";

type MoodEntry = {
  date: string; // YYYY-MM-DD
  value: number; // 1–5
};

const MOODS = [
  { value: 1, emoji: "😔", en: "Very low", hi: "बहुत बुरा" },
  { value: 2, emoji: "😕", en: "Low", hi: "थोड़ा बुरा" },
  { value: 3, emoji: "😐", en: "Neutral", hi: "ठीक-ठाक" },
  { value: 4, emoji: "🙂", en: "Good", hi: "अच्छा" },
  { value: 5, emoji: "😊", en: "Great", hi: "बहुत अच्छा" },
];

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function MoodCheckIn() {
  const { t } = useLanguage();
  const [history, setHistory] = useState<MoodEntry[]>([]);
  const [todayMood, setTodayMood] = useState<number | null>(null);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(MOOD_KEY);
      const parsed: MoodEntry[] = raw ? JSON.parse(raw) : [];
      setHistory(parsed);
      const today = parsed.find((e) => e.date === todayStr());
      if (today) setTodayMood(today.value);
    } catch {
      setHistory([]);
    }
  }, []);

  const handleSelect = (value: number) => {
    const today = todayStr();
    const updated = [
      { date: today, value },
      ...history.filter((e) => e.date !== today),
    ].slice(0, 30);
    setHistory(updated);
    setTodayMood(value);
    localStorage.setItem(MOOD_KEY, JSON.stringify(updated));
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  // Last 7 days for mini chart
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().slice(0, 10);
    const entry = history.find((e) => e.date === key);
    return { key, value: entry?.value ?? null };
  });

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-white/30 text-xs uppercase tracking-widest">
          {t("Today's Mood", "आज का मूड")}
        </p>
        {justSaved && (
          <span className="text-green-400 text-xs animate-fade-up">
            {t("Saved ✓", "सेव ✓")}
          </span>
        )}
      </div>

      {/* Emoji selector */}
      <div className="flex justify-between gap-1 mb-4">
        {MOODS.map((mood) => (
          <button
            key={mood.value}
            onClick={() => handleSelect(mood.value)}
            title={t(mood.en, mood.hi)}
            className={`flex-1 flex flex-col items-center py-2 rounded-xl transition-all duration-200 ${
              todayMood === mood.value
                ? "bg-white/15 scale-110"
                : "hover:bg-white/8"
            }`}
          >
            <span className="text-xl leading-none">{mood.emoji}</span>
          </button>
        ))}
      </div>

      {/* 7-day mini bar chart */}
      {history.length > 0 && (
        <div>
          <p className="text-white/20 text-xs mb-2">
            {t("Last 7 days", "पिछले 7 दिन")}
          </p>
          <div className="flex items-end gap-1 h-8">
            {last7.map(({ key, value }) => (
              <div key={key} className="flex-1 flex flex-col justify-end h-full">
                <div
                  className="rounded-sm transition-all duration-500"
                  style={{
                    height: value ? `${(value / 5) * 100}%` : "4px",
                    backgroundColor: value
                      ? value >= 4
                        ? "#4ade80"
                        : value === 3
                        ? "#facc15"
                        : "#f87171"
                      : "rgba(255,255,255,0.06)",
                    minHeight: "4px",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
