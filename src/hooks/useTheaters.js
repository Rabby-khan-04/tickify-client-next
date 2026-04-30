import axiosSecure from "@/lib/axios/axiosSecure";
import { useQuery } from "@tanstack/react-query";

const useTheaters = () => {
  const {
    data: theaters = [],
    isLoading: theatersLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["theaters"],
    queryFn: async () => {
      const res = await axiosSecure.get("/theaters");

      return res.data?.data || [];
    },
  });

  return { theaters, theatersLoading, isError, error };
};

export default useTheaters;
