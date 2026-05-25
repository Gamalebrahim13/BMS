import { useAuth } from '../../../../context/AuthContext'
import logo from "../../../../assets/images/navbar-logo.png"
import defult from "../../../../assets/images/defult-user-img.png"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineLockClosed, HiOutlineLogout } from 'react-icons/hi';
import { toast } from 'react-toastify';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleLogoutOpen = () => setShowLogout(true);
  const handleLogoutClose = () => setShowLogout(false);

  const handleFinalLogout = () => {
    localStorage.removeItem("token");
    handleLogoutClose();
    toast.success("LogOut Success")
    navigate("/login");
  };
  const { loginData } = useAuth();

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");

    if (document.documentElement.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <>
      {/* 1. LOGOUT MODAL (الشاشة المنبثقة لتسجيل الخروج) */}
      {showLogout && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={handleLogoutClose}
          />

          {/* بوكس المودال الرئيسي */}
          <div className="relative bg-white dark:bg-zinc-900 border border-transparent dark:border-zinc-800 rounded-3xl p-6 w-full max-w-md shadow-2xl flex flex-col items-center animate-in fade-in zoom-in-95 duration-200 z-10">
            
            {/* زرار الإغلاق (X) */}
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300 p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
              onClick={handleLogoutClose}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* كارت البروفايل المصغر داخل المودال */}
            <div className="flex flex-col items-center bg-[#0E382F]/[0.03] dark:bg-[#0E382F]/[0.1] border border-[#0E382F]/[0.08] dark:border-[#0E382F]/[0.2] rounded-2xl p-5 w-full max-w-[280px] mb-6 mt-4">
              <img
                src={defult}
                alt="User Avatar"
                className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-zinc-800 shadow-md mb-3"
              />
              <h5 className="text-lg font-bold text-[#0E382F] dark:text-[#2ec4a5] mb-0.5">
                {loginData?.userName || "User"}
              </h5>
              <p className="text-xs text-gray-400 dark:text-zinc-400 font-normal truncate w-full text-center px-2">
                {loginData?.userEmail || "No email available"}
              </p>
            </div>

            <div className="flex items-center gap-2 mb-2 text-red-600 dark:text-red-500">
              <HiOutlineLogout className="text-2xl" />
              <h4 className="text-xl font-bold text-gray-800 dark:text-zinc-100">Logout?</h4>
            </div>

            <p className="text-gray-500 dark:text-zinc-400 text-sm text-center max-w-[260px] mb-6 leading-relaxed">
              Are you sure you want to log out from your account?
            </p>

            <div className="flex items-center gap-3 w-full px-2">
              <button
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm py-3 px-4 rounded-xl transition-all shadow-sm active:scale-95"
                onClick={handleFinalLogout}
              >
                Yes, Logout
              </button>

              <button
                className="flex-1 bg-transparent border border-gray-300 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-300 font-semibold text-sm py-3 px-4 rounded-xl transition-all active:scale-95"
                onClick={handleLogoutClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. NAVBAR MAIN CONTAINER (شريط الناف بار الرئيسي) */}
      <div className="flex items-center justify-between p-4 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_20px_-5px_rgba(0,0,0,0.3)] bg-white dark:bg-zinc-900 border-b dark:border-zinc-800/50 transition-colors duration-300">
        
        {/* اللوجو */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="logo"
            className="h-12"
          />
        </div>

        {/* الجانب الأيمن (الأزرار والبروفايل) */}
        <div className="flex items-center gap-5 text-gray-500 dark:text-zinc-400 px-10">
          
          {/* زرار التبديل لـ الدارك مود */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors text-lg"
          >
            🌙
          </button>

          {/* الجرس (الإشعارات) */}
          <div className="flex items-center pr-6 mr-2 border-r border-gray-200 dark:border-zinc-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500 hover:text-yellow-600 cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>

          {/* كارت معلومات المستخدم */}
          <div className="flex items-center justify-between p-2 bg-white dark:bg-zinc-900 rounded-lg min-w-[320px] cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-850/50 transition-colors relative">
            <div className="flex items-center gap-4">
              <img
                src={defult}
                alt="User Profile"
                className="w-14 h-14 rounded-full object-cover border dark:border-zinc-800"
              />
              <div className="flex flex-col">
                <h4 className="text-xl font-medium text-[#0E382F] dark:text-[#2ec4a5]">
                  {loginData?.userName}
                </h4>
                <span className="text-lg text-black/40 dark:text-zinc-400 font-light mt-0.5">
                  {loginData?.userEmail}
                </span>
              </div>
            </div>

            {/* السهم والـ Dropdown */}
            <div className="relative">
              <div
                className="text-black/40 dark:text-zinc-400 pl-4 cursor-pointer hover:text-black dark:hover:text-white transition-colors"
                onClick={toggleDropdown}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 stroke-[1.5]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>

              {/* القائمة المنسدلة (Dropdown Menu) */}
              <div
                className={`absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-800 py-1 z-50 origin-top-right transition-all duration-200 ease-out
                  ${isOpen
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-95 pointer-events-none"
                  }`}
              >
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/change-password");
                  }}
                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors text-left"
                >
                  <HiOutlineLockClosed className="text-lg text-gray-500 dark:text-zinc-400" />
                  <span>Change Password</span>
                </button>
                
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogoutOpen();
                  }}
                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-left font-medium"
                >
                  <HiOutlineLogout className="text-lg text-red-500 dark:text-red-400" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}