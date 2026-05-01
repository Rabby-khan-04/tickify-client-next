"use client";

import BlurCircle from "@/components/shared/blurCircle/BlurCircle";
import Spinner from "@/components/shared/loader/Spinner";
import SectionTitle from "@/components/shared/sectionTitle/SectionTitle";
import useAddBooking from "@/hooks/useAddBooking";
import useMovieDetails from "@/hooks/useMovieDetails";
import useBookingStore from "@/store/bookinStore";
import { formatFullDate, formatTime } from "@/utils/dateFormatter";
import { useRouter } from "next/navigation";

const BookingDetailsPage = () => {
  const router = useRouter();
  const { addBooking, isPending } = useAddBooking();
  const { theater, price, date, time, showId, movie, seats, clearBookingData } =
    useBookingStore();
  const { movieDetails, movieDetailsLoading } = useMovieDetails(movie);

  console.log(movieDetails);

  if (movieDetailsLoading) return <Spinner />;

  const billAmount = price * seats.length;
  const serviceCharge = price * 0.06;
  const totalSearviceCharge = serviceCharge * seats.length;
  const totalBill = billAmount + totalSearviceCharge;

  const handleCheckout = () => {
    const bookingDetails = {
      showId,
      movieId: movie,
      seats,
      theaterId: theater,
      date,
      time: formatTime(time),
    };

    addBooking(bookingDetails, {
      onSuccess: (data) => {
        window.location.href = data?.data?.data.paymentLink;
        // router.push("/loading/success");
        clearBookingData();
      },
    });
  };
  return (
    <div className="h-screen relative overflow-hidden flex items-center justify-center">
      <BlurCircle top="-100px" right="-100px" />
      <div className="container-fluid">
        {movieDetails && theater && showId ? (
          <div className="max-w-md mx-auto text-white">
            <SectionTitle title="Booking Details" />
            <div className="space-y-5 mb-16">
              <h3 className="text-[clamp(1.2rem,2vw,1.5rem)]">Schedule</h3>
              <div className="space-y-1">
                <h4 className="text-[clamp(1rem,1.8vw,1.2rem)]">Movie Title</h4>
                <p className="text-[clamp(1.2rem,2vw,1.5rem)] truncate">
                  {movieDetails?.title}
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="text-[clamp(1rem,1.8vw,1.2rem)]">Date</h4>
                <p className="text-[clamp(1.2rem,2vw,1.5rem)] truncate">
                  {formatFullDate(date)}
                </p>
              </div>
              <div className="space-y-1 flex items-center justify-between flex-wrap">
                <div>
                  <h4 className="text-[clamp(1rem,1.8vw,1.2rem)]">
                    Seats ({seats.length})
                  </h4>
                  <p className="text-[clamp(1.2rem,2vw,1.5rem)] truncate">
                    {seats.join(", ")}
                  </p>
                </div>
                <div>
                  <h4 className="text-[clamp(1rem,1.8vw,1.2rem)]">Hour</h4>
                  <p className="text-[clamp(1.2rem,2vw,1.5rem)] truncate">
                    {formatTime(time)}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-10">
              <h4 className="text-[clamp(1rem,1.8vw,1.2rem)]">
                Transaction Detail
              </h4>
              <div className="flex flex-wrap items-center justify-between text-[clamp(1rem,1.5vw,1rem)]">
                <p className="">REGULAR SEAT</p>
                <p>
                  $ {price} <sub>X</sub>
                  {seats.length}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-between text-[clamp(1rem,1.5vw,1rem)]">
                <p className="">Service Sharge (6%)</p>
                <p>
                  $ {serviceCharge} <sub>X</sub>
                  {seats.length}
                </p>
              </div>

              <div className="border-y border-white/80 py-2 flex flex-wrap items-center justify-between text-[clamp(1rem,1.8vw,1.2rem)]">
                <p>Total payment</p>
                <p>$ {totalBill}</p>
              </div>
            </div>

            <div className="space-y-5">
              <p className="text-xs text-white/80">
                *Purchased ticket cannot be canceled
              </p>
              <button className="btn w-full" onClick={handleCheckout}>
                <div className="flex items-center justify-center gap-2">
                  <span>Checkout Ticket</span>
                  {isPending && (
                    <div className="size-8 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
                  )}
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto text-white">
            <SectionTitle title="Booking Details Not Available" />
          </div>
        )}
      </div>
      <BlurCircle bottom="-100px" left="-100px" />
    </div>
  );
};

export default BookingDetailsPage;
