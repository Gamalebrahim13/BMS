import { useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser, type RegisterData } from "../../../../api/module/auth";
import { FaUser } from "react-icons/fa";
import Input from "../../../Shared/Components/custominput";


export default function Register() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const navigate = useNavigate()



  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<RegisterData>();
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImgPreview(URL.createObjectURL(file));
      setValue("profileImage", e.target.files as unknown as File);
    }
  };
  const onSubmit = async (data: RegisterData) => {
    try {
      const response = await registerUser(data);
      toast.success(response.data.message || "Account created successfully!");
      navigate("/verify-account");
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
    toast.error(
      error?.response?.data?.message || "Something went wrong"
    );
  }
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <div className="text-white mb-10">
        <span className="text-sm font-light  text-white">welcome to PMS</span>
        <h3 className="text-3xl text-primary relative font-bold mt-1">
          Create New Account
          <span className="absolute left-0 -bottom-0.5 w-3 h-1 bg-primary "></span>
        </h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="none">
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="relative group w-24 h-24 sm:w-32 sm:h-32">
            <div className={`w-full h-full rounded-full flex items-center justify-center overflow-hidden border-2 
      ${!imgPreview ? "border-dashed border-white/20 bg-white/5" : "border-primary"}`}>

              {imgPreview ? (
                <img src={imgPreview} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <FaUser className="text-white/20 text-4xl" />
              )}
            </div>

            <label htmlFor="profile-upload" className="absolute inset-0 bg-black/40 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <input id="profile-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          </div>

          <p className="text-white/60 text-xs mt-2 font-light">Click to change photo</p>
        </div>
        <div className="flex flex-row gap-4 mb-4">
          <div className="flex-1">
            <Input label="User Name" placeholder="Enter your UserName" required register={register("userName", {
              required: "field is required",
            })} type="text" error={errors.userName} />
          </div>
          <div className="flex-1">
            <Input label="Email" type="email" required placeholder="Enter your E-mail" register={register("email", {

              required: "field is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email is not valid",
              },
            })} error={errors.email} />
          </div>


        </div>
        <div className="flex flex-row gap-4 mb-4">
          <Input label="Country" register={register("country")} type="text" placeholder="Your Country" error={errors.country} />
          <div className="flex-1">
             <Input label="Phone Number" register={register("phoneNumber")} type="tel" placeholder="Your Phone" error={errors.phoneNumber}/>
          </div>
        </div>
        <div className="flex flex-row gap-4 mb-4">
          <div className="flex-1">
            <Input label="Password" register={register("password",{
              required:"Field is Required "
            })} required  type="password" placeholder="Enter your Password" error={errors.password}/>
          </div>

          <div className="flex-1">
            <Input label="Confirm Password" register={register("confirmPassword",{
              required:"Field is Required " 
            })} placeholder="Confirm New Password" type="password" error={errors.confirmPassword} />
          </div>
        </div>
        <button disabled={loading} className="bg-primary text-white w-full px-8 py-2 mt-10 rounded-full">
          {loading ? "Loading..." : "Save"}
        </button>

      </form>

    </>
  );
}
