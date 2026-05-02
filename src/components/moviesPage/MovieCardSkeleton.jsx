const MovieCardSkeleton = ({ view = "grid" }) => {
  if (view === "list") {
    return (
      <div className="flex gap-4 bg-[#0d1a14] border border-primary/10 rounded-xl overflow-hidden">
        {/* Poster */}
        <div className="w-28 shrink-0 aspect-2/3 bg-white/5 animate-pulse" />
        {/* Info */}
        <div className="flex flex-col justify-center py-4 pr-4 gap-2.5 flex-1">
          <div className="h-3 w-12 bg-white/5 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-white/5 rounded animate-pulse" />
          <div className="h-3 w-1/2 bg-white/5 rounded animate-pulse" />
          <div className="h-3 w-full bg-white/5 rounded animate-pulse" />
          <div className="h-3 w-5/6 bg-white/5 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="bg-[#0d1a14] border border-primary/10 rounded-2xl overflow-hidden">
      {/* Poster */}
      <div className="aspect-2/3 bg-white/5 animate-pulse" />
      {/* Info */}
      <div className="p-4 space-y-2.5">
        <div className="h-3 w-16 bg-white/5 rounded animate-pulse" />
        <div className="h-4 w-3/4 bg-white/5 rounded animate-pulse" />
        <div className="h-3 w-full bg-white/5 rounded animate-pulse" />
        <div className="h-3 w-2/3 bg-white/5 rounded animate-pulse" />
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
