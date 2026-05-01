import axiosSecure from "@/lib/axios/axiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useBookings = (page, limit, totalPage) => {
  const queryClient = useQueryClient();

  const {
    data: bookings,
    isLoading: bookingsLoading,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["bookings", page, limit],
    queryFn: async ({ queryKey }) => {
      const [_key, page, limit] = queryKey;
      const res = await axiosSecure.get("/bookings/my", {
        params: { page, limit },
      });
      return res.data?.data;
    },
    enabled: page !== undefined && page !== null && !!limit,
    keepPreviousData: true,
  });

  if (page < totalPage) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", page + 1, limit],
      queryFn: async ({ queryKey }) => {
        const [_key, page, limit] = queryKey;
        const res = await axiosSecure.get("/bookings/my", {
          params: { page: page + 1, limit },
        });
        return res.data?.data;
      },
    });
  }

  return { bookings, bookingsLoading, isError, isPending };
};

export default useBookings;
