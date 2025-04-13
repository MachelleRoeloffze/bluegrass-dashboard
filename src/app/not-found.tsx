"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { JSX } from "react";

export default function NotFound(): JSX.Element {
  const router = useRouter();

  return (
    <div className="error-page">
      <div className="error-page__content">
        <h1 className="error-page__title">404</h1>
        <p className="error-page__subtitle">Page Not Found</p>
        <p className="error-page__text">
          Sorry, the page you&#39;re looking for doesn&#39;t exist or has been
          moved.
        </p>

        <div className="error-page__actions">
          <Link href="/" className="btn btn--primary">
            Go to Dashboard
          </Link>
          <button className="btn btn--secondary" onClick={() => router.back()}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
