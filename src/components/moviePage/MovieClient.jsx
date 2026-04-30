"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

import { Calendar, Earth, PartyPopper, Play, Star, Ticket } from "lucide-react";
import { FaClock, FaHeart, FaRegHeart } from "react-icons/fa6";

import axiosPublic from "@/lib/axios/axiosPublic";
import BlurCircle from "../shared/blurCircle/BlurCircle";
import SectionTitle from "../shared/sectionTitle/SectionTitle";
import {
  formatFullDate,
  formatYear,
  runtimeFormater,
} from "@/utils/dateFormatter";
import useAuthStore from "@/store/authStore";
import useFavorites from "@/hooks/useFavorites";
import Spinner from "../shared/loader/Spinner";

const MovieClient = ({ movieDetails, showData }) => {
  const { data: favorites = [], isLoading: isFavoritesLoading } =
    useFavorites();
  const favoritesSet = new Set(favorites || []);
  const isFavorite = favoritesSet.has(movieDetails?._id);
  const { authUser } = useAuthStore();

  const _id = movieDetails?._id;

  if (isFavoritesLoading) return <Spinner />;

  const addFavorite = async () => {
    if (!authUser) {
      toast.error("Please login to add favorites");
      return;
    }

    try {
      const res = await axiosPublic.post(`/users/favorite/${_id}`);
      toast.success(res.data.message);
      setIsFavorite((prev) => !prev);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  if (!movieDetails) return null;

  const {
    backdrop_path,
    title,
    overview,
    poster_path,
    vote_average,
    release_date,
    casts = [],
    original_language,
    popularity,
    runtime,
    genres = [],
  } = movieDetails;

  const noShow = () => {
    toast("No show available", { icon: "⚠️" });
  };

  return (
    <>
      {/* HERO */}
      <section
        className="h-screen bg-cover bg-center pb-20 flex items-end"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url(${process.env.NEXT_PUBLIC_TMDB_PATH}${backdrop_path})`,
        }}
      >
        <div className="container-fluid flex items-center gap-12">
          <div className="hidden md:block">
            <Image
              src={`${process.env.NEXT_PUBLIC_TMDB_PATH}${poster_path}`}
              width={400}
              height={600}
              alt={title}
              className="rounded-3xl border border-primary-light"
            />
          </div>

          <div className="text-white max-w-3xl">
            <h2 className="text-[clamp(2rem,3vw,80px)] font-bold">{title}</h2>
            <p className="text-base md:text-lg mb-4">{overview}</p>

            <div className="flex flex-wrap gap-4 mb-3">
              <div className="flex items-center gap-1">
                <FaClock />
                {runtimeFormater(runtime)}
              </div>

              <div className="flex items-center gap-1">
                <Calendar />
                {formatYear(release_date)}
              </div>

              <div className="flex gap-2">
                {genres.map((g) => (
                  <span key={g._id}>• {g.name}</span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6">
              {showData?.theaters?.length ? (
                <Link
                  href={`/showtime/${showData._id}`}
                  className="btn-gradient"
                >
                  <Ticket /> Get Ticket
                </Link>
              ) : (
                <button onClick={noShow} className="btn-gradient">
                  <Ticket /> Get Ticket
                </button>
              )}

              <Link href="/" className="btn-ghost">
                <Play /> Trailer
              </Link>

              <button
                onClick={addFavorite}
                className="border border-border/80 p-2 rounded-full"
              >
                {isFavorite ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart />
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CAST + DETAILS */}
      <section className="py-32 relative overflow-x-hidden">
        <BlurCircle top="0" right="-150px" />
        <BlurCircle top="0" left="-200px" />

        <div className="container-fluid flex gap-6 max-lg:flex-col">
          <div className="flex-1">
            <SectionTitle title="Your Favorite Cast" />

            <div className="flex flex-wrap gap-3">
              {casts.map((cast) => (
                <div key={cast.id} className="text-center">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_TMDB_PATH}${cast.profile_path}`}
                    width={80}
                    height={80}
                    className="rounded-full h-20 object-cover"
                    alt={cast.name}
                  />
                  <p className="text-white text-xs mt-2">{cast.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-96 bg-primary/10 border border-primary rounded-2xl p-6 text-white space-y-4">
            <h2 className="text-xl font-semibold">More Details</h2>

            <div className="space-y-4 text-white/80">
              <div className="flex items-center gap-1">
                <Earth />
                <p>Language: {original_language}</p>
              </div>

              <div className="flex items-center gap-1">
                <Star />
                <p>Rating: {vote_average}</p>
              </div>

              <div className="flex items-center gap-1">
                <Calendar />
                <p>Release: {formatFullDate(release_date)}</p>
              </div>

              <div className="flex items-center gap-1">
                <PartyPopper />
                <p>Popularity: {popularity.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MovieClient;
