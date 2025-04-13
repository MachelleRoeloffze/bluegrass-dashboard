import { supabase } from "./supabaseClient";

type StatusType = "Success" | "Warning" | "Error";

export async function logActivity({
  user,
  action,
  target,
  status = "Success",
}: {
  user: { name: string; email: string };
  action: string;
  target: string;
  status?: StatusType;
}) {
  const payload = {
    timestamp: new Date().toISOString(),
    user_email: user.email,
    action,
    target,
    status,
  };

  const { error } = await supabase.from("logs").insert(payload);
  if (error) console.error("Failed to log activity:", error.message);
}
