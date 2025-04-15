import { describe, it, expect, vi, beforeEach } from "vitest";
import * as PracticesAPI from "@/app/api/practices/route";

vi.mock("@/utils/supabaseClient", () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockResolvedValueOnce({ data: [{ id: 1 }], error: null }),
    })),
  },
}));

import { supabase } from "@/utils/supabaseClient";

describe("GET /api/practices", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns practice data", async () => {
    const response = await PracticesAPI.GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual([{ id: 1 }]);
  });

  it("returns 500 on failure", async () => {
    (supabase.from as any).mockReturnValueOnce({
      select: vi.fn().mockResolvedValueOnce({ data: null, error: { message: "Failure" } }),
    });

    const response = await PracticesAPI.GET();
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toEqual({ error: "Failure" });
  });
});
