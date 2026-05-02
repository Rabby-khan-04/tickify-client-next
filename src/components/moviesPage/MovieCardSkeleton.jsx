const MovieCardSkeleton = ({ view = "grid" }) => {
  if (view === "list") {
    return (
      <div className="flex gap-4 bg-bg-surface border border-primary/10 rounded-xl overflow-hidden">
        <div className="w-28 shrink-0 aspect-2/3 bg-border-subtle animate-pulse" />
        <div className="flex flex-col justify-center py-4 pr-4 gap-2.5 flex-1">
          <div className="h-3 w-12 bg-border-subtle rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-border-subtle rounded animate-pulse" />
          <div className="h-3 w-1/2 bg-border-subtle rounded animate-pulse" />
          <div className="h-3 w-full bg-border-subtle rounded animate-pulse" />
          <div className="h-3 w-5/6 bg-border-subtle rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-surface border border-primary/10 rounded-2xl overflow-hidden">
      <div className="aspect-2/3 bg-border-subtle animate-pulse" />
      <div className="p-4 space-y-2.5">
        <div className="h-3 w-16 bg-border-subtle rounded animate-pulse" />
        <div className="h-4 w-3/4 bg-border-subtle rounded animate-pulse" />
        <div className="h-3 w-full bg-border-subtle rounded animate-pulse" />
        <div className="h-3 w-2/3 bg-border-subtle rounded animate-pulse" />
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
