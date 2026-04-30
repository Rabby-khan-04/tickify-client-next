const BlurCircle = ({
  top = "auto",
  left = "auto",
  bottom = "auto",
  right = "auto",
}) => {
  return (
    <div
      className="absolute -z-20 h-72 w-72 md:h-112.5 md:w-112.5 aspect-square rounded-full bg-primary/40 blur-[100px]"
      style={{ top, left, right, bottom }}
    ></div>
  );
};

export default BlurCircle;
