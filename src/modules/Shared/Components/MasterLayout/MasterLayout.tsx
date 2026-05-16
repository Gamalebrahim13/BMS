import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SidBar from "../SideBar/SidBar";

export default function MasterLayout() {
  return (
     <div className='d-flex vh-100 overflow-hidden'>
        <div className='sidebar-wrapper'>
          <SidBar/>
      </div>
      <div className="w-100 overflow-auto">
        <Navbar />
        <Outlet/>
      </div>

    </div>
  )
}
