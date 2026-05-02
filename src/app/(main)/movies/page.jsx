import AllMoviesSection from "@/components/moviesPage/Allmoviessection";
import TitleBanner from "@/components/moviesPage/TitleBanner";

const MoviesPage = async () => {
  return (
    <>
      <TitleBanner title="Movies" />
      {/* <NowShowingMovies nowPlayingMovies={nowPlayingMovies} />
      <UpcomingShows upcomingMovies={upcomingMovies} /> */}
      <AllMoviesSection />
    </>
  );
};

export default MoviesPage;
