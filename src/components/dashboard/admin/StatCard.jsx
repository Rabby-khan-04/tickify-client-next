import { TbChartLine } from "react-icons/tb";

const StatCard = ({ icon: Icon, label, value, change, note, prefix = "" }) => {
  const hasChange = change !== null && change !== undefined;
  const positive = change >= 0;

  return (
    <div className="group relative bg-[#0d1a0f] border border-primary/10 rounded-2xl p-6 flex flex-col gap-4 overflow-hidden hover:border-primary/30 transition-all duration-300">
      {/* Background icon watermark */}
      <Icon className="absolute right-4 top-4 w-12 h-12 text-primary/8 group-hover:text-primary/15 transition-colors duration-300" />

      {/* Label row */}
      <div className="flex items-center gap-3">
        <span className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-primary" />
        </span>
        <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">
          {label}
        </p>
      </div>

      {/* Value row */}
      <div className="flex items-baseline gap-3">
        <span className="text-white text-4xl font-bold tracking-tight leading-none">
          {prefix}
          {value}
        </span>
        {hasChange && (
          <span
            className={`flex items-center gap-1 text-xs font-semibold ${
              positive ? "text-primary" : "text-red-400"
            }`}
          >
            <TbChartLine className="w-3.5 h-3.5" />
            {positive ? "+" : ""}
            {change}%
          </span>
        )}
        {note && <span className="text-white/30 text-xs">— {note}</span>}
      </div>

      {/* Bottom accent bar */}
      <div className="h-px w-full bg-linear-to-r from-primary/30 via-primary/10 to-transparent" />
    </div>
  );
};

export default StatCard;
