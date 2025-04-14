import { render, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";


const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

vi.mock("@/utils/supabaseClient", () => ({
  supabase: {
    auth: {
      signOut: vi.fn().mockResolvedValue({}),
    },
  },
}));


vi.mock("@/components/ui/LogoLoader", () => ({
  default: () => <div data-testid="logo-loader" />,
}));

import LogoutPage from "@/app/logout/page";

describe("LogoutPage", () => {
  it("calls supabase signOut and navigates to /login", async () => {
    render(<LogoutPage />);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/login");
    });
  });
});
