import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import axiosClient from "../../../../api/axiosClient";

type ResetPassFormData = {
  email: string;
  seed: string;
  password: string;
  confirmPassword: string;
};

export default function ResetPass() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPassFormData>({
    defaultValues: {
      email: location.state?.email || "",
    },
  });

  const passwordValue = watch("password");

  const onSubmit = async (data: ResetPassFormData) => {
    try {
      const res = await axiosClient.post(
        "/Users/Reset",
        data
      );

      toast.success(
        res?.data?.message || "Password updated successfully"
      );

      navigate("/login");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <>
      {/* Header */}
      <div className="text-white mb-8">
        <span className="text-[11px] font-light">
          welcome to PMS
        </span>

        <h3 className="text-2xl text-primary relative font-bold mt-1">
          Reset Password
          <span className="absolute left-0.5 -bottom-0.5 w-3 h-1 bg-primary"></span>
        </h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div className="flex flex-col mb-2">
          <label className="text-primary text-sm font-light mb-0.5">
            E-mail
          </label>

          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email is not valid",
              },
            })}
            type="email"
            placeholder="Enter your E-mail"
            className="bg-transparent font-light outline-none text-white w-full"
          />
        </div>
        <hr className="border-white/20" />
        {errors.email?.message && (
          <span className="text-primary text-sm">
            {errors.email.message}
          </span>
        )}

        {/* Seed (OTP) */}
        <div className="flex flex-col mb-2 mt-5">
          <label className="text-primary text-sm font-light mb-0.5">
            OTP Verification
          </label>

          <input
            {...register("seed", {
              required: "OTP is required",
            })}
            type="text"
            placeholder="Enter verification code"
            className="bg-transparent font-light outline-none text-white w-full"
          />
        </div>
        <hr className="border-white/20" />
        {errors.seed?.message && (
          <span className="text-primary text-sm">
            {errors.seed.message}
          </span>
        )}

        {/* Password */}
        <div className="flex flex-col mb-2 mt-5">
          <label className="text-primary text-sm font-light mb-0.5">
            New Password
          </label>

          <div className="relative">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message:
                    "Password must be at least 6 characters",
                },
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              className="bg-transparent font-light outline-none text-white w-full pr-10"
            />

            <span
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-white"
            >
              {showPassword ? (
                <IoEyeOffOutline />
              ) : (
                <IoEyeOutline />
              )}
            </span>
          </div>
        </div>
        <hr className="border-white/20" />
        {errors.password?.message && (
          <span className="text-primary text-sm">
            {errors.password.message}
          </span>
        )}

        {/* Confirm Password */}
        <div className="flex flex-col mb-2 mt-5">
          <label className="text-primary text-sm font-light mb-0.5">
            Confirm Password
          </label>

          <div className="relative">
            <input
              {...register("confirmPassword", {
                required:
                  "Confirm password is required",
                validate: (value) =>
                  value === passwordValue ||
                  "Passwords do not match",
              })}
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirm password"
              className="bg-transparent font-light outline-none text-white w-full pr-10"
            />

            <span
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-white"
            >
              {showConfirmPassword ? (
                <IoEyeOffOutline />
              ) : (
                <IoEyeOutline />
              )}
            </span>
          </div>
        </div>
        <hr className="border-white/20" />
        {errors.confirmPassword?.message && (
          <span className="text-primary text-sm">
            {errors.confirmPassword.message}
          </span>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="bg-primary text-white w-full px-8 py-2 mt-10 rounded-full"
        >
          Save
        </button>
      </form>
    </>
  );
}