import data from "@/data/db.json";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const email = url.searchParams.get("email");

  const notifications = data.notifications.filter((n) => n.email === email);
  return NextResponse.json(notifications);
}
