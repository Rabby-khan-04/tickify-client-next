"use client";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";

const SliderNav = ({ swiper, className }) => {
  return (
    <div className={`absolute z-30 flex items-center gap-3 ${className}`}>
      <button
        onClick={() => swiper?.slidePrev()}
        disabled={!swiper}
        className={`theme-text-primary p-2 bg-border-subtle rounded-lg transition-all duration-150 cursor-pointer ${
          !swiper
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-primary/20 hover:text-primary"
        }`}
      >
        <FaCaretLeft className="text-2xl" />
      </button>
      <button
        onClick={() => swiper?.slideNext()}
        disabled={!swiper}
        className={`theme-text-primary p-2 bg-border-subtle rounded-lg transition-all duration-150 cursor-pointer ${
          !swiper
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-primary/20 hover:text-primary"
        }`}
      >
        <FaCaretRight className="text-2xl" />
      </button>
    </div>
  );
};

export default SliderNav;
