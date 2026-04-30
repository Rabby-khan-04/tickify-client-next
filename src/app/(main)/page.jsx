import Banner from "@/components/homePage/banner/Banner";

async function getUpcomingShows() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/showtimes/upcoming`,
    {
      cache: "no-store",
    },
  );

  const data = await res.json();
  return data?.data || [];
}

export default async function HomePage() {
  const upcomingShows = await getUpcomingShows();

  return <Banner upcomingShows={upcomingShows} />;
}
