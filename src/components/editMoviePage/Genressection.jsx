"use client";

import { useState } from "react";
import { Clapperboard, X, Plus } from "lucide-react";

const GenresSection = ({ genres, onChange }) => {
  const [input, setInput] = useState("");

  const removeGenre = (id) => {
    onChange(genres.filter((g) => g.id !== id));
  };

  const addGenre = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const newGenre = { id: Date.now(), name: trimmed };
    onChange([...genres, newGenre]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addGenre();
    }
  };

  return (
    <div className="bg-[#0d120e] border border-white/[0.07] rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <Clapperboard className="w-4 h-4 text-primary" strokeWidth={1.8} />
        <h2 className="text-white font-semibold text-base">Genres</h2>
      </div>

      {/* Genre tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {genres.map((genre) => (
          <span
            key={genre.id}
            className="flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-3 py-1.5 rounded-full"
          >
            {genre.name}
            <button
              onClick={() => removeGenre(genre.id)}
              className="hover:text-white transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>

      {/* Add input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add genre..."
          className="flex-1 bg-transparent border border-dashed border-white/20 rounded-xl px-3 py-2 text-white text-xs outline-none focus:border-primary/40 transition-colors placeholder:text-white/20"
        />
        <button
          onClick={addGenre}
          className="flex items-center gap-1 text-primary border border-dashed border-primary/30 rounded-xl px-3 py-2 text-xs font-semibold hover:bg-primary/5 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add
        </button>
      </div>
    </div>
  );
};

export default GenresSection;
