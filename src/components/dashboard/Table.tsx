import TableRow from "@/components/dashboard/TableRow";

interface TableColumn {
  label: string;
  key: string;
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
  statusField: string;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number, currentStatus: "Active" | "Disabled") => void;
  onSave: (id: number, updated: any) => void;
}

const Table = ({
  columns,
  data,
  statusField,
  onDelete,
  onToggleStatus,
  onSave,
}: TableProps) => {
  return (
    <div className="table">
      <div className="table__header">
        {columns.map((col) => (
          <div key={col.key} className="table__header-cell">
            {col.label}
          </div>
        ))}
        <div className="table__header-cell">Status</div>
        <div className="table__header-cell">Actions</div>
      </div>

      <div className="table__body">
        {data.map((rowData) => (
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
          />
        ))}
      </div>
    </div>
  );
};

export default Table;
