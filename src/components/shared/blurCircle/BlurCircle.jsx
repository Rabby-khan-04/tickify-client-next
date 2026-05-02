const BlurCircle = ({
  top = "auto",
  left = "auto",
  bottom = "auto",
  right = "auto",
}) => {
  return (
    <div
      className="absolute -z-20 h-72 w-72 md:h-112.5 md:w-112.5 aspect-square rounded-full blur-[100px] bg-primary/40 [data-theme='light']_&:bg-primary/15"
      style={{ top, left, right, bottom }}
    />
  );
};

export default BlurCircle;
