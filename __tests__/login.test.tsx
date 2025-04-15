import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "@/app/login/page";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { supabase } from "@/utils/supabaseClient";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("@/utils/supabaseClient", () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
    },
  },
}));

describe("LoginPage", () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the login form", () => {
    render(<LoginPage />);
    expect(screen.getByPlaceholderText("Email address*")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password*")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /continue/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors if inputs are empty", async () => {
    render(<LoginPage />);
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    await waitFor(() => {
      expect(
        screen.getAllByText("This field is required.").length
      ).toBeGreaterThanOrEqual(2);
    });
  });

  it("logs in and redirects on success", async () => {
    (supabase.auth.signInWithPassword as any).mockResolvedValue({
      error: null,
    });

    render(<LoginPage />);
    fireEvent.change(screen.getByPlaceholderText("Email address*"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password*"), {
      target: { value: "securePass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    await waitFor(() => {
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: "user@example.com",
        password: "securePass",
      });
    });
  });

  it("shows an error message on login failure", async () => {
    (supabase.auth.signInWithPassword as any).mockResolvedValue({
      error: { message: "Invalid login credentials" },
    });

    render(<LoginPage />);
    fireEvent.change(screen.getByPlaceholderText("Email address*"), {
      target: { value: "fail@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password*"), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    await waitFor(() => {
      expect(screen.getByText("Invalid login credentials")).toBeInTheDocument();
    });
  });
});
