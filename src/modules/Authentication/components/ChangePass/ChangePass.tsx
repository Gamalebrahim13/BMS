import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { toast } from "react-toastify";
import { changePassword } from "../../../../api/module/auth";
import Input from "../../../Shared/Components/custominput";

export default function ChangePass() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  type ChangePasswordForm = {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  };

  let {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<ChangePasswordForm>();
  const newPassword = watch("newPassword");

  const onSubmit = async (data: ChangePasswordForm) => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await changePassword(data);
      navigate("/login");
      toast.success("Change Password Successfully");
    } catch (error: any) {
      const errors = error?.response?.data?.additionalInfo?.errors;

      if (errors) {
        Object.values(errors).forEach((messages: any) => {
          if (Array.isArray(messages)) {
            messages.forEach((msg: string) => {
              toast.error(msg);
            });
          }
        });
      } else {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="text-white mb-10">
        <span className="text-sm font-light  text-white">welcome to PMS</span>
        <h3 className="text-3xl text-primary relative font-bold mt-1">
          Change Password
          <span className="absolute left-1 -bottom-0.5 w-4 h-1 bg-primary "></span>
        </h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Old Password */}
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

        {/* New Password */}

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

        {/* Confiremd New Password */}
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Enter Your Confirme New Password"
          required
          register={register("confirmNewPassword", {
            required: "Required",
            validate: (value) =>
              value === newPassword || "Passwords do not match",
          })}
          error={errors.confirmNewPassword}
        />

        <button
          disabled={loading}
          className="bg-primary text-white w-full px-8 py-2 mt-10 rounded-full">
          {loading ? "Loading..." : "Save"}
        </button>
      </form>
    </>
  );
}
