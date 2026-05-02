export default function ResultSkeleton() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header placeholder */}
      <div className="flex items-center justify-between px-6 py-5">
        <div className="w-16 h-4 bg-white/5 rounded-full animate-pulse" />
        <div className="w-20 h-8 bg-white/5 rounded-full animate-pulse" />
      </div>

      <div className="flex-1 px-6 max-w-lg mx-auto w-full pb-12 space-y-6">
        {/* Score ring skeleton */}
        <div className="rounded-3xl border border-white/8 bg-white/3 p-6 flex flex-col items-center gap-3">
          <div className="w-36 h-36 rounded-full bg-white/5 animate-pulse" />
          <div className="w-24 h-5 bg-white/5 rounded-full animate-pulse" />
          <div className="w-32 h-3 bg-white/5 rounded-full animate-pulse" />
        </div>

        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="w-full h-3 bg-white/5 rounded-full animate-pulse" />
          <div className="w-5/6 h-3 bg-white/5 rounded-full animate-pulse" />
          <div className="w-4/6 h-3 bg-white/5 rounded-full animate-pulse" />
        </div>

        {/* Breakdown skeleton */}
        <div className="space-y-4">
          <div className="w-32 h-3 bg-white/5 rounded-full animate-pulse" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-between">
                <div className="w-24 h-3 bg-white/5 rounded-full animate-pulse" />
                <div className="w-8 h-3 bg-white/5 rounded-full animate-pulse" />
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full animate-pulse" />
            </div>
          ))}
        </div>

        {/* Buttons skeleton */}
        <div className="space-y-3">
          <div className="w-full h-14 bg-white/5 rounded-2xl animate-pulse" />
          <div className="w-full h-14 bg-white/5 rounded-2xl animate-pulse" />
          <div className="w-full h-12 bg-white/5 rounded-2xl animate-pulse" />
        </div>
      </div>
    </main>
  );
}
