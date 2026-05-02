"use client";

import Link from "next/link";
import Image from "next/image";

import Spinner from "@/components/shared/loader/Spinner";
import SectionTitle from "@/components/shared/sectionTitle/SectionTitle";

import { FaEye, FaPen, FaPlus, FaTrash } from "react-icons/fa6";
import {
  formatDay,
  formatMonth,
  formatWeekDay,
  formatYearShort,
} from "@/utils/dateFormatter";
import useAllShow from "@/hooks/useAllShow";

const ManageShowPage = () => {
  const { allShows, allShowsLoading } = useAllShow();
  if (allShowsLoading) return <Spinner />;

  return (
    <div className="theme-text-primary">
      <div className="flex items-center justify-between mb-5 flex-wrap">
        <SectionTitle title="All Shows" />
        <Link
          className="btn inline-flex! items-center gap-2"
          href="/dashboard/admin/add-show"
        >
          <FaPlus />
          <span>Create new Show</span>
        </Link>
      </div>

      <div className="overflow-x-auto">
        {allShows.length !== 0 ? (
          <table className="table-auto w-full border border-border-base border-collapse theme-text-primary">
            <thead>
              <tr className="border border-border-base">
                <th className="border border-border-base px-4 py-2 max-md:hidden">
                  #
                </th>
                <th className="border border-border-base px-4 py-2 max-md:hidden">
                  Cover
                </th>
                <th className="border border-border-base px-4 py-2">Title</th>
                <th className="border border-border-base px-4 py-2 max-md:hidden">
                  Dates
                </th>
                <th className="border border-border-base px-4 py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {allShows.map((show, idx) => (
                <tr key={show._id}>
                  <td className="border border-border-base px-4 py-2 max-md:hidden">
                    {idx + 1}
                  </td>

                  <td className="border border-border-base px-4 py-2 text-center max-md:hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_TMDB_PATH}${show.movie.poster_path}`}
                      width={80}
                      height={120}
                      className="inline-block rounded-md"
                      alt={show.movie.title}
                    />
                  </td>

                  <td className="border border-border-base px-4 py-2 max-lg:max-w-40">
                    <p className="truncate">{show.movie.title}</p>
                  </td>

                  <td className="border border-border-base px-4 py-2 max-md:hidden">
                    <div className="flex items-center gap-2 flex-wrap">
                      {show.theaters.map((theater) =>
                        theater.dates.map((date) => (
                          <div
                            key={`${date.date}-${theater.theaterId}`}
                            className="p-2 border border-border-subtle inline-block rounded-xl text-sm lg:text-base min-w-16"
                          >
                            <p>
                              <span>{formatDay(date.date)}</span>{" "}
                              <span>{formatWeekDay(date.date)}</span>
                            </p>
                            <p>
                              <span>{formatMonth(date.date)}</span>{" "}
                              <span>{formatYearShort(date.date)}</span>
                            </p>
                          </div>
                        )),
                      )}
                    </div>
                  </td>

                  <td className="border border-border-base px-4 py-2">
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
        ) : (
          <h2 className="text-center text-2xl italic theme-text-secondary mt-5">
            No shows available
          </h2>
        )}
      </div>
    </div>
  );
};

export default ManageShowPage;
