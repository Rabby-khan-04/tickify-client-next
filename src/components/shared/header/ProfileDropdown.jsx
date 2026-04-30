import { ChevronDown, Heart, LogOut, Settings, Ticket } from "lucide-react";
import avatar from "@/../public/icon/profile.png";
import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";
import { logoutUser } from "@/services/Auth.service";
import useAuthStore from "@/store/authStore";

const ProfileDropdown = ({ dropDown, setDropDown }) => {
  const { authUser } = useAuthStore();

  const handleLogout = async () => {
    await logoutUser();
    setDropDown(false);
  };

  return (
    <div className="relative">
      <div
        onClick={() => setDropDown((prev) => !prev)}
        className="flex items-center justify-end cursor-pointer gap-2"
      >
        <Image
          src={authUser?.photoURL || avatar}
          width={32}
          height={32}
          className="rounded-full object-cover"
          alt="profile"
        />

        <div className="max-lg:hidden">
          <ChevronDown
            className={`text-white transition-transform duration-200 ${
              dropDown ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      <div
        className={`absolute z-50 top-[130%] right-0 bg-white w-72 rounded-2xl py-4 px-5 transition-all duration-200 ${
          dropDown
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <Link href="/dashboard/profile" onClick={() => setDropDown(false)}>
          <Settings /> Profile
        </Link>

        <Link href="/bookings" onClick={() => setDropDown(false)}>
          <Ticket /> Bookings
        </Link>

        <Link href="/favorite" onClick={() => setDropDown(false)}>
          <Heart /> Favorite
        </Link>

        <div onClick={handleLogout} className="cursor-pointer">
          <LogOut /> Sign out
        </div>
      </div>
    </div>
  );
};

ProfileDropdown.propTypes = {
  dropDown: PropTypes.bool,
  setDropDown: PropTypes.func,
};

export default ProfileDropdown;
