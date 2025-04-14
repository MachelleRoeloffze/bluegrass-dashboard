interface TableSkeletonProps {
    columns: { label: string; key: string }[];
    rowCount?: number;
    showStatus?: boolean;
    showActions?: boolean;
  }
  
  export default function TableSkeleton({
    columns,
    rowCount = 5,
    showStatus = true,
    showActions = true,
  }: TableSkeletonProps) {
    return (
      <>
        {[...Array(rowCount)].map((_, i) => (
          <div className="table__row table__row--skeleton" key={`skeleton-${i}`}>
            {columns.map((col) => (
              <div key={col.key} className="table__cell">
                <div className="skeleton skeleton--text" />
              </div>
            ))}
            {showStatus && (
              <div className="table__cell">
                <div className="skeleton skeleton--badge" />
              </div>
            )}
            {showActions && (
              <div className="table__cell">
                <div className="skeleton skeleton--icon" />
              </div>
            )}
          </div>
        ))}
      </>
    );
  }
  