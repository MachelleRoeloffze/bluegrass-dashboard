import { useEffect, useState } from "react";
import TableRow from "@/components/dashboard/TableRow";
import TableSkeleton from "@/components/dashboard/skeletonLoaders/TableSkeleton";
import { usePagination } from "@/hooks/usePagination";

interface TableColumn {
  label: string;
  key: string;
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
  statusField: string;
  onDelete: (id: number) => void;
  onToggleStatus: (
    id: number,
    currentStatus: "Active" | "Disabled"
  ) => void | Promise<void>;
  onSave: (id: number, updated: any) => void | Promise<void>;
  editable?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  paginate?: boolean;
  pageSize?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

export default function Table({
  columns,
  data,
  statusField,
  onDelete,
  onToggleStatus,
  onSave,
  editable = true,
  loading = false,
  emptyMessage = "No results found.",
  paginate = false,
  pageSize = 10,
  currentPage = 1,
  onPageChange,
}: TableProps) {
  const { getPage } = usePagination(data, pageSize);
  const pagedData = paginate ? getPage(currentPage) : data;

  const showSkeleton = loading;
  const showEmpty = !loading && pagedData.length === 0;

  useEffect(() => {
    if (paginate && onPageChange && currentPage > 1 && pagedData.length === 0) {
      onPageChange(1); // reset page if data shrinks
    }
  }, [pagedData, paginate, onPageChange, currentPage]);

  return (
    <div className="table-wrapper">
      <div className="table">
        <div className="table__header">
          {columns.map((col) => (
            <div key={col.key} className="table__header-cell">
              {col.label}
            </div>
          ))}
          {editable && <div className="table__header-cell">Status</div>}
          {editable && <div className="table__header-cell">Actions</div>}
        </div>

        <div className="table__body">
          {showSkeleton ? (
            <TableSkeleton
              columns={columns}
              rowCount={data?.length > 0 ? data.length : 5}
              showStatus={editable}
              showActions={editable}
            />
          ) : showEmpty ? (
            <div className="table__empty">{emptyMessage}</div>
          ) : (
            pagedData.map((rowData) => (
              <TableRow
                key={rowData.id}
                rowData={rowData}
                columns={columns}
                statusField={statusField}
                onDelete={() => onDelete(rowData.id)}
                onToggleStatus={() =>
                  onToggleStatus(rowData.id, rowData[statusField])
                }
                onSave={(updated) => onSave(rowData.id, updated)}
                editable={editable}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
