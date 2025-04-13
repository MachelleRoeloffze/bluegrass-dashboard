"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { logActivity } from "@/lib/log";
import Toggle from "@/components/ui/Toggle";

interface Props {
  name: string;
  phone: string;
  email: string;
  date: string;
  actions: {
    lastEditedBy?: string;
    lastEditedAt?: string;
    [key: string]: any;
  };
  status: "Active" | "Disabled";
  onDelete: () => void;
  onToggleStatus: () => void;
  onSave: (updated: { name: string; phone: string; email: string }) => void;
}

export default function PracticeRow({
  name,
  phone,
  email,
  date,
  actions,
  status,
  onDelete,
  onToggleStatus,
  onSave,
}: Props) {
  const user = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editPhone, setEditPhone] = useState(phone);
  const [editEmail, setEditEmail] = useState(email);

  const handleSave = async () => {
    onSave({ name: editName, phone: editPhone, email: editEmail });
    setIsEditing(false);

    if (!user) return;
    await logActivity({
      user,
      action: "Edited Practice",
      target: name,
      status: "Success",
    });
  };

  const handleToggle = async () => {
    onToggleStatus();

    if (!user) return;
    await logActivity({
      user,
      action: status === "Active" ? "Disabled Practice" : "Enabled Practice",
      target: name,
      status: "Success",
    });
  };

  const handleDelete = async () => {
    onDelete();

    if (!user) return;
    await logActivity({
      user,
      action: "Deleted Practice",
      target: name,
      status: "Warning",
    });
  };

  return (
    <div className={`table__row${isEditing ? " table__row--editing" : ""}`}>
      <div className="table__cell">
        {isEditing ? (
          <input
            className="table__input"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
        ) : (
          <span>{name}</span>
        )}
      </div>

      <div className="table__cell">
        {isEditing ? (
          <input
            className="table__input"
            value={editPhone}
            onChange={(e) => setEditPhone(e.target.value)}
          />
        ) : (
          <span>{phone}</span>
        )}
      </div>

      <div className="table__cell">
        {isEditing ? (
          <input
            className="table__input"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
          />
        ) : (
          <span>{email}</span>
        )}
      </div>

      <div className="table__cell">
        <span>{date}</span>
      </div>

      <div className="table__cell">
        {isEditing ? (
          <em className="table__muted">Editing...</em>
        ) : actions?.lastEditedBy ? (
          <span>
            <strong>{actions.lastEditedBy}</strong>
            {actions.lastEditedAt && (
              <span className="table__muted">
                {" "}
                • {new Date(actions.lastEditedAt).toLocaleDateString()}
              </span>
            )}
          </span>
        ) : (
          <em className="table__muted">–</em>
        )}
      </div>

      <div className="table__cell table__cell--status">
        <Toggle checked={status === "Active"} onChange={handleToggle} />
        <span
          className={`table__status table__status--${status.toLowerCase()}`}
        >
          {status}
        </span>
      </div>

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
        <button className="table__icon-btn" onClick={handleDelete}>
          <i className="icon icon-trash" />
        </button>
      </div>
    </div>
  );
}
