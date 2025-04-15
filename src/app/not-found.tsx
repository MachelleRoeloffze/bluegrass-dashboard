"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="error-page">
      <div className="error-page__content">
        <h1 className="error-page__title">404 – Page Not Found</h1>
        <p className="error-page__subtitle">Oops! This page doesn’t exist.</p>
        <p className="error-page__text">
          The page you’re looking for might have been removed, renamed, or is
          temporarily unavailable.
        </p>
        <div className="error-page__actions">
          <Link href="/" className="btn btn--primary">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
