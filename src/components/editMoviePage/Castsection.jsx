"use client";
import { useState } from "react";
import { Users, Trash2, UserPlus } from "lucide-react";

const CastSection = ({ casts, onChange }) => {
  const [nameInput, setNameInput] = useState("");
  const [charInput, setCharInput] = useState("");

  const removeCast = (id) => onChange(casts.filter((c) => c.id !== id));

  const addCast = () => {
    if (!nameInput.trim()) return;
    onChange([
      ...casts,
      { id: Date.now(), name: nameInput.trim(), character: charInput.trim() },
    ]);
    setNameInput("");
    setCharInput("");
  };

  const inputCls =
    "w-full bg-transparent border border-dashed border-border-subtle rounded-xl px-3 py-2 theme-text-primary text-xs outline-none focus:border-primary/40 transition-colors placeholder:text-text-faint";

  return (
    <div className="theme-card border theme-border rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <Users className="w-4 h-4 text-primary" strokeWidth={1.8} />
        <h2 className="theme-text-primary font-semibold text-base">Top Cast</h2>
      </div>
      <div className="flex flex-col gap-2 mb-4">
        {casts.map((cast) => (
          <div
            key={cast.id}
            className="flex items-center gap-3 bg-border-subtle/20 border theme-border rounded-xl px-4 py-3"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
              <Users className="w-3.5 h-3.5 text-primary" strokeWidth={1.6} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="theme-text-primary text-sm font-medium truncate">
                {cast.name}
              </p>
              {cast.character && (
                <p className="text-text-faint text-xs truncate">
                  {cast.character}
                </p>
              )}
            </div>
            <button
              onClick={() => removeCast(cast.id)}
              className="text-text-faint hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="Actor name..."
          className={inputCls}
        />
        <input
          type="text"
          value={charInput}
          onChange={(e) => setCharInput(e.target.value)}
          placeholder="Character name..."
          className={inputCls}
        />
        <button
          onClick={addCast}
          className="flex items-center justify-center gap-2 border border-dashed border-primary/30 text-primary rounded-xl py-2.5 text-xs font-semibold hover:bg-primary/5 transition-colors"
        >
          <UserPlus className="w-3.5 h-3.5" />
          Add Cast Member
        </button>
      </div>
    </div>
  );
};

export default CastSection;
