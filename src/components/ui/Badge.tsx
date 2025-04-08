interface BadgeProps {
  status: "Active" | "Disabled";
}

export default function Badge({ status }: BadgeProps) {
  return <span className={`badge ${status.toLowerCase()}`}>{status}</span>;
}
