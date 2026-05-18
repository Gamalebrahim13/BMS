import React, { useState } from 'react'
import { HiOutlineClipboardList } from 'react-icons/hi'
import { LuFolderHeart, LuLayoutDashboard, LuUsers } from 'react-icons/lu'
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar'
import { Link, useLocation } from 'react-router-dom'

export default function SidBar() {
    const [isCollapsed,setIsCollapsed]=useState(false)
    const location = useLocation();

  const toggleCollapse=()=>{
    setIsCollapsed(!isCollapsed)
  }
  return (
    <div className=' bg-[#0E382F] h-full min-h-screen flex flex-col'>
      <Sidebar collapsed={isCollapsed}>
        <div className="relative">
  <button
    onClick={() => toggleCollapse()}
    className="absolute -right-1 top-5 z-50 flex h-16 w-10 items-center justify-center bg-[#ef9b28] text-white shadow-md transition-all duration-300 hover:bg-[#d8871e]"
    style={{
      borderTopLeftRadius: "16px",
      borderBottomLeftRadius: "16px",
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-8 w-8 m-2 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  </button>

</div>
        <Menu  className='bg-[#0E382F] text-[#FFFFFF]'menuItemStyles={{
            button: ({ active }) => ({
              backgroundColor: active ? '#0A2922' : 'transparent',
              color: active ? '#ef9b28' : '#white',
              
              '&:hover': {
                backgroundColor: '#0A2922',
                color: '#ef9b28',
              },
              transition: 'all 0.2s ease',
            }),
            icon: ({ active }) => ({
              color: active ? '#ef9b28' : 'inherit',
              '&:hover': {
                color: '#ef9b28',
              },
            }),
          }}>
              <MenuItem active={location.pathname === "/dashboard"} 
               icon={<LuLayoutDashboard className="text-xl group-hover:text-[#ef9b28] transition-colors" />} component={<Link to="/dashboard" />}> Home </MenuItem>
              <MenuItem active={location.pathname === "/dashboard/user-list"} 
               icon={<LuUsers className="text-xl group-hover:text-[#ef9b28] transition-colors" />} component={<Link to="/dashboard/user-list" />}> Users </MenuItem>

              <MenuItem active={location.pathname === "/dashboard/project-list"}
               icon={<LuFolderHeart className="text-xl group-hover:text-[#ef9b28] transition-colors" />} component={<Link to="/dashboard/project-list" />}> Projects </MenuItem>

              <MenuItem active={location.pathname === "/dashboard/task-list"}
               icon={<HiOutlineClipboardList className="text-xl group-hover:text-[#ef9b28] transition-colors" />} component={<Link to="/dashboard/task-list" />}> Tasks </MenuItem>


        </Menu>
      </Sidebar>
    </div>
  )
}
