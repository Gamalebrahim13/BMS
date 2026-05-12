import { Outlet } from "react-router-dom";
import bgAuth from "../../../../assets/images/bgAuth.png";
import logo from "../../../../assets/images/logo.png";

export default function AuthLayout() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${bgAuth})`,
      }}
    >
      <div className="w-full max-w-md">
        
        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="logo" className="w-60" />
        </div>

        {/* CARD */}
        <div className="bg-[#315951cc] backdrop-blur-sm rounded-2xl p-12 shadow-2xl border border-white/10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}