const SeatLayout = ({
  row,
  column = 10,
  setSelectedSeat,
  selectedSeat,
  bookedSeat,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {Array.from({ length: column }, (_, i) => i).map((col) => {
        const seatId = `${row}${col + 1}`;

        const handleSeatSelection = (id) => {
          if (!selectedSeat.includes(id) && selectedSeat.length > 4) {
            return toast("You can only select 5 seats at once", { icon: "⚠️" });
          }

          setSelectedSeat((prev) =>
            prev.includes(id)
              ? prev.filter((seat) => seat !== id)
              : [id, ...prev],
          );
        };

        return (
          <button
            key={seatId}
            onClick={() => handleSeatSelection(seatId)}
            className={`h-8 w-8 inline-block rounded border border-primary/60 cursor-pointer hover:text-dark hover:bg-primary transition-all duration-150 ${
              selectedSeat.includes(seatId)
                ? "bg-primary text-dark"
                : " text-white"
            } disabled:opacity-50 ${
              bookedSeat.includes(seatId) && "pointer-events-none"
            }`}
            disabled={bookedSeat.includes(seatId)}
          >
            {seatId}
          </button>
        );
      })}
    </div>
  );
};

export default SeatLayout;
