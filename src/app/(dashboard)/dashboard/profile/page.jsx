"use client";

import AccountDetails from "@/components/profilePage/AccountDetails";
import FavoritesSection from "@/components/profilePage/FavoritesSection";
import ProfileHero from "@/components/profilePage/ProfileHero";
import UpdateProfileForm from "@/components/profilePage/Updateprofileform";

const ProfilePage = () => {
  return (
    <div>
      {/* Profile Hero Card */}
      <section className="py-10 z-30">
        <div className="container-fluid">
          <ProfileHero />
        </div>
      </section>

      {/* Update Forms + Account Details */}
      <section className="pb-10 relative z-30">
        <div className="container-fluid">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4">
            <UpdateProfileForm />
            <AccountDetails />
          </div>
        </div>
      </section>

      {/* Favorites */}
      <section className="pb-20 relative z-30 overflow-x-hidden">
        <div className="container-fluid">
          <FavoritesSection />
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
