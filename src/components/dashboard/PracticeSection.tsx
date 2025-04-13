"use client";

import { useEffect, useState } from "react";
import Card from "@/components/common/Card";
import PracticeRow from "@/components/dashboard/PracticeRow";
import { Practice } from "@/types/practice";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/context/UserContext";
import { logActivity } from "@/lib/logActivity";

export default function PracticeSection({ limit }: { limit?: number }) {
  const [practices, setPractices] = useState<Practice[]>([]);
  const user = useUser();

  useEffect(() => {
    const loadPractices = async () => {
      const { data, error } = await supabase
        .from("practices")
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        console.error("Supabase error:", error.message);
        return;
      }

      setPractices(data);
    };

    loadPractices();
  }, []);

  const handleDelete = async (id: number) => {
    const practice = practices.find((p) => p.id === id);
    await supabase.from("practices").delete().eq("id", id);
    setPractices((prev) => prev.filter((p) => p.id !== id));

    if (user && practice) {
      await logActivity({
        user: { name: user.name, email: user.email },
        action: "Deleted Practice",
        target: practice.name,
        status: "Warning",
      });
    }
  };

  const handleStatusToggle = async (
    id: number,
    currentStatus: "Active" | "Disabled"
  ) => {
    const newStatus = currentStatus === "Active" ? "Disabled" : "Active";
    const { error } = await supabase
      .from("practices")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      console.error("Failed to update status:", error.message);
      return;
    }

    setPractices((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );

    const practice = practices.find((p) => p.id === id);
    if (user && practice) {
      await logActivity({
        user: { name: user.name, email: user.email },
        action: `${newStatus === "Active" ? "Enabled" : "Disabled"} Practice`,
        target: practice.name,
        status: "Success",
      });
    }
  };

  const handleEdit = async (id: number, updated: Partial<Practice>) => {
    const { data, error } = await supabase
      .from("practices")
      .update(updated)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Failed to edit:", error.message);
      return;
    }

    setPractices((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );

    if (user && data) {
      await logActivity({
        user: { name: user.name, email: user.email },
        action: "Edited Practice",
        target: data.name,
        status: "Success",
      });
    }
  };

  const visiblePractices = limit ? practices.slice(0, limit) : practices;

  return (
    <Card>
      <div className="practice-section">
        <h3 className="practice-section__title">Newest Practices</h3>
        <div className="practice-section__header">
          <span>Practice Name</span>
          <span>Tel No</span>
          <span>Email</span>
          <span>Date Created</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {visiblePractices.map((p) => (
          <PracticeRow
            key={p.id}
            {...p}
            onDelete={() => handleDelete(p.id)}
            onToggleStatus={() => handleStatusToggle(p.id, p.status)}
            onSave={(updated) => handleEdit(p.id, updated)}
          />
        ))}

        {limit && (
          <div className="practice-section__footer">
            <a href="/practices" className="practice-section__link">
              See All
            </a>
            <i className="icon icon-right"></i>
          </div>
        )}
      </div>
    </Card>
  );
}
