"use client";

import BlurCircle from "@/components/shared/blurCircle/BlurCircle";
import Spinner from "@/components/shared/loader/Spinner";
import Ticket from "@/components/shared/movie/Ticket";
import Pagination from "@/components/shared/pagination/Pagination";
import SectionTitle from "@/components/shared/sectionTitle/SectionTitle";
import useBookings from "@/hooks/useBookings";
import axiosSecure from "@/lib/axios/axiosSecure";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 8;

const BookingsPage = () => {
  const [totalItem, setTotalItem] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  // Derived — no useState or useEffect needed
  const totalPage = Math.ceil(totalItem / ITEMS_PER_PAGE);

  const { bookings, bookingsLoading } = useBookings(
    currentPage,
    ITEMS_PER_PAGE,
  );

  useEffect(() => {
    async function getBookingCount() {
      try {
        const res = await axiosSecure.get("/bookings/my-booking-count");
        setTotalItem(res?.data?.data ?? 0);
      } catch (error) {
        console.error("Failed to fetch booking count:", error);
      }
    }

    getBookingCount();
  }, []);

  if (bookingsLoading) return <Spinner />;

  return (
    <div className="py-20 lg:py-32 relative overflow-hidden">
      <section className="min-h-screen">
        <div className="container-fluid">
          <SectionTitle title="Ticket Detail" />
          {bookings?.length > 0 ? (
            <>
              <div className="flex items-center gap-8 flex-wrap justify-center">
                {bookings.map((booking) => (
                  <Ticket booking={booking} key={booking._id} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPage={totalPage}
              />
            </>
          ) : (
            <p className="text-white/60 text-center mt-20">
              No bookings found.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default BookingsPage;
