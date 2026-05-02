"use client";

type OptionButtonProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
  shortcut?: number;
};

export default function OptionButton({ label, selected, onClick, shortcut }: OptionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left px-5 py-4 rounded-2xl border transition-all duration-200 text-base leading-snug flex items-center gap-3
        ${
          selected
            ? "border-rose-400 bg-rose-400/10 text-white"
            : "border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:bg-white/10 hover:text-white"
        }
      `}
    >
      {/* Radio circle */}
      <span
        className={`flex-shrink-0 w-5 h-5 rounded-full border transition-all duration-200 flex items-center justify-center ${
          selected ? "border-rose-400 bg-rose-400" : "border-white/30"
        }`}
      >
        {selected && (
          <span className="w-2 h-2 rounded-full bg-white block" />
        )}
      </span>

      {/* Label */}
      <span className="flex-1">{label}</span>

      {/* Keyboard shortcut hint */}
      {shortcut && (
        <span className="hidden md:flex flex-shrink-0 w-6 h-6 rounded-md bg-white/5 border border-white/10 text-white/20 text-xs items-center justify-center font-mono">
          {shortcut}
        </span>
      )}
    </button>
  );
}
