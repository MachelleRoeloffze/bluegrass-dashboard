"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Login failed: " + error.message);
      return;
    }

    router.push("/");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <Image
          src="/images/fertility-journey-logo.svg"
          alt="MyFertilityJourney"
          width={180}
          height={60}
          className="login-card__logo"
        />
        <h2 className="login-card__title">Welcome</h2>
        <p className="login-card__subtitle">
          Log in to continue to <strong>My Fertility Journey</strong>.
        </p>
        <form className="login-card__form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password*"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <a href="#" className="login-card__forgot">
            Forgot password?
          </a>
          <button type="submit">Continue</button>
        </form>

        <p className="login-card__signup">
          Don’t have an account? <Link href="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
