import { formatFullDate } from "@/utils/dateFormatter";

const Ticket = ({ booking }) => {
  const { paymentLink, paymentStatus, date, seats, time, movieId } = booking;

  const handlePayNow = () => {
    window.location.href = paymentLink;
  };
  return (
    <div className="rounded-[20px] border border-primary  bg-primary/10 max-w-96 w-full p-5 text-white space-y-10">
      <div className="space-y-1">
        <h4 className="text-[clamp(1rem,1.8vw,1.2rem)] font-light text-white/80">
          Date
        </h4>
        <p className="text-[clamp(1.2rem,2vw,1.5rem)] truncate">
          {formatFullDate(date)}
        </p>
      </div>

      <div className="space-y-1">
        <h4 className="text-[clamp(1rem,1.8vw,1.2rem)] font-light text-white/80">
          Movie Title
        </h4>
        <p className="text-[clamp(1.2rem,2vw,1.5rem)] truncate">
          {movieId?.title}
        </p>
      </div>

      <div className="space-y-1 flex items-center justify-between flex-wrap">
        <div>
          <h4 className="text-[clamp(1rem,1.8vw,1.2rem)] font-light text-white/80">
            Seats ({seats.length})
          </h4>
          <p className="text-[clamp(1.2rem,2vw,1.5rem)] truncate">
            {seats.join(", ")}
          </p>
        </div>
        <div>
          <h4 className="text-[clamp(1rem,1.8vw,1.2rem)] font-light text-white/80">
            Hour
          </h4>
          <p className="text-[clamp(1.2rem,2vw,1.5rem)] truncate">{time}</p>
        </div>
      </div>

      {paymentStatus === "paid" ? (
        <button className="btn w-full">Download Ticket</button>
      ) : (
        <button
          onClick={handlePayNow}
          className="btn bg-red-500 border-red-500 w-full"
        >
          Pay Now
        </button>
      )}
    </div>
  );
};

export default Ticket;
