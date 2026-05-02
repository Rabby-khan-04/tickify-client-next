"use client";
import Image from "next/image";
import { BiSolidUpvote } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";

const ShowCard = ({ movie, redirect = true }) => {
  const router = useRouter();
  const { title, poster_path, vote_average = 0, vote_count, id } = movie;

  const handleNavigate = (movieId) => {
    if (redirect) {
      router.push(`/movie/${movieId}`);
    }
  };

  return (
    <div
      onClick={() => handleNavigate(id)}
      className="max-w-56 md:max-w-80 cursor-pointer transform hover:-translate-y-4 transition-all duration-200"
    >
      <div className="rounded-xl overflow-hidden relative">
        <Image
          src={`${process.env.NEXT_PUBLIC_TMDB_PATH}${poster_path}`}
          alt={title}
          width={400}
          height={600}
          className="w-full h-auto object-cover"
        />
        <div className="absolute left-0 right-0 bottom-0 w-full bg-bg-base/70 px-2 py-2 flex items-center justify-between gap-4">
          <div className="flex items-center text-base gap-2">
            <FaStar className="text-xl text-primary" />
            <p className="theme-text-primary">
              {Number(vote_average).toFixed(1)}
            </p>
          </div>
          <div className="flex items-center text-base gap-2">
            <BiSolidUpvote className="text-xl text-primary" />
            <p className="theme-text-primary">{vote_count}</p>
          </div>
        </div>
      </div>
      <div className="px-2 py-2">
        <p className="truncate font-medium theme-text-primary">{title}</p>
      </div>
    </div>
  );
};

export default ShowCard;
