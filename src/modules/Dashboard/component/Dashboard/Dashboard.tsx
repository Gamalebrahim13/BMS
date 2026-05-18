import headerBg from "../../../../assets/images/dashboard-header-bg.png"
import { useAuth } from "../../../../context/AuthContext";
export default function Dashboard() {
      const { loginData } = useAuth();
  
  return (
    <>
   <div className="px-5">
  <div className="relative w-full h-[320px] rounded-2xl overflow-hidden">
    <img
      src={headerBg}
      alt="Header"
      className="w-full h-full object-cover"
    />

    <div className="absolute inset-0 bg-black/30 flex items-center">
      <div className="pl-10 text-white max-w-xl">
        <h1 className="text-4xl font-bold mb-3">
          Welcome {loginData?.userName}
        </h1>
        <p className="text-lg text-gray-200">
         You can add project and assign tasks to your team.
        </p>
      </div>
    </div>
  </div>
</div>
    </>
  )
}
