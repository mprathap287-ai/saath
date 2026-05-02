"use client";

import { useEffect, useState } from "react";

type ScoreRingProps = {
  score: number;
  maxScore: number;
  color: string;
  label: string;
  sublabel: string;
};

export default function ScoreRing({ score, maxScore, color, label, sublabel }: ScoreRingProps) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const size = 140;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = score / maxScore;
  const offset = circumference - (animated ? percent : 0) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth={strokeWidth}
          />
          {/* Progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white tabular-nums">
            {animated ? score : 0}
          </span>
          <span className="text-white/30 text-xs">/ {maxScore}</span>
        </div>
      </div>
      <p className="text-base font-semibold mt-3" style={{ color }}>
        {label}
      </p>
      <p className="text-white/30 text-xs mt-1">{sublabel}</p>
    </div>
  );
}
