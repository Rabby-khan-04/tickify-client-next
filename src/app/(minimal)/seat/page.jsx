"use client";

import BlurCircle from "@/components/shared/blurCircle/BlurCircle";
import Spinner from "@/components/shared/loader/Spinner";
import SeatLayout from "@/components/shared/movie/SeatLayout";
import SectionTitle from "@/components/shared/sectionTitle/SectionTitle";
import useBookedSeats from "@/hooks/useBookedSeats";
import useBookingStore from "@/store/bookinStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import screen from "@/../public/icon/screen.svg";

const SeatPage = () => {
  const [selectedSeat, setSelectedSeat] = useState([]);
  const router = useRouter();
  const {
    theater,
    price,
    date,
    time,
    showId,
    clearBookingData,
    setBookedSeat,
  } = useBookingStore();

  const bookingInfo = {
    theaterId: theater,
    date,
    time: new Date(time).getTime(),
  };

  const { bookedSeat, bookedSeatLoading } = useBookedSeats(showId, bookingInfo);

  const rowGroup = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"],
    ["K", "L"],
  ];

  const handleBackNavigation = () => {
    clearBookingData();
    router.back();
  };

  const handleRemoveSeatSelection = () => setSelectedSeat([]);

  const handleProceedPayment = () => {
    if (!selectedSeat.length)
      return toast("Select Seat first!!", { icon: "⚠️" });
    setBookedSeat(selectedSeat);
    router.push("/booking-details");
  };

  if (bookedSeatLoading) return <Spinner />;

  return (
    <div className="relative h-[calc(100vh-120px)] py-16 overflow-y-scroll lg:overflow-y-hidden overflow-x-hidden">
      <BlurCircle top="-100px" right="-100px" />

      <section>
        <div className="container-fluid">
          <SectionTitle
            title="Select your seat"
            className="text-center theme-text-primary uppercase"
          />
          <div className="max-w-4xl mx-auto text-center">
            <Image
              src={screen}
              className="w-4/5 inline-block"
              height={300}
              width={300}
              alt="Screen"
            />
            <p className="theme-text-muted text-sm mb-6">SCREEN SIDE</p>

            <div className="space-y-2 lg:space-y-8">
              <div className="space-y-2">
                {rowGroup[0].map((row) => (
                  <SeatLayout
                    key={row}
                    row={row}
                    setSelectedSeat={setSelectedSeat}
                    selectedSeat={selectedSeat}
                    bookedSeat={bookedSeat}
                  />
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-2 lg:gap-11">
                {rowGroup.slice(1, rowGroup.length - 1).map((group, idx) => (
                  <div key={idx} className="space-y-2">
                    {group.map((row) => (
                      <SeatLayout
                        key={row}
                        row={row}
                        setSelectedSeat={setSelectedSeat}
                        selectedSeat={selectedSeat}
                        bookedSeat={bookedSeat}
                      />
                    ))}
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                {rowGroup[rowGroup.length - 1].map((row) => (
                  <SeatLayout
                    key={row}
                    row={row}
                    setSelectedSeat={setSelectedSeat}
                    selectedSeat={selectedSeat}
                    bookedSeat={bookedSeat}
                  />
                ))}
              </div>

              {/* Clear selection */}
              <button
                onClick={handleRemoveSeatSelection}
                className="theme-text-primary w-sm p-2 rounded-2xl text-center inline-block bg-border-subtle hover:bg-red-500 hover:text-white transition-all duration-200 cursor-pointer"
              >
                <FaTimes className="inline-block text-xl" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom booking bar */}
      <section className="border-t theme-card border-primary/20 fixed w-full bottom-0 left-0 right-0 py-6 bg-primary/5 backdrop-blur-sm">
        <div className="container-fluid">
          <div className="max-w-5xl mx-auto flex max-md:flex-wrap items-center justify-between max-md:gap-4">
            <div>
              <h4 className="text-lg uppercase font-medium theme-text-secondary">
                TOTAL
              </h4>
              <p className="font-bold text-[clamp(1.3rem,3vw,2rem)] theme-text-primary">
                ${price * selectedSeat.length || price}
              </p>
            </div>

            {selectedSeat.length > 0 && (
              <div>
                <h4 className="text-lg uppercase font-medium theme-text-secondary">
                  SEAT
                </h4>
                <p className="font-bold text-[clamp(1.3rem,3vw,2rem)] theme-text-primary">
                  {selectedSeat.join(", ")}
                </p>
              </div>
            )}

            <div className="flex items-center max-md:justify-between max-md:w-full gap-4 flex-wrap">
              <button onClick={handleBackNavigation} className="btn-ghost">
                Back
              </button>
              <button
                className="btn disabled:opacity-50 disabled:pointer-events-none"
                onClick={handleProceedPayment}
                disabled={!selectedSeat.length}
              >
                Proceed Payment
              </button>
            </div>
          </div>
        </div>
      </section>

      <BlurCircle bottom="-100px" left="-100px" />
    </div>
  );
};

export default SeatPage;
