import { formatTime } from "@/utils/dateFormatter";

const ShowTime = ({ time, state = false, onSelect }) => {
  return (
    <div
      onClick={() => onSelect?.(time)}
      className={`px-3 py-2 md:py-3 md:px-5 border rounded-lg inline-block cursor-pointer max-md:text-sm transition-colors ${
        state
          ? "bg-primary border-primary text-dark"
          : "border-border-subtle theme-text-primary hover:border-primary/40"
      }`}
    >
      <p>{formatTime(time)}</p>
    </div>
  );
};

export default ShowTime;
