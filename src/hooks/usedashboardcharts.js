import axiosSecure from "@/lib/axios/axiosSecure";
import { useQuery } from "@tanstack/react-query";

const useDashboardCharts = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard-charts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/charts");
      return res.data?.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    monthlyData: data?.monthlyBookingsAndRevenue ?? [],
    statusData: data?.bookingStatusBreakdown ?? [],
    genreData: data?.topGenres ?? [],
    isLoading,
    isError,
  };
};

export default useDashboardCharts;
