import { Calendar, Star, Ticket } from "lucide-react";
import Link from "next/link";

const FeatureCard = ({ show }) => {
  const movie = show?.movie;

  return (
    <div
      className="h-75 sm:h-full bg-center bg-cover bg-no-repeat rounded-xl px-4 py-6 xl:py-6 xl:px-8 flex flex-col justify-end text-white relative"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(29, 231, 130, 0.0), rgba(0, 0, 0, 0.8)), url(${
          process.env.NEXT_PUBLIC_TMDB_PATH
        }${movie?.poster_path})`,
      }}
    >
      <p className="movie-badge">New Release</p>

      <h2 className="text-[clamp(1.2rem,2vw,42px)] font-bold mb-2">
        {movie?.title}
      </h2>

      <div className="mb-3 flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-1">
          <Star />
          <p>{movie?.vote_average}</p>
        </div>

        <div className="flex items-center gap-1">
          <Calendar />
          <p>{movie?.release_date}</p>
        </div>
      </div>

      <div>
        <Link href={`/showtime/${show?._id}`} className="btn-gradient-sm">
          <Ticket />
          <span>Get Ticket</span>
        </Link>
      </div>
    </div>
  );
};

export default FeatureCard;
