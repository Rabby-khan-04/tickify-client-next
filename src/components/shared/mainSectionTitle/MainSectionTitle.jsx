const MainSectionTitle = ({ subtitle = "", title = "", description = "" }) => {
  return (
    <div className="max-w-2xl mx-auto flex flex-col justify-center items-center mb-20">
      <span className="inline-block border border-primary/20 text-primary text-sm px-5 py-2 rounded-full mb-6">
        {subtitle}
      </span>

      <h2 className="font-bold text-[clamp(1.6rem,3vw,2rem)] tracking-wider text-white text-center mb-2">
        {title}
      </h2>

      <div className="w-16 h-0.5 bg-primary mx-auto mt-4 mb-14 rounded" />
      <p className="text-white/50 text-sm leading-relaxed  text-center">
        {description}
      </p>
    </div>
  );
};

export default MainSectionTitle;
