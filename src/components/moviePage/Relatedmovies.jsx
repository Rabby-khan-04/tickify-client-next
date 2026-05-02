"use client";

import useMovies from "@/hooks/useMovies";
import MovieCard from "@/components/moviesPage/Moviecard";
import SectionTitle from "../shared/sectionTitle/SectionTitle";

const RelatedMovies = ({ genres = [], currentMovieId }) => {
  const genreNames = genres.map((g) => g.name);

  const { movies, isLoading } = useMovies({
    page: 1,
    limit: 10,
    genres: genreNames.length ? genreNames : undefined,
  });

  // Exclude the current movie and cap at 4
  const related = movies.filter((m) => m._id !== currentMovieId).slice(0, 4);

  if (!isLoading && related.length === 0) return null;

  return (
    <section className="py-16 relative">
      <div className="container-fluid">
        <SectionTitle title="Related Movies" />

        {isLoading ? (
          // Shimmer skeleton — 4 cards matching grid view
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#0d1a14] border border-primary/10 rounded-2xl overflow-hidden"
              >
                <div className="aspect-2/3 bg-white/5 animate-pulse" />
                <div className="p-4 space-y-2.5">
                  <div className="h-3 w-16 bg-white/5 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-white/5 rounded animate-pulse" />
                  <div className="h-3 w-full bg-white/5 rounded animate-pulse" />
                  <div className="h-3 w-2/3 bg-white/5 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
            {related.map((movie) => (
              <MovieCard key={movie._id} movie={movie} view="grid" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RelatedMovies;
