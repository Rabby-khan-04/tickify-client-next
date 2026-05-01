import { getFavorites } from "@/services/Movies.service";
import { useQuery } from "@tanstack/react-query";

const useFavorites = () => {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });
};

export default useFavorites;
