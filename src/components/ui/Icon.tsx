interface IconProps {
  name: string;
  size?: "small" | "medium" | "large";
  color?: string;
  iconColor?: string;
  className?: string;
}

export default function Icon({
  name,
  size = "medium",
  color = "default",
  iconColor = "",
  className = "",
}: IconProps) {
  return (
    <div className={`ui-icon ui-icon--${size} ui-icon--${color} ${className}`}>
      <i className={`${name} ${iconColor}`}></i>
    </div>
  );
}
