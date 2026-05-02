"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#00ff64",
  "#00cc50",
  "#009940",
  "#006628",
  "#33ffaa",
  "#66ffbb",
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0].payload;
  return (
    <div className="bg-[#0d1a0f] border border-primary/20 rounded-xl px-4 py-3 shadow-xl">
      <p className="text-primary font-semibold text-sm">{name}</p>
      <p className="text-white/50 text-xs mt-0.5">{value} movies</p>
    </div>
  );
};

const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, percent }) => {
  if (percent < 0.06) return null;
  const RADIAN = Math.PI / 180;
  const r = outerRadius + 18;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="rgba(255,255,255,0.45)"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={11}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const GenresPieChart = ({ data = [] }) => {
  return (
    <div className="bg-[#0d1a0f] border border-primary/10 rounded-2xl p-6">
      <div className="mb-6">
        <h3 className="text-white font-bold text-lg">Top Genres</h3>
        <p className="text-white/35 text-xs mt-1">Movie catalog distribution</p>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={95}
            paddingAngle={3}
            dataKey="value"
            labelLine={false}
            label={renderCustomLabel}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                opacity={0.85}
                stroke="transparent"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span
                style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px" }}
              >
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GenresPieChart;
