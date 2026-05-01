"use client";

import { Calendar, Clock, Globe, Star } from "lucide-react";

const StatInput = ({ label, icon: Icon, value, onChange, type = "text" }) => (
  <div className="bg-white/3 border border-white/[0.07] rounded-2xl p-5 flex flex-col gap-4">
    <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-white/30">
      {label}
    </p>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-transparent text-white text-xl font-semibold outline-none w-full placeholder:text-white/20 border-b border-white/[0.07] pb-2 focus:border-primary/50 transition-colors"
    />
    <div className="flex justify-end">
      <Icon className="w-4 h-4 text-white/20" strokeWidth={1.5} />
    </div>
  </div>
);

const MetaStatsSection = ({ form, onChange }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatInput
        label="Release Date"
        icon={Calendar}
        type="date"
        value={form.release_date}
        onChange={(val) => onChange("release_date", val)}
      />
      <StatInput
        label="Runtime"
        icon={Clock}
        type="number"
        value={form.runtime}
        onChange={(val) => onChange("runtime", val)}
      />
      <StatInput
        label="Language"
        icon={Globe}
        value={form.original_language}
        onChange={(val) => onChange("original_language", val)}
      />
      <div className="bg-white/3 border border-white/[0.07] rounded-2xl p-5 flex flex-col gap-4">
        <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-white/30">
          Vote Avg
        </p>
        <div className="flex items-baseline gap-1">
          <input
            type="number"
            step="0.001"
            min="0"
            max="10"
            value={form.vote_average}
            onChange={(e) =>
              onChange("vote_average", parseFloat(e.target.value))
            }
            className="bg-transparent text-primary text-xl font-semibold outline-none w-full border-b border-white/[0.07] pb-2 focus:border-primary/50 transition-colors"
          />
          <span className="text-white/25 text-sm">/10</span>
        </div>
        <div className="flex justify-end">
          <Star className="w-4 h-4 text-white/20" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
};

export default MetaStatsSection;
