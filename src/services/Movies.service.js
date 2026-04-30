export const fetchUpcomingMovies = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/movies/upcoming`,
      {
        cache: "no-store",
      },
    );

    const data = await res.json();

    console.log(data);
    return data?.data || [];
  } catch (error) {
    console.log("ERROR While Fetching Upcoming Movies:", error);
    return [];
  }
};
