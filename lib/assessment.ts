export type AssessmentState = {
  answers: number[];
  currentQuestion: number;
  totalScore: number;
};

const STORAGE_KEY = "saath_assessment";

export function saveAssessment(state: AssessmentState) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
}

export function loadAssessment(): AssessmentState | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AssessmentState;
  } catch {
    return null;
  }
}

export function clearAssessment() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function computeScore(answers: number[]): number {
  return answers.reduce((sum, score) => sum + score, 0);
}
