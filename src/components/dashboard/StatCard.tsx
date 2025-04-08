import Card from "@/components/common/Card";
import Icon from "@/components/common/Icon";

interface StatCardProps {
  title: string;
  value: number | string;
  growth: string;
  icon: React.ReactNode;
}

export default function StatCard({
  title,
  value,
  growth,
  icon,
}: StatCardProps) {
  return (
    <Card>
      <div className="stat-card">
        <div className="stat-header">
          <Icon>{icon}</Icon>
        </div>
        <div className="stat-content">
          <p className="stat-title">{title}</p>
          <h3 className="stat-value">{value}</h3>
          <small className="stat-growth">+{growth}</small>
        </div>
      </div>
    </Card>
  );
}
