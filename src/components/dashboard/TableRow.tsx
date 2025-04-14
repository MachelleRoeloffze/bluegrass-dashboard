import { TableColumn } from "@/types/table";
import { useState } from "react";
import Toggle from "../ui/Toggle";
import Input from "../ui/Input";

interface TableRowProps<T extends { id: number }> {
  rowData: T;
  columns: TableColumn<T>[];
  statusField?: keyof T; // Optional for logs etc.
  onDelete?: (id: number) => void | Promise<void>;
  onToggleStatus?: (id: number, status: "Active" | "Disabled") => void | Promise<void>;
  onSave?: (id: number, updated: Partial<T>) => void | Promise<void>;
  editable?: boolean;
}

export default function TableRow<T extends { id: number }>({
  rowData,
  columns,
  statusField,
  onDelete,
  onToggleStatus,
  onSave,
  editable = true,
}: TableRowProps<T>) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<T>>(rowData);

  const handleChange = (key: keyof T, value: string) => {
    setEditData({ ...editData, [key]: value });
  };

  const handleSave = () => {
    if (onSave) onSave(rowData.id, editData);
    setIsEditing(false);
  };


  const handleToggle = () => {
    if (!statusField || !onToggleStatus) return;
    const currentStatus = rowData[statusField] as "Active" | "Disabled";
    onToggleStatus(rowData.id, currentStatus);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(rowData.id);
    }
  };

  return (
    <div className="table__row">
      {columns.map((col) => (
        <div key={String(col.key)} className="table__cell">
          {editable && isEditing && col.key !== "date" ? (
            <Input
              value={String(editData[col.key] ?? "")}
              onChange={(e) => handleChange(col.key, e.target.value)}
            />
          ) : (
            <span>
              {typeof rowData[col.key] === "string" || typeof rowData[col.key] === "number"
                ? (rowData[col.key] as string | number)
                : "—"}
            </span>
          )}
        </div>
      ))}

      {editable && statusField && (
        <div className="table__cell table__cell--status">
          <Toggle checked={rowData[statusField] === "Active"} onChange={handleToggle} />
          <span className={`table__status table__status--${String(rowData[statusField]).toLowerCase()}`}>
            {rowData[statusField] as string}
          </span>
        </div>
      )}

      {editable && (
        <div className="table__cell table__cell--actions">
          {isEditing ? (
            <button className="table__icon-btn" onClick={handleSave}>
              <i className="icon icon-checkmark" />
            </button>
          ) : (
            <button className="table__icon-btn" onClick={() => setIsEditing(true)}>
              <i className="icon icon-edit" />
            </button>
          )}
          {onDelete && (
            <button className="table__icon-btn" onClick={handleDelete}>
              <i className="icon icon-trash" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
