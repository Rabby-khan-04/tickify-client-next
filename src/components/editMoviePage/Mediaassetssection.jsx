"use client";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

const TMDB_BASE =
  process.env.NEXT_PUBLIC_TMDB_PATH || "https://image.tmdb.org/t/p/w500";

const MediaAssetsSection = ({ movieDetails }) => {
  const { poster_path, backdrop_path } = movieDetails;
  return (
    <div className="theme-card border theme-border rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <ImageIcon className="w-4 h-4 text-primary" strokeWidth={1.8} />
        <h2 className="theme-text-primary font-semibold text-base">
          Media Assets
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-text-muted text-xs font-medium mb-2">
            Main Poster
          </p>
          <div className="relative w-full aspect-2/3 rounded-xl overflow-hidden border theme-border">
            {poster_path ? (
              <Image
                src={`${TMDB_BASE}${poster_path}`}
                alt="Movie poster"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-border-subtle/30 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-text-faint" />
              </div>
            )}
          </div>
        </div>
        <div>
          <p className="text-text-muted text-xs font-medium mb-2">
            Backdrop / Hero
          </p>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border theme-border">
            {backdrop_path ? (
              <Image
                src={`${TMDB_BASE}${backdrop_path}`}
                alt="Movie backdrop"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-border-subtle/30 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-text-faint" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaAssetsSection;
