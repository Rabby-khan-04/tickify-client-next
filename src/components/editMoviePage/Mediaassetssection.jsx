"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";

const TMDB_BASE =
  process.env.NEXT_PUBLIC_TMDB_PATH || "https://image.tmdb.org/t/p/w500";

const MediaAssetsSection = ({ movieDetails }) => {
  const { poster_path, backdrop_path } = movieDetails;

  return (
    <div className="bg-[#0d120e] border border-white/[0.07] rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <ImageIcon className="w-4 h-4 text-primary" strokeWidth={1.8} />
        <h2 className="text-white font-semibold text-base">Media Assets</h2>
      </div>

      <div className="flex flex-col gap-4">
        {/* Main Poster */}
        <div>
          <p className="text-white/45 text-xs font-medium mb-2">Main Poster</p>
          <div className="relative w-full aspect-2/3 rounded-xl overflow-hidden border border-white/[0.07]">
            {poster_path ? (
              <Image
                src={`${TMDB_BASE}${poster_path}`}
                alt="Movie poster"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-white/3 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-white/10" />
              </div>
            )}
          </div>
        </div>

        {/* Backdrop */}
        <div>
          <p className="text-white/45 text-xs font-medium mb-2">
            Backdrop / Hero
          </p>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/[0.07]">
            {backdrop_path ? (
              <Image
                src={`${TMDB_BASE}${backdrop_path}`}
                alt="Movie backdrop"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-white/3 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-white/10" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaAssetsSection;
