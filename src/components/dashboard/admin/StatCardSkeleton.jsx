const StatCardSkeleton = () => (
  <div className="bg-[#0d1a0f] border border-primary/10 rounded-2xl p-6 flex flex-col gap-4 animate-pulse">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-white/5" />
      <div className="h-3 w-28 bg-white/5 rounded" />
    </div>
    <div className="h-9 w-32 bg-white/5 rounded" />
    <div className="h-px w-full bg-white/5" />
  </div>
);

export default StatCardSkeleton;
