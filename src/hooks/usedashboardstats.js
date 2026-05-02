import axiosSecure from "@/lib/axios/axiosSecure";
import { useQuery } from "@tanstack/react-query";

const useDashboardStats = () => {
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/stats");
      return res.data?.data;
    },
    staleTime: 1000 * 60 * 2, // 2 min cache
  });

  return { stats: data ?? null, isLoading, isError, refetch, isFetching };
};

export default useDashboardStats;
