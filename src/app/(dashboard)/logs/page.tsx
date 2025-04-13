"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { useUser } from "@/context/UserContext";
import { usePagination } from "@/hooks/usePagination";
import Pagination from "@/components/ui/Pagination";

type LogEntry = {
  id: string;
  timestamp: string;
  user_email: string;
  action: string;
  target: string;
  status: "Success" | "Warning" | "Error";
};

export default function LogPage() {
  const user = useUser();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      if (!user || !user.email) {
        console.warn("⛔ No user or user.email found:", user);
        return;
      }

      console.log("✅ User email:", user.email);

      const { data, error } = await supabase
        .from("logs")
        .select("*")
        .order("timestamp", { ascending: false });

      if (error) {
        console.error("❌ Supabase logs error:", error.message);
        return;
      }

      console.log("✅ All logs:", data);

      const filtered = data.filter(
        (log) => log.user_email?.toLowerCase() === user.email!.toLowerCase()
      );

      console.log("✅ Filtered logs:", filtered);
      setLogs(filtered);
      setLoading(false);
    };

    fetchLogs();
  }, [user]);

  const { totalPages, getPage } = usePagination(logs, 10);
  const paginatedLogs = getPage(currentPage);

  if (!user) return <p className="logs__loading">Loading user...</p>;
  if (loading) return <p className="logs__loading">Loading logs...</p>;

  return (
    <div className="logs">
      <h1 className="logs__heading">My Activity Logs</h1>

      <div className="logs__table">
        <div className="logs__table-header">
          <div>Timestamp</div>
          <div>Action</div>
          <div>Target</div>
          <div>Status</div>
        </div>

        {paginatedLogs.map((log) => (
          <div key={log.id} className="logs__table-row">
            <div>{new Date(log.timestamp).toLocaleString()}</div>
            <div>{log.action}</div>
            <div>{log.target}</div>
            <div
              className={`logs__status logs__status--${log.status.toLowerCase()}`}
            >
              {log.status}
            </div>
          </div>
        ))}
      </div>

      {logs.length > 0 && (
        <Pagination
          current={currentPage}
          total={totalPages}
          onPageChange={(p) => setCurrentPage(p)}
        />
      )}
    </div>
  );
}
