"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";

import { Autoplay, Grid } from "swiper/modules";
import { useState } from "react";

import BlurCircle from "@/components/shared/blurCircle/BlurCircle";
import SectionTitle from "@/components/shared/sectionTitle/SectionTitle";
import SliderNav from "../banner/SliderNav";
import FeatureCard from "./FeatureCard";
import MovieCard from "@/components/shared/movie/MovieCard";

const NowShowing = ({ upcomingShows }) => {
  const [swiperRef, setSwiperRef] = useState(null);

  if (!upcomingShows?.length) return null;

  return (
    <section className="p-top relative z-30 overflow-x-hidden">
      <BlurCircle top="100px" right="-200px" />

      <div className="container-fluid">
        <div className="relative">
          <SectionTitle title="Now Showing" />
          <SliderNav swiper={swiperRef} className="top-0 right-0" />
        </div>

        <div className="flex flex-col-reverse sm:grid sm:grid-cols-2 md:grid-cols-7 gap-7.5">
          <div className="md:col-span-3 xl:col-span-2">
            <FeatureCard show={upcomingShows?.[0]} />
          </div>

          <div className="md:col-span-4 xl:col-span-5 min-w-0">
            <Swiper
              onSwiper={setSwiperRef}
              grid={{
                rows: 2,
                fill: "row",
              }}
              spaceBetween={30}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              modules={[Grid, Autoplay]}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  slidesPerGroup: 1,
                  grid: { rows: 1 },
                },
                1024: {
                  slidesPerView: 1.5,
                  slidesPerGroup: 1,
                  grid: { rows: 2 },
                },
                1280: {
                  slidesPerView: 2.5,
                  slidesPerGroup: 2,
                  grid: { rows: 2 },
                },
              }}
            >
              {upcomingShows?.slice(1)?.map((show) => (
                <SwiperSlide key={show._id}>
                  <MovieCard movie={show.movie} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NowShowing;
