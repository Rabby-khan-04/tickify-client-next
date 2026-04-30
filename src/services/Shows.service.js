export const fetchUpcomingShows = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/showtimes/upcoming`,
      {
        cache: "no-store",
      },
    );

    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.log("ERROR While Fetching Upcoming Shows:", error);
    return [];
  }
};
