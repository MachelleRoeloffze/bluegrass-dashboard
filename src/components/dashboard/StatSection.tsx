import StatCard from "@/components/dashboard/StatCard";

const stats = [
  { title: "Total Practices", value: 11, growth: "15%", icon: "🏢" },
  { title: "Total Subscribers", value: 261, growth: "15%", icon: "👥" },
  { title: "Total Treatments", value: 135, growth: "15%", icon: "💉" },
  { title: "Total Consents", value: 135, growth: "15%", icon: "📄" },
  { title: "Total Consents signed", value: 2159, growth: "15%", icon: "✍️" },
  { title: "Total Fact sheets read", value: 2159, growth: "15%", icon: "📚" },
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
          icon={<span style={{ fontSize: 18 }}>{s.icon}</span>}
        />
      ))}
    </div>
  );
}
