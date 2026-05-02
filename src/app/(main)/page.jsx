import Banner from "@/components/homePage/banner/Banner";
import FAQSection from "@/components/homePage/fAQSection/FAQSection";
import NewsletterSection from "@/components/homePage/newsletter/NewsletterSection";
import NowShowing from "@/components/homePage/nowShowing/NowShowing";
import OurGallery from "@/components/homePage/OurGallery";
import Promotion from "@/components/homePage/promotion/Promotion";
import UpcomingMovies from "@/components/homePage/upcomingMovies/UpcomingMovies";
import WhyChooseUs from "@/components/homePage/whyChooseUs/WhyChooseUs";
import { fetchUpcomingShows } from "@/services/Shows.service";

export default async function HomePage() {
  const upcomingShows = await fetchUpcomingShows();
  const upcomingMovies = await fetchUpcomingShows();

  return (
    <>
      <Banner upcomingShows={upcomingShows} />
      <NowShowing upcomingShows={upcomingShows} />
      <UpcomingMovies upcomingMovies={upcomingMovies} />
      <Promotion />
      <OurGallery />
      <FAQSection />
      <WhyChooseUs />
      <NewsletterSection />
    </>
  );
}
