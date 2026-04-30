"use client";

import { SlLocationPin } from "react-icons/sl";

const TheaterPill = ({ theater, onSelect, state = false }) => {
  const { _id, name, location } = theater;

  const handleOnClick = () => {
    onSelect?.(_id);
  };

  return (
    <div
      onClick={handleOnClick}
      className={`relative inline-flex items-center gap-3 p-2 md:p-2.5 rounded-full border ${
        state ? "border-primary bg-primary" : "border-white bg-transparent"
      } cursor-pointer group`}
    >
      <SlLocationPin
        className={`text-base md:text-xl ${state ? "text-dark" : "text-white"}`}
      />

      <p
        className={`text-sm sm:text-base md:text-lg ${
          state ? "text-dark" : "text-white"
        }`}
      >
        {name}
      </p>

      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max px-3 py-1 bg-primary text-dark text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 z-10">
        <SlLocationPin className="text-sm" />
        <span>{location}</span>
      </div>
    </div>
  );
};

export default TheaterPill;
