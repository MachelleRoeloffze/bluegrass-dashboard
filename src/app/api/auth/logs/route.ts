type LogEntry = {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  target: string;
  status: string;
};

import data from "@/data/db.json";
import { NextResponse } from "next/server";

export async function GET() {
  const logs: LogEntry[] = data.logs;
  return NextResponse.json(logs);
}
