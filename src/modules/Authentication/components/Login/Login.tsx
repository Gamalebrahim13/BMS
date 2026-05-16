
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { login } from "../../../../api/module/auth";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../context/AuthContext";
import type { LoginData } from "../../../../api/module/auth";
import Input from "../../../Shared/Components/CustomeInput/custominput";
export default function Login() {
  const [loading, setLoading] = useState(false);
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("AuthContext must be used inside AuthProvider");
  }

  const { saveLoginData } = context;

  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginData>();

  const onSubmit = async (data: LoginData,) => {
    setLoading(true);
    try {
      const response = await login(data);
      console.log(response);
      saveLoginData(response.token);
      navigate("/dashboard");
      toast.success("Login Successfully");
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
    
    <div className="w-full max-w-md mx-auto bg-[#315951cc] backdrop-blur-sm rounded-2xl p-6 md:p-10 shadow-2xl border border-white/10" >
      <div className="text-white mb-10">
        <span className="text-sm font-light  text-white">welcome to PMS</span>
        <h3 className="text-3xl text-primary relative font-bold mt-1">
          Login
          <span className="absolute left-0.5 -bottom-0.5 w-3 h-1 bg-primary "></span>
        </h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <Input
          label="Password"
          type="password"
          required
          placeholder="Enter password"
          register={register("password", {
            required: "Password is required",
          })}
          error={errors.password}
        />

        <div className="links mt-3 text-white font-light flex justify-between text-sm">
          <Link to="/register"> Register Now ?</Link>
          <Link to="/forget-password"> Forget Password ?</Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white w-full px-8 py-2 mt-10 rounded-full">
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      </div>
  );
}

