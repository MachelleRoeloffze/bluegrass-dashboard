"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import { useFormValidation } from "@/hooks/useFormValidation";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
  const { values, errors, handleChange, validateAll } = useFormValidation({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
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
          width={200}
          height={60}
          className="login-card__logo"
        />
        <h2 className="login-card__title">Welcome</h2>
        <p className="login-card__subtitle">
          Log in to continue to <strong>My Fertility Journey</strong>.
        </p>
        <form className="login-card__form" onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="Email address*"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={errors.email}
            required
          />
          <Input
            type="password"
            placeholder="Password*"
            value={values.password}
            onChange={(e) => handleChange("password", e.target.value)}
            error={errors.password}
            required
          />
          <a href="/forgot-password">Forgot your password?</a>
          <Button type="submit">Continue</Button>
        </form>

        <p className="login-card__signup">
          Don’t have an account? <Link href="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
