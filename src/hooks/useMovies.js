import axiosSecure from "@/lib/axios/axiosSecure";
import { useQuery } from "@tanstack/react-query";

const useMovies = ({
  page = 1,
  limit = 9,
  search,
  genres,
  language,
  sortBy,
  order,
}) => {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["movies", page, limit, search, genres, language, sortBy, order],
    queryFn: async () => {
      try {
        const params = { page, limit };

        if (search) params.search = search;
        if (genres?.length) params.genres = genres.join(",");
        if (language?.length) params.language = language.join(",");
        if (sortBy) {
          params.sortBy = sortBy;
          params.order = order || "desc";
        }

        const res = await axiosSecure.get("/movies/all", { params });
        return res.data?.data;
      } catch (error) {
        console.error(`ERROR While Fetching Movies: ${error}`);
        throw error;
      }
    },
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
  });

  return {
    movies: data?.movies ?? [],
    pagination: data?.pagination ?? {},
    isLoading,
    isFetching,
    isError,
  };
};

export default useMovies;
