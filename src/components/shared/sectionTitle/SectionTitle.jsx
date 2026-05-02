const SectionTitle = ({ title, className = "" }) => {
  return (
    <h2
      className={`text-[clamp(1.6rem,3vw,2rem)] font-medium mb-5 text-text-primary ${className}`}
    >
      {title}
    </h2>
  );
};

export default SectionTitle;
