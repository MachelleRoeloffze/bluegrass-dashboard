"use client";
import React from "react";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
  name?: string;
}

export default function Input({
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
  error,
  name,
}: InputProps) {
  const inputId = `input-${name || placeholder?.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="input-wrapper">
      <input
        id={inputId}
        name={name}
        className={`input${error ? " input--error" : ""}`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        autoComplete="off"
      />
      {error && (
        <span id={`${inputId}-error`} className="input__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
