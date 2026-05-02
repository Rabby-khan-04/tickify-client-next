import axiosSecure from "@/lib/axios/axiosSecure";
import { useQuery } from "@tanstack/react-query";

const useMovieFilterOptions = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["movie-filter-options"],
    queryFn: async () => {
      const res = await axiosSecure.get("/movies/filter-options");

      return res.data?.data;
    },
    staleTime: 1000 * 60 * 10,
  });

  return {
    genres: data?.genres ?? [],
    languages: data?.languages ?? [],
    isLoading,
  };
};

export default useMovieFilterOptions;
