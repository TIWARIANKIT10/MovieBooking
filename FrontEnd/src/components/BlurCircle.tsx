
const BlurCircle = ({
  top = "auto",
  left = "auto",
  right = "auto",
  bottom = "auto",
  className = ""
}) => {
  return (
    <div
      className={`absolute z-50 h-[14.5rem] aspect-square rounded-full bg-primary/30 blur-3xl ${className}`}
      style={{ top, left, right, bottom }}
    />
  );
};

export default BlurCircle;
