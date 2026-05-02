"use client";

import { SlLocationPin } from "react-icons/sl";

const TheaterPill = ({ theater, onSelect, state = false }) => {
  const { _id, name, location } = theater;

  return (
    <div
      onClick={() => onSelect?.(_id)}
      className={`relative inline-flex items-center gap-3 p-2 md:p-2.5 rounded-full border cursor-pointer group transition-colors ${
        state
          ? "border-primary bg-primary"
          : "border-border-subtle bg-transparent hover:border-primary/40"
      }`}
    >
      <SlLocationPin
        className={`text-base md:text-xl ${state ? "text-dark" : "theme-text-primary"}`}
      />

      <p
        className={`text-sm sm:text-base md:text-lg ${
          state ? "text-dark" : "theme-text-primary"
        }`}
      >
        {name}
      </p>

      {/* Tooltip */}
      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max px-3 py-1 bg-primary text-dark text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 z-10 pointer-events-none">
        <SlLocationPin className="text-sm shrink-0" />
        <span>{location}</span>
      </div>
    </div>
  );
};

export default TheaterPill;
