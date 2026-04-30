import { fetchNowPlaying } from "@/services/Shows.service";
import { useQuery } from "@tanstack/react-query";

const useNowPlayingShow = () => {
  const {
    data: nowPlayingShows,
    isLoading: nowPlayingShowsLoading,
    isError,
  } = useQuery({
    queryKey: ["now-playing"],
    queryFn: fetchNowPlaying,
  });

  return { nowPlayingShows, nowPlayingShowsLoading, isError };
};

export default useNowPlayingShow;
