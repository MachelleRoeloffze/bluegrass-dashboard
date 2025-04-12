"use client";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { logActivity } from "@/lib/log";
import Toggle from "@/components/ui/Toggle";
import CheckIcon from "../../../public/images/checkIcon";

interface Props {
  name: string;
  phone: string;
  email: string;
  date: string; // non-editable
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

    await logActivity({
      user,
      action: "Edited Practice",
      target: name,
      status: "Success",
    });
  };

  const handleToggle = async () => {
    onToggleStatus();

    await logActivity({
      user,
      action: status === "Active" ? "Disabled Practice" : "Enabled Practice",
      target: name,
      status: "Success",
    });
  };

  const handleDelete = async () => {
    onDelete();

    await logActivity({
      user,
      action: "Deleted Practice",
      target: name,
      status: "Warning",
    });
  };

  return (
    <div className="practice-row">
      {isEditing ? (
        <>
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <input
            value={editPhone}
            onChange={(e) => setEditPhone(e.target.value)}
          />
          <input
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
            <CheckIcon />
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
