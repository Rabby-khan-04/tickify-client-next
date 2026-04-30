"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Grid, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import BlurCircle from "@/components/shared/blurCircle/BlurCircle";
import SectionTitle from "@/components/shared/sectionTitle/SectionTitle";
import SliderNav from "../banner/SliderNav";
import MovieCard from "@/components/shared/movie/MovieCard";

const UpcomingMovies = ({ upcomingMovies = [] }) => {
  const [swiperRef, setSwiperRef] = useState(null);

  return (
    <section className="p-top relative overflow-hidden">
      <BlurCircle bottom="0" left="-200px" />

      <div className="container-fluid">
        <div className="relative">
          <SectionTitle title="Coming Soon" />
          <SliderNav swiper={swiperRef} className="top-0 right-0" />
        </div>

        <Swiper
          onSwiper={setSwiperRef}
          grid={{ rows: 2, fill: "row" }}
          spaceBetween={30}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Grid, Autoplay, Pagination]}
          breakpoints={{
            0: { slidesPerView: 1, grid: { rows: 1 } },
            768: { slidesPerView: 2, grid: { rows: 2 } },
            1024: { slidesPerView: 3, grid: { rows: 2 } },
          }}
        >
          {upcomingMovies.map((item) => (
            <SwiperSlide key={item.id || item._id} className="h-auto">
              <MovieCard movie={item?.movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default UpcomingMovies;
