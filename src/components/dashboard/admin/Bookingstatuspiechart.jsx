"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const STATUS_COLORS = {
  booked: "#00ff64",
  cancelled: "#ff4d4d",
  pending: "#ffaa00",
  completed: "#00ccff",
};
const DEFAULT_COLOR = "#555";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0].payload;
  return (
    <div className="theme-surface border border-primary/20 rounded-xl px-4 py-3 shadow-xl">
      <p
        className="font-semibold text-sm capitalize"
        style={{ color: STATUS_COLORS[name] ?? DEFAULT_COLOR }}
      >
        {name}
      </p>
      <p className="text-text-muted text-xs mt-0.5">{value} bookings</p>
    </div>
  );
};

const BookingStatusPieChart = ({ data = [] }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  return (
    <div className="theme-surface border border-primary/10 rounded-2xl p-6">
      <div className="mb-6">
        <h3 className="theme-text-primary font-bold text-lg">Booking Status</h3>
        <p className="text-text-faint text-xs mt-1">All-time breakdown</p>
      </div>
      <div className="flex items-center gap-6">
        <div className="shrink-0">
          <ResponsiveContainer width={160} height={160}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={72}
                paddingAngle={3}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={STATUS_COLORS[entry.name] ?? DEFAULT_COLOR}
                    stroke="transparent"
                    opacity={0.9}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul className="flex flex-col gap-3 flex-1">
          {data.map((entry) => {
            const pct = total ? Math.round((entry.value / total) * 100) : 0;
            const color = STATUS_COLORS[entry.name] ?? DEFAULT_COLOR;
            return (
              <li
                key={entry.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <span className="theme-text-secondary text-sm capitalize">
                    {entry.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="theme-text-primary font-semibold text-sm">
                    {entry.value}
                  </span>
                  <span className="text-text-faint text-xs">{pct}%</span>
                </div>
              </li>
            );
          })}
          <li className="flex items-center justify-between pt-2 border-t border-border-subtle">
            <span className="text-text-muted text-xs">Total</span>
            <span className="theme-text-primary font-bold text-sm">
              {total}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BookingStatusPieChart;
