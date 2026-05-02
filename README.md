# Saath — Relationship Clarity Tool

A private, bilingual (English + Hindi) relationship clarity tool for India. Built with Next.js, TypeScript, and Tailwind CSS.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
saath/
├── app/
│   ├── layout.tsx              # Root layout with font + LanguageProvider
│   ├── globals.css             # Global styles + fade-up animation utilities
│   ├── not-found.tsx           # Custom 404 page
│   ├── page.tsx                # Landing page — hero, how it works, trust pills
│   ├── assessment/
│   │   └── page.tsx            # Question flow + Answer Review screen
│   ├── result/
│   │   └── page.tsx            # Score ring, dimension breakdown, actions, share
│   └── journal/
│       └── page.tsx            # Private reflection journal (localStorage)
├── components/
│   ├── LanguageToggle.tsx      # EN / HI switcher pill
│   ├── OptionButton.tsx        # Answer option with radio + keyboard shortcut hint
│   ├── ProgressBar.tsx         # Question progress indicator
│   ├── AnswerReview.tsx        # Full answer review before submitting
│   ├── ScoreRing.tsx           # Animated SVG score ring on result page
│   └── ShareCard.tsx           # Canvas-based result card download / Web Share API
├── data/
│   ├── questions.ts            # 10 bilingual questions with per-option scores
│   └── results.ts              # Result bands (Stable / At Risk / Critical) + actions
└── lib/
    ├── assessment.ts           # Score computation + localStorage helpers
    └── language-context.tsx    # React context for EN/HI language state
```

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, "How it works", and Journal link |
| `/assessment` | 10-question flow → Answer Review → Result |
| `/result` | Score ring, dimension breakdown, 3 actions, Share + Journal CTA |
| `/journal` | Private daily reflection journal, rotating prompts |

---

## Scoring

| Score | Status   | Color  |
|-------|----------|--------|
| 0–8   | Stable   | Green  |
| 9–18  | At Risk  | Yellow |
| 19–30 | Critical | Red    |

### Dimensions (result breakdown)
- **Communication** — Q1, Q4
- **Trust** — Q3, Q9
- **Respect** — Q5, Q8
- **Connection** — Q2, Q7
- **Future** — Q6, Q10

---

## Key Features
- ✅ Full English + Hindi bilingual support via React Context
- ✅ Language toggle persists across all screens in session
- ✅ Answer review screen before final submission
- ✅ Keyboard shortcuts (1–4 to select, Enter to advance)
- ✅ Animated SVG score ring on result
- ✅ 5-dimension breakdown bars on result
- ✅ Canvas-generated shareable result card (PNG download / Web Share API)
- ✅ Private reflection journal with rotating daily prompts
- ✅ Custom 404 page
- ✅ Anonymous — no backend, no data sent anywhere
- ✅ Mobile-first dark theme with large touch targets
