import Card from "@/components/common/Card";

interface PieCardProps {
  label: string;
  percent: number;
  color: string;
}

export default function PieCard({ label, percent, color }: PieCardProps) {
  return (
    <Card>
      <div className="pie-card">
        <div className="circle" style={{ borderColor: color }}>
          <span>{percent}%</span>
        </div>
        <p className="label">{label}</p>
      </div>
    </Card>
  );
}
