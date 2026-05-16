import { useForm } from "react-hook-form";
import { verifyAccount, type VerifyData } from "../../../../api/module/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Input from "../../../Shared/Components/CustomeInput/custominput";


export default function Verfiy() {
      const [loading, setLoading] = useState(false);
      const navigate=useNavigate();

  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<VerifyData>();
    const onSubmit = async (data: VerifyData) => {
      try {
        const response = await verifyAccount(data); 
        setLoading(true)
         toast.success(
      response?.data?.message || "Account Verified successfully!"
    );
        navigate("/login"); 
      } catch (error: any) {
    toast.error(
      error?.response?.data?.message 
    );
    }finally{
        setLoading(false)
      }
    };
  return (
    
    <div className="w-full max-w-md mx-auto bg-[#315951cc] backdrop-blur-sm rounded-2xl p-6 md:p-10 shadow-2xl border border-white/10">
     <div className="text-white mb-10">
        <span className="text-sm font-light  text-white">welcome to PMS</span>
        <h3 className="text-3xl text-primary relative font-bold mt-1">
          Verify Account
          <span className="absolute left-0 -bottom-0.5 w-3 h-1 bg-primary "></span>
        </h3>
      </div>
         <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Email" type="email" required placeholder="Enter your E-mail" register={register("email", {
              required: "field is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email is not valid",
              },
            })} error={errors.email} />
            <Input label="Code" placeholder="Enter your Code" required register={register("code",{
               required: "field is required",
  })} error={errors.code}  />

       
      
         <button disabled={loading} className="bg-primary text-white w-full px-8 py-2 mt-10 rounded-full">
          {loading ? "Loading..." : "Save"}
        </button>
        </form>
        </div>
    
  )
}

