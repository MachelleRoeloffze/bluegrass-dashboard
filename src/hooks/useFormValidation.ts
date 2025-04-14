import { useState } from "react";

export function useFormValidation<T extends Record<string, string>>(
  initialState: T
) {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = (key: keyof T, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));

    // Clear the error while typing
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validateAll = (): boolean => {
    let valid = true;
    const newErrors: typeof errors = {};

    for (const key in values) {
      const value = values[key];
      if (!value) {
        newErrors[key] = "This field is required.";
        valid = false;
      } else if (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors[key] = "Invalid email format.";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  return {
    values,
    errors,
    handleChange,
    validateAll,
    setValues,
    setErrors,
  };
}
