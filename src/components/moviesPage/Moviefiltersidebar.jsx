"use client";

import useMovieFilterOptions from "@/hooks/usemoviefilteroptions";

const LANGUAGE_LABELS = {
  en: "English",
  es: "Spanish",
  ja: "Japanese",
  ko: "Korean",
  fr: "French",
  hi: "Hindi",
  de: "German",
};

const MovieFilterSidebar = ({
  selectedGenres,
  setSelectedGenres,
  selectedLanguages,
  setSelectedLanguages,
  onReset,
}) => {
  const { genres, languages, isLoading } = useMovieFilterOptions();

  const toggleGenre = (name) => {
    setSelectedGenres((prev) =>
      prev.includes(name) ? prev.filter((g) => g !== name) : [...prev, name],
    );
  };

  const toggleLanguage = (lang) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang],
    );
  };

  return (
    <aside className="bg-bg-surface border border-primary/10 rounded-2xl p-5 min-w-50 w-full lg:w-52.5 shrink-0">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-primary text-xs font-semibold tracking-widest uppercase">
            Filters
          </p>
          <p className="text-text-faint text-[11px] mt-0.5">
            Refine your search results
          </p>
        </div>
        <button
          onClick={onReset}
          className="text-[11px] text-primary/60 text-right hover:text-primary transition-colors uppercase tracking-wider"
        >
          Reset All
        </button>
      </div>

      {/* Genres */}
      <div className="mb-6">
        <p className="text-text-muted text-[11px] uppercase tracking-widest mb-3 font-semibold">
          Genres
        </p>
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-4 w-24 bg-border-subtle rounded animate-pulse"
              />
            ))}
          </div>
        ) : (
          <ul className="space-y-2.5">
            {genres.map((genre) => {
              const checked = selectedGenres.includes(genre.name);
              return (
                <li key={genre.id}>
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <span
                      onClick={() => toggleGenre(genre.name)}
                      className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all duration-200 cursor-pointer ${
                        checked
                          ? "bg-primary border-primary"
                          : "border-border-subtle bg-transparent group-hover:border-primary/50"
                      }`}
                    >
                      {checked && (
                        <svg
                          className="w-2.5 h-2.5 text-black"
                          fill="currentColor"
                          viewBox="0 0 12 12"
                        >
                          <path
                            d="M10 3L5 8.5 2 5.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <span
                      onClick={() => toggleGenre(genre.name)}
                      className={`text-sm transition-colors ${checked ? "text-primary" : "text-text-secondary group-hover:text-text-primary"}`}
                    >
                      {genre.name}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Languages */}
      <div>
        <p className="text-text-muted text-[11px] uppercase tracking-widest mb-3 font-semibold">
          Languages
        </p>
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-4 w-20 bg-border-subtle rounded animate-pulse"
              />
            ))}
          </div>
        ) : (
          <ul className="space-y-2.5">
            {languages.map((lang) => {
              const checked = selectedLanguages.includes(lang);
              return (
                <li key={lang}>
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <span
                      onClick={() => toggleLanguage(lang)}
                      className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all duration-200 cursor-pointer ${
                        checked
                          ? "bg-primary border-primary"
                          : "border-border-subtle bg-transparent group-hover:border-primary/50"
                      }`}
                    >
                      {checked && (
                        <svg
                          className="w-2.5 h-2.5 text-black"
                          fill="currentColor"
                          viewBox="0 0 12 12"
                        >
                          <path
                            d="M10 3L5 8.5 2 5.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <span
                      onClick={() => toggleLanguage(lang)}
                      className={`text-sm transition-colors ${checked ? "text-primary" : "text-text-secondary group-hover:text-text-primary"}`}
                    >
                      {LANGUAGE_LABELS[lang] ?? lang.toUpperCase()}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
};

export default MovieFilterSidebar;
