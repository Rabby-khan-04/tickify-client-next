"use client";

import { useCallback, useRef, useState } from "react";
import { FiSearch, FiGrid } from "react-icons/fi";
import { FaList } from "react-icons/fa6";
import useMovies from "@/hooks/useMovies";

import Pagination from "@/components/shared/pagination/Pagination";
import Spinner from "@/components/shared/loader/Spinner";
import MovieCard from "./Moviecard";
import MovieFilterSidebar from "./Moviefiltersidebar";
import MovieCardSkeleton from "./MovieCardSkeleton";

const SORT_OPTIONS = [
  { label: "Newest", value: "" },
  { label: "Rating: High to Low", value: "vote_average|desc" },
  { label: "Rating: Low to High", value: "vote_average|asc" },
  { label: "Release: Newest First", value: "release_date|desc" },
  { label: "Release: Oldest First", value: "release_date|asc" },
];

const ITEMS_PER_PAGE = 8;

const AllMoviesSection = () => {
  const [view, setView] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [sortValue, setSortValue] = useState("");

  const debounceRef = useRef(null);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    setSelectedGenres([]);
    setSelectedLanguages([]);
    setSortValue("");

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(value);
      setCurrentPage(1);
    }, 400);
  };

  const handleGenresChange = (genres) => {
    setSelectedGenres(genres);
    setCurrentPage(1);
  };

  const handleLanguagesChange = (languages) => {
    setSelectedLanguages(languages);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortValue(e.target.value);
    setCurrentPage(1);
  };

  const handleReset = useCallback(() => {
    setSelectedGenres([]);
    setSelectedLanguages([]);
    setSortValue("");
    setSearch("");
    setDebouncedSearch("");
    setCurrentPage(1);
  }, []);

  const [sortBy, order] = sortValue ? sortValue.split("|") : ["", ""];

  const { movies, pagination, isLoading, isFetching } = useMovies({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    search: debouncedSearch || undefined,
    genres: selectedGenres.length ? selectedGenres : undefined,
    language: selectedLanguages.length ? selectedLanguages : undefined,
    sortBy: sortBy || undefined,
    order: order || undefined,
  });

  const totalPages = pagination?.totalPages ?? 1;
  const totalResults = pagination?.total ?? 0;

  const activeGenreLabel =
    selectedGenres.length > 0
      ? selectedGenres.join(", ") + " Movies"
      : "All Movies";

  return (
    <section className="py-16 relative">
      <div className="container-fluid">
        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* Sidebar */}
          <MovieFilterSidebar
            selectedGenres={selectedGenres}
            setSelectedGenres={handleGenresChange}
            selectedLanguages={selectedLanguages}
            setSelectedLanguages={handleLanguagesChange}
            onReset={handleReset}
          />

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Search bar */}
            <div className="relative mb-6">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search for your favorite movies, actors, or directors..."
                className="w-full bg-[#0d1a14] border border-primary/10 rounded-xl pl-11 pr-24 py-3.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-primary/40 transition-colors"
              />
              <kbd className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-white/20 border border-white/10 rounded px-1.5 py-0.5 font-mono">
                CTRL K
              </kbd>
            </div>

            {/* Title row */}
            <div className="flex items-start sm:items-center justify-between gap-4 flex-wrap mb-6">
              <div>
                <h2 className="text-white text-2xl font-bold">
                  {activeGenreLabel}
                </h2>
                <p className="text-white/30 text-sm mt-0.5">
                  {isLoading
                    ? "Loading..."
                    : `Showing ${totalResults} title${totalResults !== 1 ? "s" : ""} found`}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Sort dropdown */}
                <div className="relative">
                  <select
                    value={sortValue}
                    onChange={handleSortChange}
                    className="appearance-none bg-[#0d1a14] border border-primary/15 text-white/70 text-sm rounded-lg px-4 py-2.5 pr-8 focus:outline-none focus:border-primary/40 cursor-pointer transition-colors hover:border-primary/30"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-white/30 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {/* Grid/List toggle */}
                <div className="flex border border-primary/15 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setView("grid")}
                    className={`p-2.5 transition-colors ${
                      view === "grid"
                        ? "bg-primary text-black"
                        : "bg-[#0d1a14] text-white/40 hover:text-white/70"
                    }`}
                    aria-label="Grid view"
                  >
                    <FiGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`p-2.5 transition-colors ${
                      view === "list"
                        ? "bg-primary text-black"
                        : "bg-[#0d1a14] text-white/40 hover:text-white/70"
                    }`}
                    aria-label="List view"
                  >
                    <FaList className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Loading overlay */}
            {isLoading ? (
              <div
                className={
                  view === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                    : "flex flex-col gap-4"
                }
              >
                {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                  <MovieCardSkeleton key={i} view={view} />
                ))}
              </div>
            ) : movies.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-75 text-center">
                <span className="text-5xl mb-4">🎬</span>
                <p className="text-white/40 text-lg">No movies found.</p>
                <button
                  onClick={handleReset}
                  className="mt-4 text-primary text-sm underline hover:text-primary/70 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div
                  className={`relative transition-opacity duration-300 ${isFetching ? "opacity-60 pointer-events-none" : "opacity-100"}`}
                >
                  {view === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                      {movies.map((movie) => (
                        <MovieCard key={movie._id} movie={movie} view="grid" />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {movies.map((movie) => (
                        <MovieCard key={movie._id} movie={movie} view="list" />
                      ))}
                    </div>
                  )}
                </div>

                <Pagination
                  currentPage={currentPage - 1}
                  setCurrentPage={(page) => setCurrentPage(page + 1)}
                  totalPage={totalPages}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllMoviesSection;
