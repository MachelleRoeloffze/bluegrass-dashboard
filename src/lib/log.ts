// src/lib/log.ts
export async function logActivity({
  user,
  action,
  target,
  status = "Success",
}: {
  user: { name: string; email: string };
  action: string;
  target: string;
  status?: "Success" | "Warning" | "Error";
}) {
  const payload = {
    timestamp: new Date().toISOString(),
    user: user.name,
    action,
    target,
    status,
  };

  await fetch("http://localhost:3001/logs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
