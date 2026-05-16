import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Input from "../../../Shared/Components/CustomeInput/custominput";

type ForgetPassFormData = {
  email: string;
};

export default function ForgetPass() {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ForgetPassFormData>();

 const onSubmit = async (data: ForgetPassFormData) => {
  try {
    const res = await axios.post(
      "https://upskilling-egypt.com:3003/api/v1/Users/Reset/Request",
      data
    );

    toast.success(res?.data?.message || "Check your email");

    
    localStorage.setItem("resetEmail", data.email);

    navigate("/reset-password");
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Something went wrong");
  }
};
  return (
    <div className="w-full max-w-md mx-auto bg-[#315951cc] backdrop-blur-sm rounded-2xl p-6 md:p-10 shadow-2xl border border-white/10">
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
          <Input
          label="Email"
          type="email"
          required
          placeholder="Enter email"
          register={register("email", {
            required: "Email is required",
          })}
          error={errors.email}
        />


          
        </div>

       

        <button
          type="submit"
          className="bg-primary text-white w-full px-8 py-2 mt-12 rounded-full"
        >
          Verify
        </button>
      </form>
    </div>
  );
}