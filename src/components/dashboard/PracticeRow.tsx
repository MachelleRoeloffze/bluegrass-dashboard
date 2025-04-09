"use client";
import { useState } from "react";
import Toggle from "@/components/ui/Toggle";

interface Props {
  name: string;
  phone: string;
  email: string;
  date: string;
  status: "Active" | "Disabled";
}

export default function PracticeRow({
  name,
  phone,
  email,
  date,
  status,
}: Props) {
  const [isActive, setIsActive] = useState(status === "Active");

  return (
    <div className="practice-row">
      <span>{name}</span>
      <span>{phone}</span>
      <span>{email}</span>
      <span>{date}</span>

      <div className="status-cell">
        <Toggle
          checked={isActive}
          onChange={() => setIsActive((prev) => !prev)}
        />
        <span className="status-text">{isActive ? "Active" : "Disabled"}</span>
      </div>

      <div className="action-cell">
        <button type="button" className="icon-btn" aria-label="Edit practice">
          <i className="icon icon-edit" />
        </button>
        <button type="button" className="icon-btn" aria-label="Delete practice">
          <i className="icon icon-trash" />
        </button>
      </div>
    </div>
  );
}
