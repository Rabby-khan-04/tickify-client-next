"use client";

import { useState } from "react";
import { Users, Trash2, UserPlus } from "lucide-react";

const CastSection = ({ casts, onChange }) => {
  const [nameInput, setNameInput] = useState("");
  const [charInput, setCharInput] = useState("");

  const removeCast = (id) => {
    onChange(casts.filter((c) => c.id !== id));
  };

  const addCast = () => {
    if (!nameInput.trim()) return;
    const newCast = {
      id: Date.now(),
      name: nameInput.trim(),
      character: charInput.trim(),
    };
    onChange([...casts, newCast]);
    setNameInput("");
    setCharInput("");
  };

  return (
    <div className="bg-[#0d120e] border border-white/[0.07] rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <Users className="w-4 h-4 text-primary" strokeWidth={1.8} />
        <h2 className="text-white font-semibold text-base">Top Cast</h2>
      </div>

      {/* Cast list */}
      <div className="flex flex-col gap-2 mb-4">
        {casts.map((cast) => (
          <div
            key={cast.id}
            className="flex items-center gap-3 bg-white/3 border border-white/6 rounded-xl px-4 py-3"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
              <Users className="w-3.5 h-3.5 text-primary" strokeWidth={1.6} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">
                {cast.name}
              </p>
              {cast.character && (
                <p className="text-white/35 text-xs truncate">
                  {cast.character}
                </p>
              )}
            </div>
            <button
              onClick={() => removeCast(cast.id)}
              className="text-white/20 hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        ))}
      </div>

      {/* Add cast */}
      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="Actor name..."
          className="w-full bg-transparent border border-dashed border-white/20 rounded-xl px-3 py-2 text-white text-xs outline-none focus:border-primary/40 transition-colors placeholder:text-white/20"
        />
        <input
          type="text"
          value={charInput}
          onChange={(e) => setCharInput(e.target.value)}
          placeholder="Character name..."
          className="w-full bg-transparent border border-dashed border-white/20 rounded-xl px-3 py-2 text-white text-xs outline-none focus:border-primary/40 transition-colors placeholder:text-white/20"
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
