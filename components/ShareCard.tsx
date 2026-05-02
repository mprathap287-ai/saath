"use client";

import { useRef } from "react";
import { ResultStatus } from "@/data/results";
import { useLanguage } from "@/lib/language-context";

type ShareCardProps = {
  status: ResultStatus;
  score: number;
  label: string;
  color: string;
  emoji: string;
};

export default function ShareCard({ status, score, label, color, emoji }: ShareCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { t } = useLanguage();

  const generateAndDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;

    // Background
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, 800, 800);

    // Subtle grid pattern
    ctx.strokeStyle = "rgba(255,255,255,0.03)";
    ctx.lineWidth = 1;
    for (let x = 0; x < 800; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 800);
      ctx.stroke();
    }
    for (let y = 0; y < 800; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(800, y);
      ctx.stroke();
    }

    // Glow circle
    const gradient = ctx.createRadialGradient(400, 400, 0, 400, 400, 300);
    gradient.addColorStop(0, color + "20");
    gradient.addColorStop(1, "transparent");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 800);

    // Score arc
    const cx = 400, cy = 360, r = 160;
    ctx.strokeStyle = "rgba(255,255,255,0.07)";
    ctx.lineWidth = 12;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    const pct = score / 30;
    ctx.strokeStyle = color;
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + pct * Math.PI * 2);
    ctx.stroke();

    // Score text
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 72px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(score), cx, cy - 8);

    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.font = "20px system-ui, -apple-system, sans-serif";
    ctx.fillText("/ 30", cx, cy + 44);

    // Status label
    ctx.fillStyle = color;
    ctx.font = "bold 36px system-ui, -apple-system, sans-serif";
    ctx.fillText(`${emoji}  ${label}`, cx, cy + 110);

    // App name
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    ctx.font = "22px system-ui, -apple-system, sans-serif";
    ctx.fillText("साथ · Relationship Clarity", cx, 680);

    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.font = "16px system-ui, -apple-system, sans-serif";
    ctx.fillText("saath.app", cx, 720);

    // Download
    const link = document.createElement("a");
    link.download = `saath-result-${status}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleShare = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return generateAndDownload();

    // Try Web Share API first
    if (navigator.share) {
      canvas.width = 800;
      canvas.height = 800;
      generateAndDownload(); // generate the file
      try {
        await navigator.share({
          title: "Saath — Relationship Clarity",
          text: `My relationship clarity score: ${score}/30 (${label})`,
          url: window.location.href,
        });
        return;
      } catch {
        // fallthrough to download
      }
    }
    generateAndDownload();
  };

  return (
    <>
      <canvas ref={canvasRef} className="hidden" />
      <button
        onClick={handleShare}
        className="w-full border border-white/15 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-base py-4 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2"
      >
        <span>↑</span>
        {t("Share / Download Result", "परिणाम शेयर करें")}
      </button>
    </>
  );
}
