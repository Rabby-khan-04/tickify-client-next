import MovieClient from "@/components/moviePage/MovieClient";
import { getFavorites, getMovie } from "@/services/Movies.service";
import { getShow } from "@/services/Shows.service";
import useAuthStore from "@/store/authStore";

export default async function MoviePage({ params }) {
  const { movieId } = await params;
  const movieDetails = await getMovie(movieId);
  const showData = await getShow(movieDetails?._id);

  return <MovieClient movieDetails={movieDetails} showData={showData} />;
}
