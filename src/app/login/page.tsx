"use client";

import { useEffect } from "react";
import LogoLoader from "@/components/ui/LogoLoader";

export default function LoginPage() {
  useEffect(() => {
    window.location.href = "/api/auth/login";
  }, []);

  return (
    <div className="login-page">
      <LogoLoader />
    </div>
  );
}
