import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SidBar from "../SideBar/SidBar";

export default function MasterLayout() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* الـ Navbar فوق */}
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* الـ Sidebar على الشمال */}
        <div className="sidebar-wrapper h-full">
          <SidBar />
        </div>
        
        {/* منطقة المحتوى الرئيسي (الـ Outlet) */}
        {/* ضفنا هنا dark:bg-[#0c0c0e] عشان الصفحات تقلب للأسود المات الفخم اللي اتفقنا عليه */}
        <div className="flex-1 overflow-auto bg-[#F5F5F5] dark:bg-[#0c0c0e] transition-colors duration-300">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
