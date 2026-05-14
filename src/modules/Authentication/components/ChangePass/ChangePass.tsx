import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { changePassword } from "../../../../api/module/auth";

export default function ChangePass() {
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
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
      toast.error(error?.response?.data?.message);
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
        <div className="flex flex-col mb-2 mt-5 relative ">
          <label className="text-primary text-sm font-light mb-0.5  ">
            Old Password
          </label>
          <div className="relative flex items-center">
            <input
              {...register("oldPassword", {
                required: "field is required",
              })}
              type={showOldPassword ? "text" : "password"}
              placeholder="Enter your Old Password"
              className="bg-transparent font-light outline-none text-white placeholder:text-white placeholder:text-sm w-full "
            />

            <span
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute right-0 cursor-pointer text-white text-md ">
              {showOldPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </span>
          </div>
        </div>
        <hr className=" border-white/20 " />
        {errors.oldPassword && (
          <span className="text-primary">{errors.oldPassword.message}</span>
        )}

        {/* New Password */}

        <div className="flex flex-col mb-2 mt-5 relative ">
          <label className="text-primary text-sm font-light mb-0.5  ">
            Password
          </label>
          <div className="relative flex items-center">
            <input
              {...register("oldPassword", {
                required: "field is required",
              })}
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter your New Password"
              className="bg-transparent font-light outline-none text-white placeholder:text-white placeholder:text-sm w-full "
            />

            <span
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-0 cursor-pointer text-white text-md ">
              {showNewPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </span>
          </div>
        </div>
        <hr className=" border-white/20 " />
        {errors.newPassword && (
          <span className="text-primary">{errors.newPassword.message}</span>
        )}

        {/* Confiremd New Password */}
        <div className="flex flex-col mb-2 mt-5 relative ">
          <label className="text-primary text-sm font-light mb-0.5  ">
            Password
          </label>
          <div className="relative flex items-center">
            <input
              {...register("confirmNewPassword", {
                required: "field is required",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
              type={showConfirmNewPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              className="bg-transparent font-light outline-none text-white placeholder:text-white placeholder:text-sm w-full "
            />

            <span
              onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
              className="absolute right-0 cursor-pointer text-white text-md ">
              {showConfirmNewPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </span>
          </div>
        </div>
        <hr className=" border-white/20 " />
        {errors.confirmNewPassword && (
          <span className="text-primary">
            {errors.confirmNewPassword.message}
          </span>
        )}

        <button
          disabled={loading}
          className="bg-primary text-white w-full px-8 py-2 mt-10 rounded-full">
          {loading ? "Loading..." : "Save"}
        </button>
      </form>
    </>
  );
}
