"use client";
import { Calendar, Clock, Globe, Star } from "lucide-react";

const inputCls =
  "bg-transparent theme-text-primary text-xl font-semibold outline-none w-full placeholder:text-text-faint border-b border-border-subtle pb-2 focus:border-primary/50 transition-colors";

const StatInput = ({ label, icon: Icon, value, onChange, type = "text" }) => (
  <div className="bg-border-subtle/30 border theme-border rounded-2xl p-5 flex flex-col gap-4">
    <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-text-faint">
      {label}
    </p>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={inputCls}
    />
    <div className="flex justify-end">
      <Icon className="w-4 h-4 text-text-faint" strokeWidth={1.5} />
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
      <div className="bg-border-subtle/30 border theme-border rounded-2xl p-5 flex flex-col gap-4">
        <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-text-faint">
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
            className="bg-transparent text-primary text-xl font-semibold outline-none w-full border-b border-border-subtle pb-2 focus:border-primary/50 transition-colors"
          />
          <span className="text-text-faint text-sm">/10</span>
        </div>
        <div className="flex justify-end">
          <Star className="w-4 h-4 text-text-faint" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
};

export default MetaStatsSection;
