"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-white/10 text-8xl font-bold mb-6 select-none">404</p>
      <h1 className="text-2xl font-semibold text-white mb-3">
        Page not found
      </h1>
      <p className="text-white/40 text-base mb-10 max-w-xs leading-relaxed">
        यह पेज मौजूद नहीं है।<br />
        This page doesn't exist.
      </p>
      <button
        onClick={() => router.push("/")}
        className="bg-white text-black font-semibold px-8 py-4 rounded-2xl hover:bg-white/90 transition-all duration-150"
      >
        Go Home →
      </button>
    </main>
  );
}
