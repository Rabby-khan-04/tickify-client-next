import axiosPublic from "@/lib/axios/axiosPublic";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchUpcomingMovies = async () => {
  try {
    const res = await fetch(`${API_URL}/movies/upcoming`, {
      cache: "no-store",
    });

    const data = await res.json();

    return data?.data || [];
  } catch (error) {
    console.log("ERROR While Fetching Upcoming Movies:", error);
    return [];
  }
};

// Get single movie details
export async function getMovie(movieId) {
  const res = await fetch(`${API_URL}/movies/${movieId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch movie");
  }

  const data = await res.json();
  return data?.data || null;
}

// Get favorites

export async function getFavorites() {
  try {
    const res = await axiosPublic.get("/users/favorites");

    return res?.data?.data || [];
  } catch (error) {
    console.log(`ERROR While Fetching Favorites: ${error}`);
  }
}

export const fetchAllMovies = async (page, limit) => {
  const res = await axiosSecure.get("/movies", {
    params: { page, limit },
  });

  console.log("from", res);

  return res.data?.data;
};
