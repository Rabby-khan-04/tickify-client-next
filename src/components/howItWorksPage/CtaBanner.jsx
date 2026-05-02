import Link from "next/link";

const CtaBanner = () => {
  return (
    <div className="relative bg-bg-card border border-border-subtle rounded-2xl px-10 py-14 flex flex-col items-center text-center gap-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(29,231,130,0.06)_0%,transparent_65%)] pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center gap-2">
        <p className="text-primary text-sm font-medium tracking-wide">
          Ready for the Show?
        </p>
        <p className="text-text-secondary text-base max-w-md leading-relaxed">
          Join thousands of movie enthusiasts and start booking your cinematic
          journey today.
        </p>
      </div>
      <Link
        href="/movies"
        className="relative z-10 bg-primary text-[#061008] text-sm font-bold tracking-widest uppercase px-8 py-3.5 rounded-xl hover:opacity-85 active:scale-95 [transition:opacity_200ms_ease,transform_200ms_ease]"
      >
        Explore Movies
      </Link>
    </div>
  );
};

export default CtaBanner;
