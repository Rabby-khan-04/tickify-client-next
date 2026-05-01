"use client";

import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/dateFormatter";
import useAuthStore from "@/store/authStore";

const ProfileHero = () => {
  const { userInfo } = useAuthStore();

  if (!userInfo) return null;

  const { name, email, photo, role } = userInfo;

  return (
    <div className="bg-[#0d120e] border border-white/[0.07] rounded-2xl p-8 flex flex-col lg:flex-row items-start gap-7">
      {/* Avatar */}
      <div className="relative shrink-0">
        <div className="w-37.5 h-37.5 rounded-full overflow-hidden border-2 border-primary/30">
          <Image
            src={photo || "/image/avatar-placeholder.png"}
            alt={name}
            width={150}
            height={150}
            className="object-cover w-full h-full"
          />
        </div>
        {/* online dot */}
        <span className="absolute bottom-2 right-2 w-4 h-4 bg-primary rounded-full border-2 border-[#0d120e]" />
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-white text-xl font-semibold">{name}</h1>
          {role && (
            <span className="bg-primary/15 border border-primary/25 text-primary text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
              {role}
            </span>
          )}
        </div>

        <p className="text-white/45 text-sm">{email}</p>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-2 flex-wrap">
          <Link
            href="/profile/edit"
            className="bg-primary text-[#061008] text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-85 transition-opacity"
          >
            Edit Profile
          </Link>
          <Link
            href="/profile/security"
            className="border border-white/15 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-white/5 transition-colors"
          >
            Security Settings
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="flex lg:flex-col items-center sm:items-end gap-6 lg:gap-4 lg:border-l lg:border-white/[0.07] sm:pl-8 sm:self-center">
        <div className="text-center sm:text-right">
          <p className="text-white text-2xl font-semibold">124</p>
          <p className="text-white/35 text-[10px] font-medium tracking-[0.12em] uppercase mt-0.5">
            Bookings
          </p>
        </div>
        <div className="w-px h-8 sm:hidden bg-white/[0.07]" />
        <div className="text-center sm:text-right">
          <p className="text-white text-2xl font-semibold">42</p>
          <p className="text-white/35 text-[10px] font-medium tracking-[0.12em] uppercase mt-0.5">
            Reviews
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHero;
