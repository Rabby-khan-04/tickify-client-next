"use client";

import BlurCircle from "@/components/shared/blurCircle/BlurCircle";
import Spinner from "@/components/shared/loader/Spinner";
import DateCard from "@/components/shared/movie/DateCard";
import ShowTime from "@/components/shared/movie/ShowTime";
import SectionTitle from "@/components/shared/sectionTitle/SectionTitle";
import TheaterPill from "@/components/shared/theater/TheaterPill";
import axiosPublic from "@/lib/axios/axiosPublic";
import useAuthStore from "@/store/authStore";
import useBookingStore from "@/store/bookinStore";
import {
  formatFullDate,
  formatTime,
  formatYear,
  runtimeFormater,
} from "@/utils/dateFormatter";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import toast from "react-hot-toast";

const ShowtimePage = () => {
  const { showtimeId } = useParams();
  const { authUser } = useAuthStore();
  const [selectedTheater, setSelectedTheater] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const { setBookingData } = useBookingStore();
  const router = useRouter();

  const { data: show, isLoading: showLoading } = useQuery({
    queryKey: ["show", showtimeId],
    queryFn: async ({ queryKey }) => {
      const [_key, id] = queryKey;
      const res = await axiosPublic.get(`/showtimes/${id}`);
      return res.data?.data;
    },
    enabled: !!showtimeId,
  });

  const { data: theaterData, isLoading: theaterIsLoading } = useQuery({
    queryKey: ["single-theater", selectedTheater],
    queryFn: async ({ queryKey }) => {
      const [_key, id] = queryKey;
      const res = await axiosPublic.get(`/theaters/${id}`);
      return res.data?.data;
    },
    enabled: !!selectedTheater,
  });

  const theaters = useMemo(() => {
    if (!show) return [];
    return show.theaters.map((t) => t.theaterId);
  }, [show]);

  const { dates, times, selectedPrice } = useMemo(() => {
    if (!show) return { dates: [], times: [], selectedPrice: 0 };

    const relevantTheaters = selectedTheater
      ? show.theaters.filter((t) => t.theaterId._id === selectedTheater)
      : show.theaters;

    const price = selectedTheater ? (relevantTheaters[0]?.price ?? 0) : 0;

    const dates = [];
    const times = [];

    relevantTheaters.forEach((theater) => {
      theater.dates.forEach((d) => {
        if (!dates.includes(d.date)) dates.push(d.date);
        if (!selectedDate || d.date === selectedDate) {
          d.showtimes.forEach((s) => times.push(s.time));
        }
      });
    });

    return { dates, times, selectedPrice: price };
  }, [show, selectedTheater, selectedDate]);

  if (showLoading || theaterIsLoading) return <Spinner />;

  const { movie } = show;
  const {
    title,
    poster_path,
    release_date,
    original_language,
    tagline,
    runtime,
  } = movie;

  const handleTheaterSelection = (theaterId) => {
    setSelectedTheater(theaterId);
    setSelectedDate("");
    setSelectedTime("");
  };

  const handleDateSelection = (currDate) => {
    if (!selectedTheater) {
      toast("Select A Theater", { icon: "⚠️" });
      return;
    }
    setSelectedDate(currDate);
    setSelectedTime("");
  };

  const handleTimeSelection = (currTime) => {
    if (!selectedDate) {
      toast("Pick A Date First", { icon: "⚠️" });
      return;
    }
    setSelectedTime(currTime);
  };

  function handleTrailerClick() {
    toast("Currently not available on TMDB API", { icon: "⚠️" });
  }

  const handleProceed = () => {
    if (!selectedTheater || !selectedDate || !selectedTime || !selectedPrice) {
      toast("Select Theater, Date and Time", { icon: "⚠️" });
      return;
    }
    if (!authUser) {
      toast("Please Login to proceed", { icon: "⚠️" });
      return;
    }
    setBookingData({
      theater: selectedTheater,
      price: selectedPrice,
      date: selectedDate,
      time: selectedTime,
      showId: show._id,
      movie: movie._id,
    });
    router.push("/seat");
  };

  return (
    <div className="py-20 lg:py-32 overflow-x-hidden">
      {/* ── Movie + Showtime selection ─────────────────────────── */}
      <section className="relative">
        <BlurCircle top="-100px" right="0" />
        <BlurCircle bottom="-100px" left="-100px" />

        <div className="container-fluid flex max-md:flex-col-reverse gap-6">
          {/* Left — selectors */}
          <div className="flex-1 flex flex-col justify-between gap-5">
            <div>
              <SectionTitle title="Theater" />
              <div className="flex items-center gap-2">
                {theaters.map((theater) => (
                  <TheaterPill
                    key={theater._id}
                    theater={theater}
                    state={theater._id === selectedTheater}
                    onSelect={handleTheaterSelection}
                  />
                ))}
              </div>
            </div>

            <div>
              <SectionTitle title="Date" />
              <div className="flex items-center gap-2">
                {dates.map((date, idx) => (
                  <DateCard
                    key={idx}
                    date={date}
                    onSelect={handleDateSelection}
                    state={selectedDate === date}
                  />
                ))}
              </div>
            </div>

            <div>
              <SectionTitle title="Time" />
              <div className="flex items-center gap-2 flex-wrap">
                {times.map((showTime, idx) => (
                  <ShowTime
                    time={showTime}
                    key={idx}
                    onSelect={handleTimeSelection}
                    state={showTime === selectedTime}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right — movie info */}
          <div className="shrink-0 w-full md:w-72">
            <Image
              src={`${process.env.NEXT_PUBLIC_TMDB_PATH}${poster_path}`}
              alt={title}
              width={240}
              height={400}
              className="rounded-[20px] inline-block mb-9 max-w-60 h-auto sm:w-72"
            />
            <div className="space-y-4">
              <h2 className="theme-text-primary text-[clamp(1.3rem,2vw,1.5rem)] font-semibold">
                {title}
              </h2>
              <div className="grid grid-cols-2 gap-1 theme-text-secondary">
                <p>Duration:</p>
                <p>{runtimeFormater(runtime)}</p>
                <p>Language:</p>
                <p>{original_language}</p>
                <p>Release:</p>
                <p>{formatYear(release_date)}</p>
              </div>
              {tagline && (
                <p className="theme-text-secondary flex items-center gap-1">
                  <FaStar className="text-primary shrink-0" />
                  {tagline}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Theater booking summary ────────────────────────────── */}
      {selectedTheater && theaterData && (
        <section className="mt-10 lg:mt-16 relative">
          <BlurCircle bottom="-150px" right="-150px" />
          <div className="container-fluid flex justify-end">
            <div className="w-full bg-primary/10 md:w-96 py-5 px-7 md:py-10 md:px-14 border border-primary/20 rounded-2xl theme-text-primary space-y-8">
              <div className="space-y-3">
                <h3 className="text-3xl font-semibold">
                  {theaterData.name || "N/A"}
                </h3>
                <p className="text-lg theme-text-secondary flex items-center gap-1">
                  <FaLocationDot className="text-sm text-primary shrink-0" />
                  <span>{theaterData.location || "N/A"}</span>
                </p>
              </div>

              <div className="space-y-2 theme-text-secondary">
                <p>
                  Date: {selectedDate ? formatFullDate(selectedDate) : "N/A"}
                </p>
                <p>Time: {selectedTime ? formatTime(selectedTime) : "N/A"}</p>
                <p>Price: {selectedPrice ? `$${selectedPrice}` : "N/A"}</p>
              </div>

              <p className="text-sm theme-text-faint">
                *Seat selection can be done after this
              </p>

              <button
                className="btn w-full text-center"
                onClick={handleProceed}
              >
                Proceed
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ShowtimePage;
