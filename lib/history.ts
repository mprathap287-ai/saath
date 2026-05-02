import { ResultStatus } from "@/data/results";

export type HistoryEntry = {
  id: string;
  score: number;
  status: ResultStatus;
  date: string; // ISO string
  label: string; // "Stable" | "At Risk" | "Critical"
};

const HISTORY_KEY = "saath_history";

export function loadHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

export function appendHistory(entry: Omit<HistoryEntry, "id">): HistoryEntry {
  const full: HistoryEntry = { ...entry, id: Date.now().toString() };
  const existing = loadHistory();
  // Keep max 20 entries
  const updated = [full, ...existing].slice(0, 20);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  return full;
}

export function clearHistory() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(HISTORY_KEY);
  }
}
