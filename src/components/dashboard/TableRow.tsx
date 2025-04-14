import { useState } from "react";
import Toggle from "@/components/ui/Toggle";

interface TableRowProps {
  rowData: any;
  columns: { label: string; key: string }[];
  statusField: string;
  onDelete: () => void;
  onToggleStatus: () => void;
  onSave: (updated: any) => void;
  editable?: boolean;
}

export default function TableRow({
  rowData,
  columns,
  statusField,
  onDelete,
  onToggleStatus,
  onSave,
  editable = true,
}: TableRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(rowData);

  const handleChange = (key: string, value: string) => {
    setEditData({ ...editData, [key]: value });
  };

  const handleSave = () => {
    onSave(editData);
    setIsEditing(false);
  };

  return (
    <div className="table__row">
      {columns.map((col) => (
        <div key={col.key} className="table__cell">
          {editable && isEditing ? (
            <input
              className="table__input"
              value={editData[col.key] ?? ""}
              onChange={(e) => handleChange(col.key, e.target.value)}
            />
          ) : (
            <span>
              {rowData[col.key] !== undefined && rowData[col.key] !== null
                ? rowData[col.key]
                : "—"}
            </span>
          )}
        </div>
      ))}

      {editable && (
        <div className="table__cell table__cell--status">
          <Toggle
            checked={rowData[statusField] === "Active"}
            onChange={onToggleStatus}
          />
          <span
            className={`table__status table__status--${String(
              rowData[statusField]
            ).toLowerCase()}`}
          >
            {rowData[statusField]}
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
            <button
              className="table__icon-btn"
              onClick={() => setIsEditing(true)}
            >
              <i className="icon icon-edit" />
            </button>
          )}
          <button className="table__icon-btn" onClick={onDelete}>
            <i className="icon icon-trash" />
          </button>
        </div>
      )}
    </div>
  );
}
