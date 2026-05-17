import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SidBar from "../SideBar/SidBar";

export default function MasterLayout() {
  return (
   <div className="flex h-screen overflow-hidden">
  <div className="sidebar-wrapper">
    <SidBar />
  </div>
  <div className="w-full overflow-auto">
    <Navbar />
    <Outlet />
  </div>
</div>
  )
}
