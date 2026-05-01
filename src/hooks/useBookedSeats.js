import axiosPublic from "@/lib/axios/axiosPublic";
import { useQuery } from "@tanstack/react-query";

const useBookedSeats = (showId, info) => {
  const {
    data: bookedSeat,
    isLoading: bookedSeatLoading,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["bookedSeat", info, showId],
    queryFn: async ({ queryKey }) => {
      try {
        const [_key, info, showId] = queryKey;
        const res = await axiosPublic.post(
          `/showtimes/booked-seats/${showId}`,
          info,
        );

        console.log(res);

        return res.data?.data;
      } catch (error) {
        console.log(`ERROR While Fetching Booked Seat: ${error}`);
      }
    },
    enabled: !!showId && !!info,
  });

  return { bookedSeat, bookedSeatLoading, isError, isPending };
};

export default useBookedSeats;
