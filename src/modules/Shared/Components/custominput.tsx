import { useState, type InputHTMLAttributes } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import {
  IoEyeOffOutline,
  IoEyeOutline,
} from "react-icons/io5";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  required?: boolean;
};

export default function Input({
  label,
  register,
  error,
  required = false,
  type = "text",
  className = "",
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] =
    useState(false);

  const isPassword = type === "password";

  const finalType = isPassword
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="mb-4">
      {/* Label */}
      <label className="text-primary text-sm font-light mb-1 block">
        {label}
        {required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>

      {/* Input */}
      <div className="relative">
        <input
          {...register}
          {...rest}
          type={finalType}
          className={`
            w-full
            bg-transparent
            outline-none
            text-white
            placeholder:text-white/70
            font-light
            pr-10
            ${className}
          `}
        />

        {/* Password Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white"
          >
            {showPassword ? (
              <IoEyeOffOutline />
            ) : (
              <IoEyeOutline />
            )}
          </button>
        )}
      </div>

      {/* underline */}
      <hr className="border-white/20 mt-2" />

      {/* Error */}
      {error && (
        <span className="text-red-400 text-sm">
          {error.message}
        </span>
      )}
    </div>
  );
}