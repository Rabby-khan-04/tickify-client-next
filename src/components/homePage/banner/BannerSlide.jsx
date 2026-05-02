"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Play, Star, Ticket } from "lucide-react";
import { formatFullDate } from "@/utils/dateFormatter";
import toast from "react-hot-toast";

const BannerSlide = ({ show }) => {
  const { _id, movie } = show;
  const {
    backdrop_path,
    title,
    overview,
    poster_path,
    vote_average,
    release_date,
  } = movie;

  function handleTrailerClick() {
    toast("Currenlty not available on TMDB API", { icon: "⚠️" });
  }

  return (
    <div
      className="h-[90vh] bg-cover bg-center pb-20 flex items-end"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url(${
          process.env.NEXT_PUBLIC_TMDB_PATH
        }${backdrop_path})`,
      }}
    >
      <div className="container-fluid flex items-center gap-12">
        <div className="w-auto shrink-0 hidden md:block">
          <Image
            src={process.env.NEXT_PUBLIC_TMDB_PATH + poster_path}
            width={300}
            height={400}
            alt={title}
            className="object-cover rounded-xl border border-primary-light"
          />
        </div>

        <div className="text-white max-w-2xl">
          <h2 className="text-[clamp(2rem,3vw,80px)] font-bold">{title}</h2>

          <p className="text-base md:text-lg mb-4">{overview}</p>

          <div className="mb-3 flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star />
              <p>{vote_average}</p>
            </div>

            <div className="flex items-center gap-1">
              <Calendar />
              <p>{formatFullDate(release_date)}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link href={`/showtime/${_id}`} className="btn-gradient">
              <Ticket />
              <span>Get Ticket</span>
            </Link>

            <button onClick={handleTrailerClick} className="btn-ghost">
              <Play />
              <span>Trailer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSlide;
