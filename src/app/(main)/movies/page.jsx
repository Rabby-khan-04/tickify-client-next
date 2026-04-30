import UpcomingMovies from "@/components/homePage/upcomingMovies/UpcomingMovies";
import NowShowingMovies from "@/components/moviesPage/NowShowingMovies";
import TitleBanner from "@/components/moviesPage/TitleBanner";
import UpcomingShows from "@/components/moviesPage/UpcomingShows";
import { fetchUpcomingMovies } from "@/services/Movies.service";
import { fetchNowPlaying } from "@/services/Shows.service";

const MoviesPage = async () => {
  const nowPlayingMovies = await fetchNowPlaying();
  const upcomingMovies = await fetchUpcomingMovies();

  return (
    <>
      <TitleBanner title="Movies" />
      <NowShowingMovies nowPlayingMovies={nowPlayingMovies} />
      <UpcomingShows upcomingMovies={upcomingMovies} />
    </>
  );
};

export default MoviesPage;
