"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="theme-surface border border-primary/20 rounded-xl px-4 py-3 shadow-xl">
      <p className="text-text-muted text-xs mb-2 uppercase tracking-wider">
        {label}
      </p>
      {payload.map((entry) => (
        <p
          key={entry.dataKey}
          className="text-sm font-semibold"
          style={{ color: entry.color }}
        >
          {entry.name === "Revenue"
            ? `$${entry.value.toLocaleString()}`
            : entry.value}{" "}
          <span className="font-normal text-text-faint">{entry.name}</span>
        </p>
      ))}
    </div>
  );
};

const BookingsRevenueChart = ({ data = [] }) => {
  return (
    <div className="theme-surface border border-primary/10 rounded-2xl p-6">
      <div className="mb-6">
        <h3 className="theme-text-primary font-bold text-lg">
          Bookings & Revenue
        </h3>
        <p className="text-text-faint text-xs mt-1">
          Last 6 months performance
        </p>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barGap={4} barCategoryGap="30%">
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.04)"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            yAxisId="left"
            tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={32}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={50}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(0,255,100,0.04)" }}
          />
          <Legend
            wrapperStyle={{ paddingTop: "16px" }}
            formatter={(value) => (
              <span
                style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px" }}
              >
                {value}
              </span>
            )}
          />
          <Bar
            yAxisId="left"
            dataKey="bookings"
            name="Bookings"
            fill="rgba(0,255,100,0.75)"
            radius={[4, 4, 0, 0]}
            maxBarSize={28}
          />
          <Bar
            yAxisId="right"
            dataKey="revenue"
            name="Revenue"
            fill="rgba(0,200,80,0.3)"
            radius={[4, 4, 0, 0]}
            maxBarSize={28}
            stroke="rgba(0,255,100,0.5)"
            strokeWidth={1}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BookingsRevenueChart;
