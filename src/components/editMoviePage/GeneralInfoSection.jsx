"use client";
import { Info } from "lucide-react";

const inputCls =
  "w-full bg-transparent border border-primary/40 rounded-xl px-4 py-3 theme-text-primary text-sm outline-none focus:border-primary transition-colors placeholder:text-text-faint";

const GeneralInfoSection = ({ form, onChange }) => {
  return (
    <div className="theme-card border theme-border rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Info className="w-4 h-4 text-primary" strokeWidth={1.8} />
        <h2 className="theme-text-primary font-semibold text-base">
          General Information
        </h2>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-text-muted text-xs font-medium">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => onChange("title", e.target.value)}
            className={inputCls}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-text-muted text-xs font-medium">Tagline</label>
          <input
            type="text"
            value={form.tagline}
            onChange={(e) => onChange("tagline", e.target.value)}
            className={inputCls}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-text-muted text-xs font-medium">
            Overview / Synopsis
          </label>
          <textarea
            value={form.overview}
            onChange={(e) => onChange("overview", e.target.value)}
            rows={4}
            className={`${inputCls} resize-none`}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoSection;
