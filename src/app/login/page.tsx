"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useFormValidation } from "@/hooks/useFormValidation";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { values, errors, handleChange, validateAll, setErrors } =
    useFormValidation({
      email: "",
      password: "",
    });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateAll();
    if (!isValid) return;

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    setLoading(false);

    if (error) {
      setErrors((prev) => ({
        ...prev,
        password: error.message || "Login failed",
      }));
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

        <form className="login-card__form" onSubmit={handleLogin} noValidate>
          <Input
            name="email"
            type="email"
            placeholder="Email address*"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={errors.email}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password*"
            value={values.password}
            onChange={(e) => handleChange("password", e.target.value)}
            error={errors.password}
          />

          <a className="login-card__password" href="/forgot-password">
            Forgot your password?
          </a>

          <Button type="submit" loading={loading}>
            Continue
          </Button>
        </form>

        <p className="login-card__signup">
          Don’t have an account? <Link href="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
