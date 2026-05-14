import { useState } from "react";
import {
  FieldError,
  UseFormRegisterReturn,
} from "react-hook-form";

import {
  IoEyeOffOutline,
  IoEyeOutline,
} from "react-icons/io5";

type InputProps = {
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  register: UseFormRegisterReturn;
  error?: FieldError;
};

export default function Input({
  label,
  placeholder,
  type = "text",
  required = false,
  register,
  error,
}: InputProps) {
  const [showPassword, setShowPassword] =
    useState(false);

  const isPassword = type === "password";

  const inputType = isPassword
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="mb-4">
      <div className="flex flex-col relative">
        <label
          htmlFor={register.name}
          className="text-primary text-sm font-light mb-1"
        >
          {label}

          {required && (
            <span className="text-red-500 ml-1">
              *
            </span>
          )}
        </label>

        <div className="relative flex items-center">
          <input
            {...register}
            id={register.name}
            type={inputType}
            placeholder={placeholder}
            aria-invalid={!!error}
            className="bg-transparent font-light outline-none text-white placeholder:text-white placeholder:text-sm w-full pr-8"
          />

          {isPassword && (
            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-0 text-white text-md"
            >
              {showPassword ? (
                <IoEyeOffOutline />
              ) : (
                <IoEyeOutline />
              )}
            </button>
          )}
        </div>

        <hr className="border-white/20 mt-2" />
      </div>

      <div className="min-h-[20px]">
        {error && (
          <span className="text-primary text-sm">
            {error.message}
          </span>
        )}
      </div>
    </div>
  );
}  