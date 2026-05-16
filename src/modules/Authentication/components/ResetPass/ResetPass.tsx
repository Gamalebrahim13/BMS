import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import Input from "../../../Shared/Components/CustomeInput/custominput";
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
        "https://upskilling-egypt.com:3003/api/v1/Users/Reset",
        data
      );

      toast.success("Password reset successfully");
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#315951cc] backdrop-blur-sm rounded-2xl p-6 md:p-10 shadow-2xl border border-white/10">
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
          <Input
            label="Email"
            type="email"
            required
            placeholder="Enter Your E-mail"
            register={register("email", {
              required: "Email is required",
            })}
            error={errors.email}
          />
          <Input
            label="OTP"
            type="text"
            required
            placeholder="Enter Verification"
            register={register("seed", {
              required: "OTP is required",
            })}
            error={errors.seed}
          />

          <Input
            label="Password"
            type="password"
            required
            placeholder="Enter your New password"
            register={register("password", {
              required: "Password is required",
            })}
            error={errors.password}
          />
          <Input
            label="Confirm Password"
            type="password"
            required
            placeholder="Confirm New password"
            register={register("confirmPassword", {
              required: "Password is required",
            })}
            error={errors.confirmPassword}
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white w-full px-8 py-2 mt-10 rounded-full"
        >
          Save
        </button>
      </form>
    </div>
  );
}