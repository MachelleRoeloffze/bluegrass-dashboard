"use client";

import { useRef, useState, useEffect } from "react";

interface PopoverCardProps {
  children: React.ReactNode;
  triggerContent: React.ReactNode;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  variant?: "user" | "notifications";
  className?: string;
}

export default function PopoverCard({
  children,
  triggerContent,
  position = "bottom-right",
  variant,
  className = "",
}: PopoverCardProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className={`popover ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={wrapperRef}
    >
      <div className="popover__trigger">{triggerContent}</div>

      {open && (
        <div
          className={`popover__card popover__card--${position} ${
            variant ? `popover__card--${variant}` : ""
          }`}
        >
          <div className="popover__notch" />
          {children}
        </div>
      )}
    </div>
  );
}
