"use client";

import Image from "next/image";
import Link from "next/link";

const MovieCard = ({ movie, view = "grid" }) => {
  const {
    movieId,
    title,
    poster_path,
    vote_average,
    genres = [],
    runtime,
    overview,
    release_date,
  } = movie;

  const genre = genres?.[0]?.name ?? "Movie";
  const year = release_date ? new Date(release_date).getFullYear() : null;
  const imdbScore = vote_average ? vote_average.toFixed(1) : null;

  const scoreColor =
    vote_average >= 8
      ? "text-green-400"
      : vote_average >= 6
        ? "text-yellow-400"
        : "text-red-400";

  if (view === "list") {
    return (
      <Link href={`/movie/${movieId}`}>
        <div className="group flex gap-4 bg-bg-surface border border-primary/10 rounded-xl overflow-hidden hover:border-primary/40 transition-colors duration-300">
          <div className="relative w-28 shrink-0 overflow-hidden">
            {poster_path ? (
              <Image
                src={
                  poster_path.startsWith("http")
                    ? poster_path
                    : `https://image.tmdb.org/t/p/w300${poster_path}`
                }
                alt={title}
                fill
                style={{ transition: "transform 700ms ease" }}
                className="object-cover w-full group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
                <span className="text-primary/30 text-3xl">🎬</span>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center py-4 pr-4 gap-1.5">
            {imdbScore && (
              <span className={`text-xs font-bold tracking-wide ${scoreColor}`}>
                IMDb {imdbScore}
              </span>
            )}
            <h3 className="text-text-primary font-semibold text-base leading-snug group-hover:text-primary transition-colors line-clamp-1">
              {title}
            </h3>
            <p className="text-text-muted text-xs uppercase tracking-wider">
              {genre}
              {runtime ? ` • ${runtime} Min` : ""}
              {year ? ` • ${year}` : ""}
            </p>
            {overview && (
              <p className="text-text-secondary text-xs line-clamp-2 mt-1 leading-relaxed">
                {overview}
              </p>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/movie/${movieId}`}>
      <div className="group relative bg-bg-surface border border-primary/10 rounded-2xl overflow-hidden hover:border-primary/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,255,120,0.12)] [transition:transform_300ms_ease,box-shadow_300ms_ease,border-color_300ms_ease]">
        <div className="relative aspect-2/3 overflow-hidden">
          {poster_path ? (
            <Image
              src={
                poster_path.startsWith("http")
                  ? poster_path
                  : `${process.env.NEXT_PUBLIC_TMDB_PATH}${poster_path}`
              }
              alt={title}
              fill
              style={{ transition: "transform 500ms ease" }}
              className="object-cover group-hover"
            />
          ) : (
            <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent flex items-center justify-center">
              <span className="text-primary/20 text-6xl">🎬</span>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-bg-surface via-transparent to-transparent opacity-80" />

          {/* IMDb badge */}
          {imdbScore && (
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm border border-primary/20 rounded-md px-2 py-1">
              <span className={`text-xs font-bold ${scoreColor}`}>
                IMDb {imdbScore}
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <p className="text-primary/60 text-[11px] uppercase tracking-widest mb-1.5">
            {genre}
            {runtime ? ` • ${runtime} Min` : ""}
          </p>
          <h3 className="text-text-primary font-semibold text-base leading-snug group-hover:text-primary transition-colors line-clamp-1">
            {title}
          </h3>
          <p className="text-text-secondary text-xs mt-2 line-clamp-2 leading-relaxed">
            {overview ||
              "A movie is a visual storytelling medium combining narrative, performance, sound, and cinematography to entertain, inspire emotions, and communicate ideas across cultures and audiences worldwide."}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
