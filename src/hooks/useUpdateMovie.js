import axiosPublic from "@/lib/axios/axiosPublic";
import { useMutation } from "@tanstack/react-query";

const useUpdateMovie = () => {
  const {
    mutate: updateMovie,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["update-movie"],
    mutationFn: async ({ movieId, ...updateData }) => {
      try {
        const res = await axiosPublic.patch(
          `/movies/movie/${movieId}`,
          updateData,
        );
        return res;
      } catch (error) {
        console.log(`ERROR While Updating Movie: ${error}`);
      }
    },
  });

  return { updateMovie, isPending, isError };
};

export default useUpdateMovie;
