"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (error) {
      alert("Signup failed: " + error.message);
      setLoading(false);
      return;
    }

    const userId = data.user?.id;

    if (userId) {
      await supabase.from("users").insert({
        id: userId,
        email,
        full_name: fullName,
      });
    }

    alert("Please confirm your email to activate your account.");
    router.push("/login");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-card__title">Create Account</h2>
        <p className="login-card__subtitle">Sign up to get started.</p>

        <form className="login-card__form" onSubmit={handleSignup}>
          <Input
            type="text"
            placeholder="Full name*"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Email address*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password*"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Sign Up"}
          </Button>
        </form>

        <p className="login-card__signup">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
}
