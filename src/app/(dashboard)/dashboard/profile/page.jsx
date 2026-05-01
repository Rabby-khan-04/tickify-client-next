import AccountDetails from "@/components/profilePage/AccountDetails";
import FavoritesSection from "@/components/profilePage/FavoritesSection";
import ProfileHero from "@/components/profilePage/ProfileHero";

const ProfilePage = () => {
  return (
    <div className="">
      {/* Profile Hero Card */}
      <section className="py-10 z-30">
        <div className="container-fluid">
          <ProfileHero />
        </div>
      </section>

      {/* Favorites + Account Details */}
      <section className="pb-20 relative z-30 overflow-x-hidden">
        <div className="container-fluid">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4">
            <FavoritesSection />
            <AccountDetails />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
