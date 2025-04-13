"use client";
import { useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";
import LogoLoader from "@/components/ui/LogoLoader";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut();
      router.replace("/login");
    };

    logout();
  }, [router]);

  return <LogoLoader />;
}
