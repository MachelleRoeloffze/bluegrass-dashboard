"use client";
import { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => {
    window.location.href = "/api/auth/login"; 
  }, []);

  return (
    <p style={{ padding: "2rem", textAlign: "center" }}>
      Redirecting to login...
    </p>
  );
}
