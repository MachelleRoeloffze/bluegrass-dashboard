"use client";

import { useEffect, useState } from "react";
import Card from "@/components/common/Card";
import PracticeRow from "@/components/dashboard/PracticeRow";

export type Practice = {
  id: number;
  name: string;
  phone: string;
  email: string;
  date: string;
  status: "Active" | "Disabled";
};

export default function PracticeSection() {
  const [practices, setPractices] = useState<Practice[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/practices")
      .then((res) => res.json())
      .then((data) => setPractices(data))
      .catch((err) => console.error("Failed to load practices", err));
  }, []);

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3001/practices/${id}`, {
      method: "DELETE",
    });

    setPractices((prev) => prev.filter((p) => p.id !== id));
  };

  const handleStatusToggle = async (
    id: number,
    currentStatus: "Active" | "Disabled"
  ) => {
    const newStatus = currentStatus === "Active" ? "Disabled" : "Active";

    await fetch(`http://localhost:3001/practices/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    setPractices((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
  };

  const handleEdit = async (id: number, updated: Partial<Practice>) => {
    const res = await fetch(`http://localhost:3001/practices/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updated),
    });

    if (!res.ok) {
      console.error("Failed to PATCH", res.statusText);
      return;
    }

    const updatedItem = await res.json();

    setPractices((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedItem } : p))
    );
  };

  return (
    <Card>
      <div className="practice-section">
        <h3>Newest Practices</h3>
        <div className="practice-header">
          <span>Practice Name</span>
          <span>Tel No</span>
          <span>Email</span>
          <span>Date Created</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {practices.map((p) => (
          <PracticeRow
            key={p.id}
            {...p}
            onDelete={() => handleDelete(p.id)}
            onToggleStatus={() => handleStatusToggle(p.id, p.status)}
            onSave={(updated) => handleEdit(p.id, updated)}
          />
        ))}
      </div>
    </Card>
  );
}
