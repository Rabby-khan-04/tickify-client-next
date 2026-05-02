"use client";
import Image from "next/image";
import useAuthStore from "@/store/authStore";

const ProfileHero = () => {
  const { userInfo } = useAuthStore();
  if (!userInfo) return null;
  const { name, email, photo, role } = userInfo;

  return (
    <div className="theme-card border theme-border rounded-2xl p-8 flex flex-col lg:flex-row items-start gap-7">
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
        {/* Online dot */}
        <span className="absolute bottom-2 right-2 w-4 h-4 bg-primary rounded-full border-2 border-[var(--bg-card)]" />
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="theme-text-primary text-xl font-semibold">{name}</h1>
          {role && (
            <span className="bg-primary/15 border border-primary/25 text-primary text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
              {role}
            </span>
          )}
        </div>
        <p className="theme-text-secondary text-sm">{email}</p>
        <p className="theme-text-muted text-xs mt-1">
          Update your name, photo, email and password in the section below.
        </p>
      </div>

      {/* Stats */}
      <div className="flex lg:flex-col items-center sm:items-end gap-6 lg:gap-4 lg:border-l border-border-subtle sm:pl-8 sm:self-center">
        <div className="text-center sm:text-right">
          <p className="theme-text-primary text-2xl font-semibold">124</p>
          <p className="theme-text-muted text-[10px] font-medium tracking-[0.12em] uppercase mt-0.5">
            Bookings
          </p>
        </div>
        <div className="w-px h-8 sm:hidden bg-border-subtle" />
        <div className="text-center sm:text-right">
          <p className="theme-text-primary text-2xl font-semibold">42</p>
          <p className="theme-text-muted text-[10px] font-medium tracking-[0.12em] uppercase mt-0.5">
            Reviews
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHero;
