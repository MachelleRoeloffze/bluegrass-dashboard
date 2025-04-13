"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { usePagination } from "@/hooks/usePagination";
import Pagination from "@/components/ui/Pagination";

type LogEntry = {
  id: number;
  timestamp: string;
  user: string;
  action: string;
  target: string;
  status: "Success" | "Warning" | "Error";
};

export default function LogPage() {
  const user = useUser();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/logs`)
      .then((res) => res.json())
      .then((data: LogEntry[]) => {
        const filtered = data.filter(
          (log) =>
            log.user?.toLowerCase() === user.email.toLowerCase() ||
            log.user?.toLowerCase() === user.name?.toLowerCase()
        );
        setLogs(filtered);
      })
      .catch(() => setLogs([]));
  }, [user]);
  console.log("API URL →", process.env.NEXT_PUBLIC_API_URL);

  const { totalPages, getPage } = usePagination(logs, 10);
  const paginatedLogs = getPage(currentPage);

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

      <Pagination
        current={currentPage}
        total={totalPages}
        onPageChange={(p) => setCurrentPage(p)}
      />
    </div>
  );
}
