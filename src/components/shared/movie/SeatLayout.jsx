import toast from "react-hot-toast";

const SeatLayout = ({
  row,
  column = 10,
  setSelectedSeat,
  selectedSeat,
  bookedSeat = [], // ← default here
}) => {
  const handleSeatSelection = (id) => {
    if (!selectedSeat.includes(id) && selectedSeat.length > 4) {
      return toast("You can only select 5 seats at once", { icon: "⚠️" });
    }
    setSelectedSeat((prev) =>
      prev.includes(id) ? prev.filter((seat) => seat !== id) : [id, ...prev],
    );
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {Array.from({ length: column }, (_, i) => i).map((col) => {
        const seatId = `${row}${col + 1}`;
        const isBooked = bookedSeat.includes(seatId);
        const isSelected = selectedSeat.includes(seatId);
        return (
          <button
            key={seatId}
            onClick={() => handleSeatSelection(seatId)}
            disabled={isBooked}
            className={`h-8 w-8 inline-block rounded border cursor-pointer transition-all duration-150 text-xs font-medium
              ${
                isSelected
                  ? "bg-primary border-primary text-dark"
                  : isBooked
                    ? "bg-border-subtle border-border-subtle theme-text-faint opacity-50 pointer-events-none"
                    : "border-primary/60 theme-text-primary hover:bg-primary hover:text-dark hover:border-primary"
              }`}
          >
            {seatId}
          </button>
        );
      })}
    </div>
  );
};

export default SeatLayout;
