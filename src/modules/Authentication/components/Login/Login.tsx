
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { login } from "../../../../api/module/auth";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../context/AuthContext";
export default function Login() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("AuthContext must be used inside AuthProvider");
  }

  const { saveLoginData } = context;
  type LoginFormData = {
    email: string;
    password: string;
  };

  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await login(data);
      console.log(response);
      saveLoginData(response.token);
      navigate("/register");
      toast.success("Login Successfully");
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
          Login
          <span className="absolute left-0.5 -bottom-0.5 w-3 h-1 bg-primary "></span>
        </h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-2 ">
          <label className="text-primary text-sm font-light mb-0.5 ">
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
            type="text"
            className="bg-transparent font-light outline-none text-white placeholder:text-white placeholder:text-md w-full "
          />
        </div>
        <hr className="border-white/20" />
        {errors.email && (
          <span className="text-primary">{errors.email.message}</span>
        )}

        <div className="flex flex-col mb-2 mt-5 relative ">
          <label className="text-primary text-sm font-light mb-0.5  ">
            Password
          </label>
          <div className="relative flex items-center">
            <input
              {...register("password", {
                required: "field is required",
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="bg-transparent font-light outline-none text-white placeholder:text-white placeholder:text-md w-full "
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 cursor-pointer text-white text-md ">
              {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </span>
          </div>
        </div>
        <hr className=" border-white/20 " />
        {errors.password && (
          <span className="text-primary">{errors.password.message}</span>
        )}

        <div className="links mt-3 text-white font-light flex justify-between text-sm">
          <Link to="/register"> Register Now ?</Link>
          <Link to="/forget-password"> Forget Password ?</Link>
        </div>

        <button
          disabled={loading}
          className="bg-primary text-white w-full px-8 py-2 mt-10 rounded-full">
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </>
  );
}

