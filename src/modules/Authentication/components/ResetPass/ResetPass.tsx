import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
type ResetPassFormData = {
  email: string;
  seed: string;
  password: string;
  confirmPassword: string;
};

export default function ResetPass() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPassFormData>();

  const passwordValue = watch("password");

  const onSubmit = async (data: ResetPassFormData) => {
    try {
      await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset",
        data
      );

      toast.success("Password reset successfully");
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="text-white mb-8">
        <span className="text-[11px] font-light text-white">
          welcome to PMS
        </span>

        <h3 className="text-2xl text-primary relative font-bold mt-1">
          Reset Password
          <span className="absolute left-0.5 -bottom-0.5 w-3 h-1 bg-primary"></span>
        </h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-2">
          <label className="text-primary text-sm font-light mb-0.5">
            E-mail
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email is not valid",
              },
            })}
            type="email"
            placeholder="Enter your E-mail"
            className="bg-transparent font-light outline-none text-white placeholder:text-white placeholder:text-md w-full"
          />
        </div>
        <hr className="border-white/20" />
        {errors.email?.message && (
          <span className="text-primary">{String(errors.email.message)}</span>
        )}

        <div className="flex flex-col mb-2 mt-5">
          <label className="text-primary text-sm font-light mb-0.5">
            OTP Verification
          </label>
          <input
            {...register("seed", {
              required: "OTP is required",
            })}
            type="text"
            placeholder="Enter Verification"
            className="bg-transparent font-light outline-none text-white placeholder:text-white placeholder:text-md w-full"
          />
        </div>
        <hr className="border-white/20" />
        {errors.seed?.message && (
          <span className="text-primary">{String(errors.seed.message)}</span>
        )}

        <div className="flex flex-col mb-2 mt-5">
          <label className="text-primary text-sm font-light mb-0.5">
            New Password
          </label>

          <div className="relative flex items-center">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your New Password"
              className="bg-transparent font-light outline-none text-white placeholder:text-white placeholder:text-md w-full"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 cursor-pointer text-white text-md"
            >
              {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
            </span>
          </div>
        </div>
        <hr className="border-white/20" />
        {errors.password?.message && (
          <span className="text-primary">
            {String(errors.password.message)}
          </span>
        )}

        <div className="flex flex-col mb-2 mt-5">
          <label className="text-primary text-sm font-light mb-0.5">
            Confirm Password
          </label>

          <div className="relative flex items-center">
            <input
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === passwordValue || "Passwords do not match",
              })}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              className="bg-transparent font-light outline-none text-white placeholder:text-white placeholder:text-md w-full"
            />

            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-0 cursor-pointer text-white text-md"
            >
              {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
            </span>
          </div>
        </div>
        <hr className="border-white/20" />
        {errors.confirmPassword?.message && (
          <span className="text-primary">
            {String(errors.confirmPassword.message)}
          </span>
        )}

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