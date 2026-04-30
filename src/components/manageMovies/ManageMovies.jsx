"use client";

import useAllMovies from "@/hooks/useAllMovies";
import axiosSecure from "@/lib/axios/axiosSecure";
import { useEffect, useState } from "react";
import Spinner from "../shared/loader/Spinner";
import Pagination from "../shared/pagination/Pagination";
import { FaEye, FaPen, FaPlus, FaTrash } from "react-icons/fa6";
import SectionTitle from "../shared/sectionTitle/SectionTitle";
import Link from "next/link";
import Image from "next/image";
import { formatYear, runtimeFormater } from "@/utils/dateFormatter";

const ManageMovies = () => {
  const [totalItem, setTotalItem] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(10);

  // derived — no useState, no useEffect needed
  const totalPage = Math.ceil(totalItem / itemPerPage);

  const { allmovies, allMoviesLoading } = useAllMovies(
    currentPage,
    itemPerPage,
  );

  useEffect(() => {
    async function getTotalMovieCount() {
      try {
        const res = await axiosSecure.get("/movies/movies-count");
        setTotalItem(res.data?.data || 0);
      } catch (error) {
        console.log(error);
      }
    }
    getTotalMovieCount();
  }, []);

  if (allMoviesLoading) return <Spinner />;

  return (
    <div className="text-white">
      <div className="flex items-center justify-between flex-wrap mb-5">
        <SectionTitle title="All Movies" />
        <Link className="btn" href="/dashboard/admin/add-show">
          <span className="flex items-center gap-2">
            <FaPlus className="inline-block" />
            <span>Create new Show</span>
          </span>
        </Link>
      </div>

      <div className="overflow-x-auto">
        {allmovies?.length ? (
          <>
            <table className="table-auto w-full border border-white/60 border-collapse text-white">
              <thead>
                <tr className="border border-white/60">
                  <th className="border border-white/60 px-4 py-2 max-md:hidden">
                    #
                  </th>
                  <th className="border border-white/60 px-4 py-2 max-md:hidden">
                    Cover
                  </th>
                  <th className="border border-white/60 px-4 py-2">Title</th>
                  <th className="border border-white/60 px-4 py-2 max-md:hidden">
                    Details
                  </th>
                  <th className="border border-white/60 px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {allmovies.map((movie, idx) => (
                  <tr key={movie._id}>
                    <td className="border border-white/60 px-4 py-2 max-md:hidden">
                      {idx + 1}
                    </td>
                    <td className="border border-white/60 px-4 py-2 text-center max-md:hidden">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_TMDB_PATH}${movie.poster_path}`}
                        width={120}
                        height={180}
                        className="lg:h-32 inline-block rounded-md object-cover"
                        alt={movie.title}
                      />
                    </td>
                    <td className="border border-white/60 px-4 py-2 max-lg:max-w-40">
                      <p className="truncate">{movie.title}</p>
                    </td>
                    <td className="border border-white/60 px-4 py-2 max-md:hidden">
                      <p>Language: {movie.original_language}</p>
                      <p>Runtime: {runtimeFormater(movie.runtime)}</p>
                      <p>Released: {formatYear(movie.release_date)}</p>
                      <p>Rating: {movie.vote_average.toFixed(2)}</p>
                    </td>
                    <td className="border border-white/60 px-4 py-2">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 rounded-md cursor-pointer bg-primary">
                          <FaEye />
                        </button>
                        <button className="p-2 rounded-md cursor-pointer bg-accent">
                          <FaPen />
                        </button>
                        <button className="p-2 rounded-md cursor-pointer bg-red-500">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPage={totalPage}
            />
          </>
        ) : (
          <h2 className="text-center text-2xl italic text-white/60 mt-5">
            No movies available
          </h2>
        )}
      </div>
    </div>
  );
};

export default ManageMovies;
