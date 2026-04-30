const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchUpcomingShows = async () => {
  try {
    const res = await fetch(`${API_URL}/showtimes/upcoming`, {
      cache: "no-store",
    });

    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.log("ERROR While Fetching Upcoming Shows:", error);
    return [];
  }
};

export const fetchNowPlaying = async () => {
  try {
    const res = await fetch(`${API_URL}/movies/now-playing`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch now playing movies");
    }

    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error("ERROR while fetching now playing movies:", error);
    throw error;
  }
};

// Get show by movie
export async function getShow(movieId) {
  const res = await fetch(`${API_URL}/showtimes/movie/${movieId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch show");
  }

  const data = await res.json();
  return data?.data || null;
}
