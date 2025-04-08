import Toggle from "@/components/ui/Toggle";
import Badge from "@/components/ui/Badge";

interface Props {
  name: string;
  phone: string;
  email: string;
  date: string;
  status: "Active" | "Disabled";
}

export default function PracticeRow({
  name,
  phone,
  email,
  date,
  status,
}: Props) {
  return (
    <div className="practice-row">
      <span>{name}</span>
      <span>{phone}</span>
      <span>{email}</span>
      <span>{date}</span>
      <div className="status-cell">
        <Toggle checked={status === "Active"} />
        <Badge status={status} />
      </div>
      <div className="action-cell">
        <button className="icon-btn">✏️</button>
        <button className="icon-btn">🗑️</button>
      </div>
    </div>
  );
}
