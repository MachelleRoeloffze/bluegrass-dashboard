"use client";

import { useEffect, useState } from "react";
import Card from "@/components/common/Card";
import Table from "@/components/dashboard/Table";
import Pagination from "@/components/ui/Pagination";
import { Practice } from "@/types/practice";
import { supabase } from "@/utils/supabaseClient";
import { usePagination } from "@/hooks/usePagination";
import { logActivity } from "@/lib/logActivity";
import { useUserInfo } from "@/hooks/useUserInfo";

export default function PracticeSection({ limit }: { limit?: number }) {
  const [practices, setPractices] = useState<Practice[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const userInfo = useUserInfo();
  const pageSize = 8;

  useEffect(() => {
    const loadPractices = async () => {
      const { data, error } = await supabase
        .from("practices")
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        console.error("Supabase error:", error.message);
        setLoading(false);
        return;
      }

      setPractices(data || []);
      setLoading(false);
    };

    loadPractices();
  }, []);

  const handleDelete = async (id: number) => {
    const practice = practices.find((p) => p.id === id);
    if (!practice || !userInfo) return;

    await logActivity({
      user: userInfo,
      action: "Deleted Practice",
      target: practice.name,
      status: "Warning",
    });

    const { error } = await supabase.from("practices").delete().eq("id", id);
    if (error) {
      console.error("Delete failed:", error.message);
      return;
    }

    setPractices((prev) => prev.filter((p) => p.id !== id));
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
    if (practice && userInfo) {
      await logActivity({
        user: userInfo,
        action: `${newStatus === "Active" ? "Enabled" : "Disabled"} Practice`,
        target: practice.name,
        status: "Success",
      });
    }
  };

  const handleEdit = async (id: number, updated: Partial<Practice>) => {
    const practice = practices.find((p) => p.id === id);
    if (!practice || !userInfo) return;

    const updatedFields: Partial<Practice> = {
      ...updated,
      actions: {
        ...(practice.actions || {}),
        lastEditedBy: userInfo.email,
        lastEditedAt: new Date().toISOString(),
      },
    };

    const { data, error } = await supabase
      .from("practices")
      .update(updatedFields)
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) {
      console.error("Failed to edit:", error.message);
      return;
    }

    if (!data) {
      console.warn("No row returned from edit.");
      return;
    }

    setPractices((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );

    await logActivity({
      user: userInfo,
      action: "Edited Practice",
      target: data.name || "Unknown",
      status: "Success",
    });
  };

  const { totalPages, getPage } = usePagination(practices, pageSize);
  const paginatedPractices = limit
    ? practices.slice(0, limit)
    : getPage(currentPage);

  const columns = [
    { label: "Practise Name", key: "name" as keyof Practice },
    { label: "Tel No", key: "phone" as keyof Practice },
    { label: "Email", key: "email" as keyof Practice },
    { label: "Date Created", key: "date" as keyof Practice },
  ];

  return (
    <Card>
      <div className="practice-section">
        {limit && <h3 className="practice-section__title">Newest Practices</h3>}

        <Table
          columns={columns}
          data={paginatedPractices}
          statusField="status"
          onDelete={handleDelete}
          onToggleStatus={handleStatusToggle}
          onSave={handleEdit}
          loading={loading}
        />

        {!limit && totalPages > 1 && (
          <div className="practice-section__pagination">
            <Pagination
              current={currentPage}
              total={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}

        {limit && (
          <div className="practice-section__footer">
            <a href="/practices" className="practice-section__link">
              See All
            </a>
            <i className="icon icon-right" />
          </div>
        )}
      </div>
    </Card>
  );
}
