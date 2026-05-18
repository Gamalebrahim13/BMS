import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SidBar from "../SideBar/SidBar";

export default function MasterLayout() {
  return (
   <div className="flex flex-col h-screen overflow-hidden">
       <Navbar />
 <div className="flex flex-1 overflow-hidden">
    <div className="sidebar-wrapper h-full">
      <SidBar />
    </div>
    
    <div className="flex-1 overflow-auto bg-[#F5F5F5]">
      <Outlet />
    </div>
  </div>
</div>
  )
}
