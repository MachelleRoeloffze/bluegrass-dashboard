"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { label: "Dashboard", icon: "icon-home", href: "/" },
  { label: "My Profile", icon: "icon-user", href: "/profile" },
  { label: "Manage Practices", icon: "icon-medical", href: "/practices" },
  { label: "Logs", icon: "icon-file", href: "/logs" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={`sidebar__toggle${isOpen ? " sidebar__toggle--open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        <span />
        <span />
        <span />
      </button>

      <aside className={`sidebar${isOpen ? " sidebar--open" : ""}`}>
        <div className="sidebar__logo">
          <img src="/images/fertility-journey-logo.svg" alt="Logo" />
        </div>

        <nav className="sidebar__nav">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`sidebar__link${index === 0 ? " active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              <i className={link.icon} />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
