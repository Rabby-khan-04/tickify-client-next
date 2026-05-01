import axiosPublic from "@/lib/axios/axiosPublic";
import { useQuery } from "@tanstack/react-query";

const useMovieDetails = (movieId) => {
  const {
    data: movieDetails,
    isLoading: movieDetailsLoading,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["movie-details", movieId],
    queryFn: async ({ queryKey }) => {
      try {
        const [_key, movieId] = queryKey;
        const res = await axiosPublic.get(`/movies/movie/${movieId}`);

        return res.data?.data;
      } catch (error) {
        console.log(`ERROR While Fetching Movie Details: ${error}`);
      }
    },
    enabled: !!movieId,
  });

  return { movieDetails, movieDetailsLoading, isError, isPending };
};

export default useMovieDetails;
