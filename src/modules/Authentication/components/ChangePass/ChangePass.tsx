import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { changePassword } from "../../../../api/module/auth";
import Input from "../../../Shared/Components/CustomeInput/custominput";
import type { ChangePasswordData } from "../../../../api/module/auth";

export default function ChangePass() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<ChangePasswordData>();

  const newPassword = watch("newPassword");

  const onSubmit = async (data: ChangePasswordData) => {
    if (loading) return;

    setLoading(true);

    try {
      await changePassword(data); 

      toast.success("Change Password Successfully");

      navigate("/login");
    } catch (error: any) {
      const apiErrors = error?.response?.data?.additionalInfo?.errors;

      if (apiErrors) {
        Object.values(apiErrors).forEach((messages: any) => {
          if (Array.isArray(messages)) {
            messages.forEach((msg: string) => {
              toast.error(msg);
            });
          }
        });
      } else {
        toast.error(
          error?.response?.data?.message || "Something went wrong"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#315951cc] backdrop-blur-sm rounded-2xl p-6 md:p-10 shadow-2xl border border-white/10">
      <div className="text-white mb-10">
        <span className="text-sm font-light text-white">
          welcome to PMS
        </span>

        <h3 className="text-3xl text-primary relative font-bold mt-1">
          Change Password
          <span className="absolute left-1 -bottom-0.5 w-4 h-1 bg-primary" />
        </h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Old Password"
          type="password"
          placeholder="Enter Your Old Password"
          required
          register={register("oldPassword", {
            required: "Required",
          })}
          error={errors.oldPassword}
        />

        <Input
          label="New Password"
          type="password"
          placeholder="Enter Your New Password"
          required
          register={register("newPassword", {
            required: "Required",
          })}
          error={errors.newPassword}
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Enter Your Confirm New Password"
          required
          register={register("confirmNewPassword", {
            required: "Required",
            validate: (value) =>
              value === newPassword || "Passwords do not match",
          })}
          error={errors.confirmNewPassword}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white w-full px-8 py-2 mt-10 rounded-full"
        >
          {loading ? "Loading..." : "Save"}
        </button>
      </form>
    </div>
  );
}