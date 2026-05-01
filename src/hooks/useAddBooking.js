import axiosPublic from "@/lib/axios/axiosPublic";
import { useMutation } from "@tanstack/react-query";

const useAddBooking = () => {
  const {
    mutate: addBooking,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["add-booking"],
    mutationFn: async (bookingDetails) => {
      try {
        const { date, time, ...rest } = bookingDetails;

        const res = await axiosPublic.post(`/bookings/${date}/${time}`, rest);
        return res;
      } catch (error) {
        console.log(`ERROR While Booking Show: ${error}`);
      }
    },
  });

  return { addBooking, isPending, isError };
};

export default useAddBooking;
