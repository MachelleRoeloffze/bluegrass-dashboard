"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import Input from "@/components/ui/Input";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });

        if (error) {
            setError(error.message);
        } else {
            setSent(true);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2 className="login-card__title">Reset Password</h2>
                <p className="login-card__subtitle">
                    Enter your email and we’ll send you a reset link.
                </p>

                {sent ? (
                    <p className="login-card__success">Check your email for the reset link.</p>
                ) : (
                    <form className="login-card__form" onSubmit={handleSubmit}>
                        <Input
                            type="email"
                            required
                            value={email}
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button type="submit" className="btn btn--primary">
                            Send Reset Link
                        </button>
                    </form>
                )}

                {error && <p className="login-card__error">{error}</p>}
            </div>
        </div>
    );
}
