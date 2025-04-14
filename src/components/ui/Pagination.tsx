interface PaginationProps {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  current,
  total,
  onPageChange,
}: PaginationProps) {
  if (total <= 1) return null;

  const range = () => {
    const delta = 1;
    const pages: (number | string)[] = [];

    const start = Math.max(2, current - delta);
    const end = Math.min(total - 1, current + delta);

    pages.push(1);

    if (start > 2) pages.push("...");

    for (let i = start; i <= end; i++) pages.push(i);

    if (end < total - 1) pages.push("...");

    if (total > 1) pages.push(total);

    return pages;
  };

  return (
    <div className="pagination">
      <button
        className="pagination__button"
        onClick={() => onPageChange(Math.max(1, current - 1))}
        disabled={current === 1}
      >
        <i className="icon icon-right" />
      </button>

      {range().map((item, index) => (
        <button
          key={index}
          className={`pagination__button ${item === current ? "active" : ""}`}
          disabled={item === "..."}
          onClick={() => typeof item === "number" && onPageChange(item)}
        >
          {item}
        </button>
      ))}

      <button
        className="pagination__button"
        onClick={() => onPageChange(Math.min(total, current + 1))}
        disabled={current === total}
      >
        <i className="icon icon-right" />
      </button>
    </div>
  );
}
