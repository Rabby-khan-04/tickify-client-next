import axiosSecure from "@/lib/axios/axiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAllMovies = (page, limit) => {
  const {
    data: allmovies,
    isLoading: allMoviesLoading,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["all-movies", page, limit],
    queryFn: async ({ queryKey }) => {
      try {
        const [_key, page, limit] = queryKey;
        const res = await axiosSecure.get("/movies", {
          params: { page, limit },
        });
        return res.data?.data;
      } catch (error) {
        console.log(`ERROR While Fetching All Movies: ${error}`);
      }
    },
    enabled: page !== undefined && page !== null && !!limit,
    keepPreviousData: true,
  });

  return { allmovies, allMoviesLoading, isError, isPending };
};

export default useAllMovies;
