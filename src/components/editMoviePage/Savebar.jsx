"use client";

import { CheckCircle2, AlertCircle, Save, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const SaveBar = ({ onSave, onCancel, isSaving, syncStatus, lastSynced }) => {
  const lastSyncedLabel = lastSynced
    ? formatDistanceToNow(new Date(lastSynced), { addSuffix: true })
    : null;

  return (
    <div className="bg-[#0d120e] border border-white/[0.07] rounded-2xl p-6 flex flex-col gap-4">
      {/* Status toast */}
      {syncStatus === "ready" && (
        <div className="flex items-start gap-3 bg-primary/10 border border-primary/20 rounded-xl px-4 py-3">
          <CheckCircle2
            className="w-4 h-4 text-primary mt-0.5 shrink-0"
            strokeWidth={2}
          />
          <div>
            <p className="text-primary text-xs font-semibold">Ready for Sync</p>
            <p className="text-primary/60 text-xs">
              All local changes are validated.
            </p>
          </div>
        </div>
      )}

      {syncStatus === "saved" && (
        <div className="flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
          <CheckCircle2
            className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0"
            strokeWidth={2}
          />
          <div>
            <p className="text-emerald-400 text-xs font-semibold">
              Saved Successfully
            </p>
            <p className="text-emerald-400/60 text-xs">
              Changes pushed to the database.
            </p>
          </div>
        </div>
      )}

      {syncStatus === "error" && (
        <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          <AlertCircle
            className="w-4 h-4 text-red-400 mt-0.5 shrink-0"
            strokeWidth={2}
          />
          <div>
            <p className="text-red-400 text-xs font-semibold">Save Failed</p>
            <p className="text-red-400/60 text-xs">
              Check your connection and try again.
            </p>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <button
        onClick={onSave}
        disabled={isSaving}
        className="w-full flex items-center justify-center gap-2 bg-primary text-[#061008] font-semibold text-sm py-3 rounded-xl hover:opacity-85 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSaving ? (
          <>
            <span className="w-4 h-4 rounded-full border-2 border-[#061008] border-t-transparent animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="w-4 h-4" strokeWidth={2} />
            Save Changes
          </>
        )}
      </button>

      <button
        onClick={onCancel}
        className="w-full flex items-center justify-center gap-2 border border-white/10 text-white/60 font-medium text-sm py-3 rounded-xl hover:bg-white/3 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
        Cancel Changes
      </button>

      {/* Last synced */}
      {lastSyncedLabel && (
        <p className="text-center text-[10px] tracking-widest uppercase text-white/20 font-medium">
          Last synced: {lastSyncedLabel}
        </p>
      )}
    </div>
  );
};

export default SaveBar;
