"use client";

import BlurCircle from "../shared/blurCircle/BlurCircle";
import ShowCard from "../shared/movie/ShowCard";
import SectionTitle from "../shared/sectionTitle/SectionTitle";

const UpcomingShows = ({ upcomingMovies }) => {
  return (
    <section className="p-top relative">
      <BlurCircle top="100px" left="0" />
      <BlurCircle bottom="100px" right="0" />

      <div className="container-fluid">
        <SectionTitle
          title="Upcoming Shows"
          className="text-center text-white"
        />

        <div className="flex items-center justify-center flex-wrap gap-8 mt-4">
          {upcomingMovies?.length > 0 &&
            upcomingMovies.map((movie) => (
              <ShowCard movie={movie} key={movie.id} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingShows;
