import { requestResetPassword } from "../../../../api/module/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type ForgetPassFormData = {
  email: string;
};

export default function ForgetPass() {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<ForgetPassFormData>();

 const onSubmit = async (data: ForgetPassFormData) => {
  try {
    const res = await requestResetPassword(data);

    toast.success(res?.message || "Check your email");

    navigate("/reset-password", { state: { email: data.email } });
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Something went wrong");
  }
};
  return (
    <>
      <div className="text-white mb-10">
        <span className="text-[11px] font-light text-white">
          welcome to PMS
        </span>

        <h3 className="text-2xl text-primary relative font-bold mt-1">
          Forget Password
          <span className="absolute left-0.5 -bottom-0.5 w-3 h-1 bg-primary"></span>
        </h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-2">
          <label className="text-primary text-sm font-light mb-0.5">
            E-mail
          </label>

          <input
            placeholder="Enter your E-mail"
            {...register("email", {
              required: "field is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email is not valid",
              },
            })}
            type="email"
            className="bg-transparent font-light outline-none text-white placeholder:text-white placeholder:text-md w-full"
          />

          {errors.email?.message && (
            <span className="text-primary text-sm mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        <hr className="border-white/20" />

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-white w-full px-8 py-2 mt-12 rounded-full"
        >
          {isSubmitting ? "Sending..." : "Verify"}
        </button>
      </form>
    </>
  );
}