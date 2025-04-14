"use client";

import { useEffect, useState } from "react";
import Card from "@/components/common/Card";
import Table from "@/components/dashboard/Table";
import { supabase } from "@/utils/supabaseClient";
import { useUser } from "@/context/UserContext";
import { usePagination } from "@/hooks/usePagination";
import Pagination from "@/components/ui/Pagination";
import SectionHeading from "@/components/common/SectionHeading";

type LogEntry = {
  id: number;
  timestamp: string;
  user_email: string;
  action: string;
  target: string;
  status: "Success" | "Warning" | "Error";
};

export default function LogPage() {
  const user = useUser();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    const fetchLogs = async () => {
      if (!user?.email) return;

      const { data, error } = await supabase
        .from("logs")
        .select("*")
        .order("timestamp", { ascending: false });

      if (error) {
        console.error("Failed to fetch logs:", error.message);
        return;
      }

      const filtered = data.filter(
        (log) =>
          log.user_email?.toLowerCase() === (user.email ?? "").toLowerCase()
      );

      setLogs(filtered);
      setLoading(false);
    };

    fetchLogs();
  }, [user]);

  const { totalPages } = usePagination(logs, pageSize);

  const columns = [
    { label: "Timestamp", key: "timestamp" },
    { label: "Action", key: "action" },
    { label: "Target", key: "target" },
    { label: "Status", key: "status" },
  ];

  const formattedLogs = logs.map((log) => ({
    ...log,
    timestamp: log.timestamp ? new Date(log.timestamp).toLocaleString() : "—",
  }));

  return (
    <>
      {" "}
      <SectionHeading title="Logs" />
      <Card>
        <div className="logs">
          <Table
            columns={columns}
            data={formattedLogs}
            statusField="status"
            onDelete={() => {}}
            onToggleStatus={() => {}}
            onSave={() => {}}
            editable={false}
            loading={loading}
            paginate={true}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />

          {totalPages > 1 && (
            <div className="logs__pagination">
              <Pagination
                current={currentPage}
                total={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
