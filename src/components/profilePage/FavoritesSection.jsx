"use client";

import Image from "next/image";
import Link from "next/link";
import useAuthStore from "@/store/authStore";
import useFavorites from "@/hooks/useFavorites";
import Spinner from "../shared/loader/Spinner";

const FavoritesSection = () => {
  const { userInfo } = useAuthStore();
  const { data: favorites = [], isLoading: isFavoritesLoading } =
    useFavorites();

  console.log(favorites);

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <h2 className="text-white font-semibold text-base">My Favorites</h2>
        </div>
        <Link
          href="/dashboard/profile/favorites"
          className="text-primary text-sm font-medium hover:opacity-75 transition-opacity"
        >
          View All
        </Link>
      </div>

      {/* Movie grid */}
      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {favorites.slice(0, 5).map((movie, idx) => (
            <Link
              key={movie._id ?? idx}
              href={`/movie/${movie.movieId}`}
              className="group flex flex-col gap-2"
            >
              <div className="relative aspect-2/3 rounded-xl overflow-hidden border border-white/[0.07] group-hover:border-primary/25 transition-colors">
                <Image
                  src={
                    movie.poster_path
                      ? `${process.env.NEXT_PUBLIC_TMDB_PATH}${movie.poster_path}`
                      : "/image/poster-placeholder.png"
                  }
                  alt={movie.title ?? "Movie"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* hover overlay */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <p className="text-white/70 text-xs text-center leading-snug line-clamp-1 group-hover:text-white transition-colors">
                {movie.title}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-[#0d120e] border border-white/[0.07] rounded-2xl p-10 flex flex-col items-center gap-3 text-center">
          <svg
            className="w-10 h-10 text-white/15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <p className="text-white/35 text-sm">No favorites added yet.</p>
          <Link
            href="/movies"
            className="text-primary text-sm font-medium hover:opacity-75 transition-opacity"
          >
            Browse Movies →
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritesSection;
