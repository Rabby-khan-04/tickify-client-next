"use client";

import {
  HiUsers,
  HiFilm,
  HiTicket,
  HiCurrencyDollar,
  HiClock,
  HiBuildingOffice2,
} from "react-icons/hi2";
import { HiRefresh } from "react-icons/hi";
import { TbChartLine } from "react-icons/tb";
import useDashboardStats from "@/hooks/usedashboardstats";
import useDashboardCharts from "@/hooks/usedashboardcharts";
import StatCardSkeleton from "@/components/dashboard/admin/StatCardSkeleton";
import StatCard from "@/components/dashboard/admin/StatCard";
import BookingsRevenueChart from "@/components/dashboard/admin/Bookingsrevenuechart";
import BookingStatusPieChart from "@/components/dashboard/admin/Bookingstatuspiechart";
import GenresPieChart from "@/components/dashboard/admin/Genrespiechart";
import theaterImg from "@/../public/image/theater-3.png";

const fmt = (n) =>
  n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(1)}M`
    : n >= 1_000
      ? n.toLocaleString()
      : String(n ?? 0);

const SYSTEM_SERVICES = [
  { label: "API Server" },
  { label: "Database Cluster" },
  { label: "CDN Nodes" },
  { label: "Payment Gateway", note: "Last checked: 2 mins ago" },
];

const ChartSkeleton = ({ height = "h-[300px]" }) => (
  <div
    className={`theme-surface border border-primary/10 rounded-2xl p-6 ${height} animate-pulse`}
  >
    <div className="h-4 w-40 bg-text-faint/10 rounded mb-2" />
    <div className="h-3 w-24 bg-text-faint/10 rounded mb-6" />
    <div className="flex items-end gap-3 h-40 px-2">
      {[60, 85, 45, 90, 70, 55].map((h, i) => (
        <div
          key={i}
          className="flex-1 bg-text-faint/10 rounded-t"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  </div>
);

const DashboardPage = () => {
  const { stats, isLoading, isFetching, refetch } = useDashboardStats();
  const {
    monthlyData,
    statusData,
    genreData,
    isLoading: chartsLoading,
  } = useDashboardCharts();

  const statCards = stats
    ? [
        {
          icon: HiUsers,
          label: "Total Users",
          value: fmt(stats.totalUsers.value),
          change: stats.totalUsers.change,
        },
        {
          icon: HiFilm,
          label: "Total Movies",
          value: fmt(stats.totalMovies.value),
          change: stats.totalMovies.change,
        },
        {
          icon: HiTicket,
          label: "Total Bookings",
          value: fmt(stats.totalBookings.value),
          change: stats.totalBookings.change,
        },
        {
          icon: HiCurrencyDollar,
          label: "Total Revenue",
          value: fmt(stats.totalRevenue.value),
          change: stats.totalRevenue.change,
          prefix: "$",
        },
        {
          icon: HiClock,
          label: "Active Showtimes",
          value: fmt(stats.activeShowtimes.value),
          change: null,
          note: "Steady",
        },
        {
          icon: HiBuildingOffice2,
          label: "Total Theaters",
          value: fmt(stats.totalTheaters.value),
          change: null,
          note:
            stats.totalTheaters.newThisMonth > 0
              ? `+${stats.totalTheaters.newThisMonth} New`
              : null,
        },
      ]
    : [];

  return (
    <div className="min-h-screen py-10 px-6 lg:px-10">
      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-10 flex-wrap gap-4">
        <div>
          <h1 className="theme-text-primary text-3xl lg:text-4xl font-bold tracking-tight">
            Dashboard <span className="text-primary">Overview</span>
          </h1>
          <p className="text-text-faint text-sm mt-2">
            Real-time cinematic performance analytics and system health metrics.
          </p>
        </div>

        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex items-center gap-2 bg-primary text-[#061008] font-semibold text-sm px-5 py-3 rounded-xl hover:opacity-85 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          <HiRefresh
            className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh Data
        </button>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
        {isLoading
          ? [...Array(6)].map((_, i) => <StatCardSkeleton key={i} />)
          : statCards.map((card) => <StatCard key={card.label} {...card} />)}
      </div>

      {/* ── Charts row 1 ── */}
      <div className="mb-5">
        {chartsLoading ? (
          <ChartSkeleton height="h-[340px]" />
        ) : (
          <BookingsRevenueChart data={monthlyData} />
        )}
      </div>

      {/* ── Charts row 2 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        {chartsLoading ? (
          <>
            <ChartSkeleton height="h-[260px]" />
            <ChartSkeleton height="h-[260px]" />
          </>
        ) : (
          <>
            <BookingStatusPieChart data={statusData} />
            <GenresPieChart data={genreData} />
          </>
        )}
      </div>

      {/* ── Bottom row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">
        {/* Prime Time Occupancy */}
        <div
          style={{ backgroundImage: `url(${theaterImg.src})` }}
          className="relative min-h-70 rounded-2xl overflow-hidden border border-primary/10 bg-center bg-cover bg-no-repeat"
        >
          <div className="absolute inset-0 bg-bg-surface/40" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,100,0.03) 3px, rgba(0,255,100,0.03) 4px),
                repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(0,255,100,0.02) 60px, rgba(0,255,100,0.02) 61px)
              `,
            }}
          />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-primary/40 blur-md rounded-full" />
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-linear-to-t from-bg-base via-bg-base/80 to-transparent">
            <h3 className="text-primary text-xl font-bold mb-2">
              Prime Time Occupancy
            </h3>
            <p className="theme-text-secondary text-sm leading-relaxed max-w-lg">
              Theater halls are currently at 84% capacity for the upcoming
              blockbuster screenings. Ticket sales have peaked during the
              evening hours between 6 PM and 10 PM.
            </p>
          </div>
        </div>

        {/* System Status */}
        <div className="theme-surface border border-primary/10 rounded-2xl p-7 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <TbChartLine className="w-4 h-4 text-primary" />
            </span>
          </div>

          <h3 className="theme-text-primary text-xl font-bold -mt-3">
            System Status
          </h3>

          <ul className="flex flex-col gap-0 divide-y divide-border-subtle">
            {SYSTEM_SERVICES.map(({ label, note }) => (
              <li
                key={label}
                className="flex items-center justify-between py-4"
              >
                <div>
                  <p className="theme-text-secondary text-sm">{label}</p>
                  {note && (
                    <p className="text-primary/50 text-xs mt-0.5 italic">
                      {note}
                    </p>
                  )}
                </div>
                <span className="relative flex items-center justify-center w-4 h-4">
                  <span className="absolute w-3 h-3 rounded-full bg-primary/30 animate-ping" />
                  <span className="relative w-2.5 h-2.5 rounded-full bg-primary block" />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
