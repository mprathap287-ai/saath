"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import LanguageToggle from "@/components/LanguageToggle";
import MoodCheckIn from "@/components/MoodCheckIn";
import AuroraBackground from "@/components/AuroraBackground";

const JOURNAL_KEY = "saath_journal";

type JournalEntry = {
  id: string;
  text: string;
  date: string;
  prompt: { en: string; hi: string };
};

const PROMPTS: { en: string; hi: string }[] = [
  {
    en: "What is one thing you wish your partner understood about you?",
    hi: "एक बात क्या है जो आप चाहते हैं कि आपका साथी आपके बारे में समझे?",
  },
  {
    en: "When did you last feel truly happy in this relationship?",
    hi: "इस रिश्ते में आप आखिरी बार कब सच में खुश थे?",
  },
  {
    en: "What would you tell your past self about this relationship?",
    hi: "इस रिश्ते के बारे में आप अपने पुराने आप को क्या बताते?",
  },
  {
    en: "What does a healthy relationship look like to you?",
    hi: "आपके लिए एक अच्छा रिश्ता कैसा दिखता है?",
  },
  {
    en: "What is one boundary you need to set or communicate?",
    hi: "एक सीमा क्या है जो आपको तय करनी या बतानी है?",
  },
  {
    en: "What are you grateful for in your life right now?",
    hi: "इस वक्त आपकी ज़िंदगी में आप किस बात के लिए शुक्रगुज़ार हैं?",
  },
  {
    en: "What would a supportive relationship feel like to you?",
    hi: "एक सहयोगी रिश्ता आपके लिए कैसा महसूस होगा?",
  },
];

function getTodayPrompt(): { en: string; hi: string } {
  const day = new Date().getDay();
  return PROMPTS[day % PROMPTS.length];
}

export default function JournalPage() {
  const router = useRouter();
  const { t, lang } = useLanguage();

  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const todayPrompt = getTodayPrompt();

  useEffect(() => {
    const raw = localStorage.getItem(JOURNAL_KEY);
    if (raw) {
      try {
        setEntries(JSON.parse(raw));
      } catch {
        setEntries([]);
      }
    }
  }, []);

  const handleSave = () => {
    if (!text.trim()) return;
    const entry: JournalEntry = {
      id: Date.now().toString(),
      text: text.trim(),
      date: new Date().toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      prompt: todayPrompt,
    };
    const updated = [entry, ...entries];
    setEntries(updated);
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(updated));
    setText("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleDelete = (id: string) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(updated));
    if (expandedId === id) setExpandedId(null);
  };

  return (
    <AuroraBackground>
      <main className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-5">
          <button
            onClick={() => router.push("/")}
            className="text-[#ffffff] hover:text-[#ffffff] transition-colors text-sm pointer-events-auto relative z-10"
          >
            ←&nbsp;{t("Home", "होम")}
          </button>
          <span className="text-[#ffffff] font-semibold tracking-wide text-lg">
            {lang === "en" ? "Saath" : "साथ"}<span className="text-rose-400">.</span>
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/history")}
              className="text-[#ffffff]/60 hover:text-[#ffffff] text-xs transition-colors pointer-events-auto relative z-10"
            >
              {t("History", "इतिहास")}
            </button>
            <LanguageToggle />
          </div>
        </header>

      <div className="flex-1 px-6 max-w-lg mx-auto w-full pb-16">
        {/* Title */}
        <div className="mb-6 animate-fade-up">
          <p className="text-[#8b7fa8] text-xs uppercase tracking-widest mb-2">
            {t("Private Journal", "निजी डायरी")}
          </p>
          <h1 className="text-2xl font-bold text-[#ffffff]">
            {t("Your Reflections", "आपके विचार")}
          </h1>
          <p className="text-[#a89db5] text-sm mt-1">
            {t(
              "Stored only on this device. Never shared.",
              "केवल इस डिवाइस पर। कभी शेयर नहीं।"
            )}
          </p>
        </div>

        {/* Mood check-in */}
        <div className="animate-fade-up-delay-1">
          <MoodCheckIn />
        </div>

        {/* Today's prompt */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4 animate-fade-up-delay-1">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-2">
            {t("Today's Prompt", "आज का सवाल")}
          </p>
          <p className="text-white/80 text-base leading-relaxed">
            {lang === "en" ? todayPrompt.en : todayPrompt.hi}
          </p>
        </div>

        {/* Text input */}
        <div className="mb-4 animate-fade-up-delay-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t(
              "Write freely. This is only for you…",
              "खुलकर लिखें। यह सिर्फ आपके लिए है…"
            )}
            rows={5}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-white/80 placeholder-white/20 text-base leading-relaxed resize-none focus:outline-none focus:border-white/25 transition-colors duration-200"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-white/20 text-xs">{text.length} chars</span>
            <button
              onClick={handleSave}
              disabled={!text.trim()}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                text.trim()
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-white/10 text-white/20 cursor-not-allowed"
              }`}
            >
              {saved
                ? t("Saved ✓", "सेव हो गया ✓")
                : t("Save Entry", "सेव करें")}
            </button>
          </div>
        </div>

        {/* Past entries */}
        {entries.length > 0 && (
          <div className="mt-8 animate-fade-up-delay-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white/30 text-xs uppercase tracking-widest">
                {t("Past Entries", "पिछले विचार")} ({entries.length})
              </h2>
            </div>
            <div className="space-y-2">
              {entries.map((entry) => {
                const isExpanded = expandedId === entry.id;
                return (
                  <div
                    key={entry.id}
                    className="bg-white/5 border border-white/8 rounded-2xl overflow-hidden"
                  >
                    {/* Entry header — always visible */}
                    <button
                      onClick={() =>
                        setExpandedId(isExpanded ? null : entry.id)
                      }
                      className="w-full text-left px-4 py-3 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <p className="text-white/25 text-xs mb-0.5">
                          {entry.date}
                        </p>
                        <p className="text-white/65 text-sm truncate">
                          {entry.text.slice(0, 60)}
                          {entry.text.length > 60 ? "…" : ""}
                        </p>
                      </div>
                      <span className="text-white/20 text-xs flex-shrink-0">
                        {isExpanded ? "↑" : "↓"}
                      </span>
                    </button>

                    {/* Expanded content */}
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-white/8 pt-3">
                        <p className="text-white/25 text-xs italic mb-3 leading-snug">
                          "{lang === "en" ? entry.prompt.en : entry.prompt.hi}"
                        </p>
                        <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap mb-4">
                          {entry.text}
                        </p>
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="text-red-400/50 hover:text-red-400 text-xs transition-colors"
                        >
                          {t("Delete entry", "एंट्री हटाएं")}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {entries.length === 0 && (
          <p className="text-center text-[#a89db5] text-sm mt-12">
            {t(
              "Your first entry will appear here.",
              "आपकी पहली एंट्री यहाँ दिखेगी।"
            )}
          </p>
        )}
      </div>
    </main>
    </AuroraBackground>
  );
}
