import { formatDay, formatMonth, formatWeekDay } from "@/utils/dateFormatter";
import React from "react";

const DateCard = ({ date, state = false, onSelect }) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect(date);
    }
  };
  return (
    <div
      onClick={handleClick}
      className={`text-center inline-block px-4 py-3 md:py-5 md:px-6 border rounded-lg cursor-pointer max-md:text-sm ${
        state
          ? "bg-primary border-primary text-dark"
          : "bg-transparent border-white text-white"
      }`}
    >
      <p>
        <span>{formatDay(date)}</span> <span>{formatMonth(date)}</span>
      </p>
      <p className="text-base lg:text-xl font-bold">{formatWeekDay(date)}</p>
    </div>
  );
};

export default DateCard;
