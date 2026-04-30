"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";

import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { useState } from "react";
import BannerSlide from "./BannerSlide";
import SliderNav from "./SliderNav";

const Banner = ({ upcomingShows }) => {
  const [swiperRef, setSwiperRef] = useState(null);

  if (!upcomingShows?.length) return null;

  return (
    <section className="relative">
      <Swiper
        onSwiper={setSwiperRef}
        effect="fade"
        slidesPerView={1}
        spaceBetween={30}
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} px-2 py-2 inline-block bg-linear-to-br from-white/20 to-white/40 text-white rounded-full cursor-pointer"></span>`;
          },
        }}
        modules={[Pagination, Autoplay, EffectFade]}
      >
        {upcomingShows.slice(0, 4).map((show) => (
          <SwiperSlide key={show.id}>
            <BannerSlide show={show} />
          </SwiperSlide>
        ))}
      </Swiper>

      <SliderNav
        className="bottom-4 right-20 lg:bottom-20"
        swiper={swiperRef}
      />
      <div className="custom-pagination absolute bottom-6 w-full flex justify-center gap-2"></div>
    </section>
  );
};

export default Banner;
