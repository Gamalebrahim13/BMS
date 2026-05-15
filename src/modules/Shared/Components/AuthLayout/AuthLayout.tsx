import { Outlet, useLocation } from "react-router-dom";
import bgAuth from "../../../../assets/images/bgAuth.png";
import logo from "../../../../assets/images/logo.png";
import loginBg from "../../../../assets/images/login-bg.jpeg"
import forgetBg from "../../../../assets/images/forget-pass-bg.jpeg"
import restBg from "../../../../assets/images/rest-password-bg.jpeg"
import changBg from "../../../../assets/images/change-password-bg.jpeg"

export default function AuthLayout() {
   const location = useLocation();
     const backgrounds: Record<string, string> = {
    "/login": loginBg,
    "/register": restBg,
    "/verify-account": changBg,
    "/change-password": changBg,
    "/forget-password": forgetBg,
    "/reset-password": restBg,
  };
   const currentBg =
    backgrounds[location.pathname] || loginBg;
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${currentBg})`,
      }}
    >
      <div className="w-full max-w-md">
        
        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="logo" className="w-60" />
        </div>

        {/* CARD */}
        <div className="bg-[#315951cc] backdrop-blur-sm rounded-2xl p-9 shadow-2xl border border-white/10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}