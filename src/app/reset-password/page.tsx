"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";

export default function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            setError(error.message);
        } else {
            setConfirmed(true);
            setTimeout(() => router.push("/login"), 1500);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2 className="login-card__title">Set New Password</h2>
                <p className="login-card__subtitle">Choose a strong new password.</p>

                {confirmed ? (
                    <p className="login-card__success">Password updated. Redirecting...</p>
                ) : (
                    <form className="login-card__form" onSubmit={handleSubmit}>
                        <Input
                            type="password"
                            required
                            placeholder="New password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="btn btn--primary">
                            Update Password
                        </button>
                    </form>
                )}

                {error && <p className="login-card__error">{error}</p>}
            </div>
        </div>
    );
}
