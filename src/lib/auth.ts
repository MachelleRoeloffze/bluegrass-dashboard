import { cookies } from "next/headers";

export async function getUser() {
  const cookie = (await cookies()).get("user-session");
  if (!cookie) return null;
  try {
    return JSON.parse(cookie.value);
  } catch {
    return null;
  }
}
