import { useMemo } from "react";

export function usePagination<T>(items: T[], itemsPerPage = 15) {
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const getPage = (page: number) => {
    const start = (page - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  };

  return useMemo(() => ({ totalPages, getPage }), [items, itemsPerPage]);
}
