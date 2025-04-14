"use client";

import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  iconLeft?: string;
  iconRight?: string;
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
  href?: string;
}

export default function Button({
  children,
  iconLeft,
  iconRight,
  variant = "primary",
  loading = false,
  className = "",
  href,
  disabled,
  ...props
}: ButtonProps) {
  const base = "btn";
  const variantClass = `btn--${variant}`;
  const finalClass = `${base} ${variantClass} ${className}`.trim();

  const content = (
    <>
      {loading ? (
        <i className="icon icon-spinner btn__spinner spinning" />
      ) : (
        iconLeft && <i className={`icon ${iconLeft}`} />
      )}
      <span>{children}</span>
      {!loading && iconRight && <i className={`icon ${iconRight}`} />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={finalClass}>
        {content}
      </Link>
    );
  }

  return (
    <button className={finalClass} disabled={disabled || loading} {...props}>
      {content}
    </button>
  );
}
