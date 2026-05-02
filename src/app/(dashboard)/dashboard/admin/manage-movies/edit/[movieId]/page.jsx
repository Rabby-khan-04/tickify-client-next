"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import useMovieDetails from "@/hooks/useMovieDetails";
import axiosPublic from "@/lib/axios/axiosPublic";
import GeneralInfoSection from "@/components/editMoviePage/GeneralInfoSection";
import MetaStatsSection from "@/components/editMoviePage/Metastatssection";
import GenresSection from "@/components/editMoviePage/Genressection";
import CastSection from "@/components/editMoviePage/Castsection";
import MediaAssetsSection from "@/components/editMoviePage/Mediaassetssection";
import SaveBar from "@/components/editMoviePage/Savebar";

const EditMoviePage = () => {
  const { movieId } = useParams();
  const router = useRouter();
  const { movieDetails, movieDetailsLoading } = useMovieDetails(movieId);

  const initialForm = useMemo(() => {
    if (!movieDetails) return null;
    return {
      title: movieDetails.title ?? "",
      tagline: movieDetails.tagline ?? "",
      overview: movieDetails.overview ?? "",
      release_date: movieDetails.release_date ?? "",
      runtime: movieDetails.runtime ?? "",
      original_language: movieDetails.original_language ?? "",
      vote_average: movieDetails.vote_average ?? "",
      genres: movieDetails.genres ?? [],
      casts: movieDetails.casts ?? [],
    };
  }, [movieDetails]);

  const [overrides, setOverrides] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [syncStatus, setSyncStatus] = useState("ready");

  const form = useMemo(
    () => (initialForm ? { ...initialForm, ...overrides } : null),
    [initialForm, overrides],
  );

  const handleFieldChange = (field, value) => {
    setOverrides((prev) => ({ ...prev, [field]: value }));
    setSyncStatus("ready");
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await axiosPublic.patch(`/movies/movie/${movieDetails._id}`, form);
      setSyncStatus("saved");
    } catch (err) {
      console.error("Save failed:", err);
      setSyncStatus("error");
    } finally {
      setIsSaving(false);
    }
  };

  if (movieDetailsLoading || !form) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="pb-32">
      {/* Breadcrumb */}
      <div className="container-fluid pt-8 pb-6">
        <div className="flex items-center gap-2 text-xs text-text-faint font-medium tracking-widest uppercase mb-4">
          <Link
            href="/dashboard/admin/manage-movies"
            className="hover:text-primary transition-colors"
          >
            Library
          </Link>
          <span>›</span>
          <span className="text-primary">Edit Entry</span>
        </div>
        <h1 className="theme-text-primary text-3xl font-bold">
          Edit Movie: <span className="text-primary">{movieDetails.title}</span>
        </h1>
      </div>

      <div className="container-fluid">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5">
          <div className="flex flex-col gap-5">
            <GeneralInfoSection form={form} onChange={handleFieldChange} />
            <MetaStatsSection form={form} onChange={handleFieldChange} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <GenresSection
                genres={form.genres}
                onChange={(genres) => handleFieldChange("genres", genres)}
              />
              <CastSection
                casts={form.casts}
                onChange={(casts) => handleFieldChange("casts", casts)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <MediaAssetsSection movieDetails={movieDetails} />
            <SaveBar
              onSave={handleSave}
              onCancel={() => router.push("/dashboard/admin/manage-movies")}
              isSaving={isSaving}
              syncStatus={syncStatus}
              lastSynced={movieDetails.updatedAt}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMoviePage;
