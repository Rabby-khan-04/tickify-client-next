"use client";

import Spinner from "@/components/shared/loader/Spinner";
import SectionTitle from "@/components/shared/sectionTitle/SectionTitle";
import TheaterPill from "@/components/shared/theater/TheaterPill";
import useAddTheater from "@/hooks/useAddTheater";
import useTheaters from "@/hooks/useTheaters";
import { useForm } from "react-hook-form";

const TheatersPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { theaters = [], theatersLoading } = useTheaters();
  const { mutate: addTheater } = useAddTheater();

  const onSubmit = (data) => {
    addTheater({
      name: data.theater,
      location: data.location,
    });
  };

  if (theatersLoading) return <Spinner />;

  return (
    <section className="theme-text-primary">
      <SectionTitle title="Add Theaters" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-end gap-2 md:gap-5 flex-wrap"
      >
        <div className="flex flex-col gap-1 md:gap-2 grow">
          <label
            htmlFor="theater"
            className={`text-base block ${
              errors.theater ? "text-red-400" : "theme-text-secondary"
            }`}
          >
            Theater*
          </label>
          <input
            type="text"
            id="theater"
            className={`outline-0 focus:outline-0 border ${
              errors.theater ? "border-red-400" : "border-border-subtle"
            } rounded-md px-4 py-2 w-full block theme-input theme-text-primary placeholder:text-text-faint`}
            placeholder="Enter theater name"
            {...register("theater", { required: true })}
          />
        </div>

        <div className="flex flex-col gap-1 md:gap-2 grow">
          <label
            htmlFor="location"
            className={`text-base block ${
              errors.location ? "text-red-400" : "theme-text-secondary"
            }`}
          >
            Location*
          </label>
          <input
            type="text"
            id="location"
            className={`outline-0 focus:outline-0 border ${
              errors.location ? "border-red-400" : "border-border-subtle"
            } rounded-md px-4 py-2 w-full block theme-input theme-text-primary placeholder:text-text-faint`}
            placeholder="Enter theater location"
            {...register("location", { required: true })}
          />
        </div>

        <button type="submit" className="btn max-xl:w-full">
          Add Theater
        </button>
      </form>

      <div className="mt-6 md:mt-8 xl:mt-10">
        <SectionTitle title="Theaters" />
        <div className="space-y-4 space-x-4">
          {theaters?.map((theater) => (
            <TheaterPill theater={theater} key={theater._id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TheatersPage;
