"use client";

import useAuthStore from "@/store/authStore";
import {
  CalendarDays,
  RefreshCcw,
  ShieldCheck,
  Bell,
  ChevronRight,
  Settings,
} from "lucide-react";

const AccountDetails = () => {
  const { userInfo } = useAuthStore();

  if (!userInfo) return null;

  const { createdAt, updatedAt, role } = userInfo;

  const formatMonth = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const tier =
    role === "admin"
      ? "Premium Platinum"
      : role === "moderator"
        ? "Premium Gold"
        : "Standard";

  const rows = [
    {
      Icon: CalendarDays,
      label: "MEMBER SINCE",
      value: formatMonth(createdAt),
      action: null,
    },
    {
      Icon: RefreshCcw,
      label: "LAST UPDATED",
      value: formatMonth(updatedAt),
      action: null,
    },
    {
      Icon: ShieldCheck,
      label: "ACCOUNT TIER",
      value: tier,
      action: <ChevronRight className="w-4 h-4 text-white/25" />,
    },
    {
      Icon: Bell,
      label: "NOTIFICATION PREFS",
      value: "Email, SMS Enabled",
      action: (
        <Settings className="w-4 h-4 text-white/25 hover:text-white/60 cursor-pointer transition-colors" />
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <svg
          className="w-5 h-5 text-white/40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <h2 className="text-white font-semibold text-base">Account Details</h2>
      </div>

      {/* Detail rows */}
      <div className="bg-[#0d120e] border border-white/[0.07] rounded-2xl overflow-hidden divide-y divide-white/[0.07]">
        {rows.map(({ Icon, label, value, action }) => (
          <div
            key={label}
            className="flex items-center gap-4 px-6 py-5 hover:bg-white/[0.02] transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-primary" strokeWidth={1.7} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-medium tracking-[0.12em] uppercase text-white/30 mb-0.5">
                {label}
              </p>
              <p className="text-white text-sm font-medium truncate">{value}</p>
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountDetails;
