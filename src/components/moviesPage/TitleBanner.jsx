import Image from "next/image";
import cinemaImg from "@/../public/image/cinema-studio.jpg";

const TitleBanner = ({ title }) => {
  return (
    <section className="relative h-150 flex items-end justify-center py-20 text-center">
      <Image
        src={cinemaImg}
        alt="Cinema background"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/60 to-black/80" />

      {/* Content */}
      <h2 className="relative z-10 text-[clamp(2rem,3vw,80px)] font-bold text-primary">
        {title}
      </h2>
    </section>
  );
};

export default TitleBanner;
