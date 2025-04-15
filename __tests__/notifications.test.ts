import { describe, it, expect, vi, beforeEach } from "vitest";
import * as NotificationsAPI from "@/app/api/notifications/route";

vi.mock("@/utils/supabaseClient", () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValueOnce({ data: [{ id: 1 }], error: null }),
    })),
  },
}));

import { supabase } from "@/utils/supabaseClient";

describe("GET /api/notifications", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const makeRequest = (url: string): Request => new Request(url);

  it("returns notifications for a valid email", async () => {
    const req = makeRequest("http://localhost/api/notifications?email=test@example.com");
    const response = await NotificationsAPI.GET(req);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual([{ id: 1 }]);
  });

  it("returns 400 if email is missing", async () => {
    const req = makeRequest("http://localhost/api/notifications");
    const response = await NotificationsAPI.GET(req);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({ error: "Email is required" });
  });

  it("returns 500 on query error", async () => {
    (supabase.from as any).mockReturnValueOnce({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValueOnce({ data: null, error: { message: "Query failed" } }),
    });

    const req = makeRequest("http://localhost/api/notifications?email=test@example.com");
    const response = await NotificationsAPI.GET(req);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toEqual({ error: "Query failed" });
  });
});
