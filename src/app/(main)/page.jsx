import Banner from "@/components/homePage/banner/Banner";
import NowShowing from "@/components/homePage/nowShowing/NowShowing";
import Promotion from "@/components/homePage/promotion/Promotion";
import UpcomingMovies from "@/components/homePage/upcomingMovies/UpcomingMovies";
import { fetchUpcomingShows } from "@/services/Shows.service";

export default async function HomePage() {
  const upcomingShows = await fetchUpcomingShows();
  const upcomingMovies = await fetchUpcomingShows();

  return (
    <>
      <Banner upcomingShows={upcomingShows} />;
      <NowShowing upcomingShows={upcomingShows} />
      <UpcomingMovies upcomingMovies={upcomingMovies} />
      <Promotion />
    </>
  );
}
