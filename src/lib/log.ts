import { supabase } from "@/lib/supabaseClient";

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

  const { error } = await supabase.from("logs").insert(payload);

  if (error) {
    console.error("Failed to log activity:", error.message);
  }
}
