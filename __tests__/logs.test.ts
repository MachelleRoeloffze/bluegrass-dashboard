import { describe, it, expect, vi, beforeEach } from "vitest";
import * as LogsAPI from "@/app/api/logs/route";

vi.mock("@/utils/supabaseClient", () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockResolvedValueOnce({ data: [{ id: 1 }], error: null }),
    })),
  },
}));

import { supabase } from "@/utils/supabaseClient";

describe("GET /api/logs", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns logs data", async () => {
    const response = await LogsAPI.GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual([{ id: 1 }]);
  });

  it("returns 500 on error", async () => {
    (supabase.from as any).mockReturnValueOnce({
      select: vi
        .fn()
        .mockResolvedValueOnce({ data: null, error: { message: "DB error" } }),
    });

    const response = await LogsAPI.GET();
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toEqual({ error: "DB error" });
  });
});
