"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import LanguageToggle from "@/components/LanguageToggle";
import { loadHistory, clearHistory, HistoryEntry } from "@/lib/history";
import { useHydration } from "@/lib/use-hydration";
import { useState } from "react";
import AuroraBackground from "@/components/AuroraBackground";

const STATUS_COLOR: Record<string, string> = {
  stable: "#4ade80",
  "at-risk": "#facc15",
  critical: "#f87171",
};

const STATUS_LABEL_HI: Record<string, string> = {
  stable: "स्थिर",
  "at-risk": "संकट में",
  critical: "गंभीर",
};

function TrendLine({ entries }: { entries: HistoryEntry[] }) {
  if (entries.length < 2) return null;

  const W = 320;
  const H = 80;
  const pad = 12;
  const innerW = W - pad * 2;
  const innerH = H - pad * 2;

  // Oldest → newest (reverse for chart)
  const ordered = [...entries].reverse();
  const max = 30;

  const points = ordered.map((e, i) => {
    const x = pad + (i / (ordered.length - 1)) * innerW;
    const y = pad + innerH - (e.score / max) * innerH;
    return { x, y, entry: e };
  });

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      style={{ height: H }}
      preserveAspectRatio="none"
    >
      {/* Horizontal guide lines */}
      {[0, 8, 18, 30].map((val) => {
        const y = pad + innerH - (val / max) * innerH;
        return (
          <line
            key={val}
            x1={pad}
            x2={W - pad}
            y1={y}
            y2={y}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        );
      })}

      {/* Score line */}
      <path
        d={pathD}
        fill="none"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Dots */}
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={4}
          fill={STATUS_COLOR[p.entry.status]}
          stroke="#0a0a0a"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}

export default function HistoryPage() {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const hydrated = useHydration();
  const [confirmClear, setConfirmClear] = useState(false);
  const [entries, setEntries] = useState<HistoryEntry[]>(() =>
    typeof window !== "undefined" ? loadHistory() : []
  );

  const handleClear = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000);
      return;
    }
    clearHistory();
    setEntries([]);
    setConfirmClear(false);
  };

  if (!hydrated) return null;

  const averageScore =
    entries.length > 0
      ? Math.round(entries.reduce((s, e) => s + e.score, 0) / entries.length)
      : null;

  const latestEntry = entries[0];

  return (
    <AuroraBackground>
      <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5">
        <button
          onClick={() => router.push("/")}
          className="text-white/40 hover:text-white transition-colors text-sm pointer-events-auto relative z-10"
        >
          ←&nbsp;{t("Home", "होम")}
        </button>
        <span className="text-[#ffffff] font-semibold tracking-wide text-lg">
          {lang === "en" ? "Saath" : "साथ"}<span className="text-rose-400">.</span>
        </span>
        <LanguageToggle />
      </header>

      <div className="flex-1 px-6 max-w-lg mx-auto w-full pb-14">
        {/* Title */}
        <div className="mb-8 animate-fade-up">
          <p className="text-[#8b7fa8] text-xs uppercase tracking-widest mb-2">
            {t("Your Journey", "आपकी यात्रा")}
          </p>
          <h1 className="text-2xl font-bold text-[#ffffff]">
            {t("Assessment History", "परीक्षण इतिहास")}
          </h1>
        </div>

        {entries.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center text-center mt-20 animate-fade-up-delay-1">
            <p className="text-5xl mb-4">📊</p>
            <p className="text-white/30 text-base mb-2">
              {t("No assessments yet", "अभी तक कोई परीक्षण नहीं")}
            </p>
            <p className="text-[#a89db5] text-sm mt-1">
              {t(
                "Complete an assessment to start tracking.",
                "ट्रैकिंग शुरू करने के लिए परीक्षण पूरा करें।"
              )}
            </p>
            <button
              onClick={() => router.push("/assessment")}
              className="bg-white text-black font-semibold px-6 py-3 rounded-xl hover:bg-white/90 transition-all"
            >
              {t("Start Assessment", "परीक्षण शुरू करें")} →
            </button>
          </div>
        ) : (
          <>
            {/* Summary cards */}
            <div className="grid grid-cols-2 gap-3 mb-6 animate-fade-up-delay-1">
              <div className="bg-white/5 border border-white/8 rounded-2xl p-4">
                <p className="text-white/30 text-xs mb-1">
                  {t("Assessments", "परीक्षण")}
                </p>
                <p className="text-white text-2xl font-bold">{entries.length}</p>
              </div>
              <div className="bg-white/5 border border-white/8 rounded-2xl p-4">
                <p className="text-white/30 text-xs mb-1">
                  {t("Avg. Score", "औसत स्कोर")}
                </p>
                <p className="text-white text-2xl font-bold">
                  {averageScore ?? "—"}
                  <span className="text-[#a89db5] text-sm font-normal">/30</span>
                </p>
              </div>
            </div>

            {/* Latest status */}
            {latestEntry && (
              <div
                className="rounded-2xl border p-4 mb-6 animate-fade-up-delay-1"
                style={{
                  borderColor: STATUS_COLOR[latestEntry.status] + "40",
                  backgroundColor: STATUS_COLOR[latestEntry.status] + "0D",
                }}
              >
                <p className="text-white/30 text-xs mb-1">
                  {t("Latest Result", "नवीनतम परिणाम")}
                </p>
                <p
                  className="text-lg font-semibold"
                  style={{ color: STATUS_COLOR[latestEntry.status] }}
                >
                  {lang === "en"
                    ? latestEntry.label
                    : STATUS_LABEL_HI[latestEntry.status]}
                  {" "}— {latestEntry.score}/30
                </p>
                <p className="text-white/25 text-xs mt-1">
                  {new Date(latestEntry.date).toLocaleDateString(
                    lang === "hi" ? "hi-IN" : "en-IN",
                    { day: "numeric", month: "short", year: "numeric" }
                  )}
                </p>
              </div>
            )}

            {/* Trend chart */}
            {entries.length >= 2 && (
              <div className="rounded-2xl border border-white/8 bg-[#1a1625] p-6 animate-fade-up-delay-2">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-white/30 text-xs uppercase tracking-widest">
                    {t("Score Trend", "स्कोर ट्रेंड")}
                  </p>
                  <div className="flex gap-3 text-xs">
                    <span className="text-green-400">● {t("Stable", "स्थिर")}</span>
                    <span className="text-yellow-400">● {t("At Risk", "संकट")}</span>
                    <span className="text-red-400">● {t("Critical", "गंभीर")}</span>
                  </div>
                </div>
                <TrendLine entries={entries} />
                {/* Y-axis labels */}
                <div className="flex justify-between text-white/15 text-xs mt-1 px-3">
                  <span>{t("Oldest", "पुराना")}</span>
                  <span>{t("Latest", "नवीनतम")}</span>
                </div>
              </div>
            )}

            {/* Entry list */}
            <div className="animate-fade-up-delay-2">
              <h2 className="text-white/25 text-xs uppercase tracking-widest mb-4">
                {t("All Entries", "सभी परिणाम")}
              </h2>
              <div className="space-y-2">
                {entries.map((entry, i) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between bg-white/4 border border-white/8 rounded-2xl px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: STATUS_COLOR[entry.status] }}
                      />
                      <div>
                        <p className="text-white/70 text-sm font-medium">
                          {lang === "en"
                            ? entry.label
                            : STATUS_LABEL_HI[entry.status]}
                        </p>
                        <p className="text-white/25 text-xs">
                          {new Date(entry.date).toLocaleDateString(
                            lang === "hi" ? "hi-IN" : "en-IN",
                            { day: "numeric", month: "short", year: "numeric" }
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white/60 text-sm font-mono tabular-nums">
                        {entry.score}
                        <span className="text-white/20">/30</span>
                      </p>
                      {i === 0 && (
                        <span className="text-white/20 text-xs">
                          {t("latest", "नवीनतम")}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clear history */}
            <div className="mt-8">
              <button
                onClick={handleClear}
                className={`w-full py-3 rounded-xl text-sm transition-all duration-200 border ${
                  confirmClear
                    ? "border-red-400/40 text-red-400 bg-red-400/10"
                    : "border-white/8 text-white/25 hover:text-white/50 hover:border-white/15"
                }`}
              >
                {confirmClear
                  ? t("Tap again to confirm delete", "हटाने के लिए फिर से दबाएं")
                  : t("Clear All History", "सभी इतिहास हटाएं")}
              </button>
            </div>
          </>
        )}
      </div>
    </main>
    </AuroraBackground>
  );
}
