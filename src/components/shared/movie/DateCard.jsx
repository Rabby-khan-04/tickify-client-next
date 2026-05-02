import { formatDay, formatMonth, formatWeekDay } from "@/utils/dateFormatter";

const DateCard = ({ date, state = false, onSelect }) => {
  return (
    <div
      onClick={() => onSelect?.(date)}
      className={`text-center inline-block px-4 py-3 md:py-5 md:px-6 border rounded-lg cursor-pointer max-md:text-sm transition-colors ${
        state
          ? "bg-primary border-primary text-dark"
          : "border-border-subtle theme-text-primary hover:border-primary/40"
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
