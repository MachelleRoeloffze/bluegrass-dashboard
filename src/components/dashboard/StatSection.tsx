import StatCard from "@/components/dashboard/StatCard";

const stats = [
  {
    title: "Total Practices",
    value: 11,
    growth: "15%",
    icon: "icon-stethoscope",
    growthIcon: "icon-up-arrow",
  },
  {
    title: "Total Subscribers",
    value: 261,
    growth: "15%",
    icon: "icon-pram",
    growthIcon: "icon-up-arrow",
  },
  {
    title: "Total Treatments",
    value: 135,
    growth: "15%",
    icon: "icon-plaster",
    growthIcon: "icon-up-arrow",
  },
  {
    title: "Total Consents",
    value: 135,
    growth: "15%",
    icon: "icon-note",
    growthIcon: "icon-up-arrow",
  },
  {
    title: "Total Consents signed",
    value: 2159,
    growth: "15%",
    icon: "icon-note",
    growthIcon: "icon-up-arrow",
  },
  {
    title: "Total Fact sheets read",
    value: 2159,
    growth: "15%",
    icon: "icon-idea",
    growthIcon: "icon-up-arrow",
  },
];

export default function StatSection() {
  return (
    <div className="stat-section">
      {stats.map((s, i) => (
        <StatCard
          key={i}
          title={s.title}
          value={s.value}
          growth={s.growth}
          icon={s.icon}
          growthIcon={s.growthIcon}
        />
      ))}
    </div>
  );
}
