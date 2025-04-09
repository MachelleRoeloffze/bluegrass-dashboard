import Icon from "@/components/ui/Icon";
import Card from "../common/Card";

interface StatCardProps {
  title: string;
  value: number | string;
  growth: string;
  icon: string;
  growthIcon?: string;
}

export default function StatCard({
  title,
  value,
  growth,
  growthIcon,
  icon,
}: StatCardProps) {
  return (
    <Card>
      <div className="stat-card">
        <div className="stat-card__content">
          <p className="stat-card__title">{title}</p>
          <div className="stat-card__growth">
            {growthIcon && (
              <span className="stat-card__growth-icon">
                <Icon
                  name={growthIcon}
                  size="small"
                  color="tertiary"
                  iconColor="icon-color--green"
                />
              </span>
            )}
            <span className="stat-card__growth-text">+{growth}</span>
          </div>
          <h3 className="stat-card__value">{value}</h3>
        </div>
        <div>
          <Icon
            name={icon}
            size="large"
            color="primary"
            iconColor="icon-color--primary"
          />
        </div>
      </div>
    </Card>
  );
}
