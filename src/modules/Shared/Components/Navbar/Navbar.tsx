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
    return (
        <>
      {showLogout && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
    
    <div 
      className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      onClick={handleLogoutClose} 
    />

    <div className="relative bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl  flex flex-col items-center animate-in fade-in zoom-in-95 duration-200 z-10">
      
      <button 
        type="button" 
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-100 rounded-full transition-colors" 
        onClick={handleLogoutClose}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="flex flex-col items-center bg-[#0E382F]/[0.03] border border-[#0E382F]/[0.08] rounded-2xl p-5 w-full max-w-[280px] mb-6 mt-4">
        <img 
          src={ defult} 
          alt="User Avatar" 
          className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md mb-3"
        />
        <h5 className="text-lg font-bold text-[#0E382F] mb-0.5">
          {loginData?.userName || "User"}
        </h5>
        <p className="text-xs text-gray-400 font-normal truncate w-full text-center px-2">
          {loginData?.userEmail || "No email available"}
        </p>
      </div>
      <div className="flex items-center gap-2 mb-2 text-red-600">
        <HiOutlineLogout className="text-2xl" />
        <h4 className="text-xl font-bold text-gray-800">Logout?</h4>
      </div>
      
      <p className="text-gray-500 text-sm text-center max-w-[260px] mb-6 leading-relaxed">
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
          className="flex-1 bg-transparent border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-sm py-3 px-4 rounded-xl transition-all active:scale-95" 
          onClick={handleLogoutClose}
        >
          Cancel
        </button>
      </div>

    </div>
  </div>
)}
        <div className="flex items-center justify-between p-4 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.15)] bg-white ">
            <div className="flex items-center gap-3">
                <img
                    src={logo}
                    alt="logo"
                    className=" h-12"
                />
            </div>
            <div className="flex items-center gap-2 text-gray-500">
                <div className="flex items-center pr-6 mr-2 border-r border-[#9A9A9A]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500 hover:text-yellow-600 cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="{2}" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </div>

                <div className="flex items-center justify-between p-2 bg-white rounded-lg max-w-sm cursor-pointer hover:bg-gray-50 transition-colors">

                    <div className="flex items-center gap-4">
                        <img
                            src={defult}
                            alt="User Profile"
                            className="w-14 h-14 rounded-full object-cover"
                        />

                        <div className="flex flex-col">
                            <h4 className="text-xl font-medium text-[#0E382F]">
                                {loginData?.userName}
                            </h4>
                            <span className="text-lg text-[#000000]/[0.37] font-light mt-0.5">
                                {loginData?.userEmail}
                            </span>
                        </div>
                    </div>
                    <div className="relative inline-block text-left">

                        <div className="text-[#000000]/[0.37] pl-4 cursor-pointer hover:text-black transition-colors"
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
                        <div
                            className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50 origin-top-right transition-all duration-200 ease-out
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
                                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                            >
                                <HiOutlineLockClosed className="text-lg text-gray-500" />
                                <span>Change Password</span>
                            </button>
                            <button
                                onClick={() => {
                                    
                                    setIsOpen(false);
                                    handleLogoutOpen();
                                }}
                                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left font-medium"
                            >
                                <HiOutlineLogout className="text-lg text-red-500" />
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
