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
    <div className={`practice-row${isEditing ? " practice-row--editing" : ""}`}>
      {isEditing ? (
        <>
          <input
            className="input"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <input
            className="input"
            value={editPhone}
            onChange={(e) => setEditPhone(e.target.value)}
          />
          <input
            className="input"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
          />
          <span>{date}</span>
        </>
      ) : (
        <>
          <span>{name}</span>
          <span>{phone}</span>
          <span>{email}</span>
          <span>{date}</span>
        </>
      )}

      <div className="status-cell">
        <Toggle checked={status === "Active"} onChange={handleToggle} />
        <span className="status-text">{status}</span>
      </div>

      <div className="action-cell">
        {isEditing ? (
          <button className="icon-btn" onClick={handleSave}>
            <i className="icon icon-tick" />
          </button>
        ) : (
          <button className="icon-btn" onClick={() => setIsEditing(true)}>
            <i className="icon icon-edit" />
          </button>
        )}
        <button className="icon-btn" onClick={handleDelete}>
          <i className="icon icon-trash" />
        </button>
      </div>
    </div>
  );
}
