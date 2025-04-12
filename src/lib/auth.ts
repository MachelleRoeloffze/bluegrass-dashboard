import { cookies } from "next/headers";

export async function getUser() {
  const cookie = (await cookies()).get("user-session");
  if (!cookie) return null;

  try {
    const parsed = JSON.parse(cookie.value);
    console.log("👤 Parsed user-session cookie:", parsed);
    return parsed;
  } catch {
    return null;
  }
}
