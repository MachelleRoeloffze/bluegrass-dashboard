export default function DashboardSkeleton() {
  return (
    <div className="dashboard-skeleton">
      <div className="dashboard-skeleton__header" />

      <div className="dashboard-skeleton__cards">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="dashboard-skeleton__card" />
        ))}
      </div>

      <div className="dashboard-skeleton__progress">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="dashboard-skeleton__circle" />
        ))}
      </div>

      <div className="dashboard-skeleton__table">
        <div className="dashboard-skeleton__table-header" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="dashboard-skeleton__table-row" />
        ))}
      </div>
    </div>
  );
}
