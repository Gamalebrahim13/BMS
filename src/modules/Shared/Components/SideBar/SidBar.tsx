import React, { useState } from 'react'
import { HiOutlineClipboardList } from 'react-icons/hi'
import { LuFolderHeart, LuLayoutDashboard, LuUsers } from 'react-icons/lu'
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext'

export default function SidBar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation();
  const { loginData } = useAuth();
const [toggled, setToggled] = useState(false);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }
  return (
  <div className="bg-[#0E382F] h-full min-h-screen flex flex-col">
<button  className="fixed top-4 left-4 z-[9999] bg-[#ef9b28] p-3 rounded-lg text-white md:hidden"
  onClick={() => setToggled(true)}>
☰
</button>
   <Sidebar
  collapsed={isCollapsed}
  toggled={toggled}
  onBackdropClick={() => setToggled(false)}
  breakPoint="md"
  backgroundColor="#0E382F"
  rootStyles={{
    border: "none",
    height: "100vh",
  }}
>
      
      {/* Collapse Button */}
      <div className="hidden md:block relative">

        <button
          onClick={() => toggleCollapse()}
          className="
            absolute 
            -right-1 
            top-3 
            z-50 
            flex 
            h-12 
            w-8
            sm:h-16 
            sm:w-10 
            items-center 
            justify-center 
            bg-[#ef9b28] 
            text-white 
            shadow-md 
            transition-all 
            duration-300 
            hover:bg-[#d8871e]
          "
          style={{
            borderTopLeftRadius: "16px",
            borderBottomLeftRadius: "16px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`
              h-5 
              w-5 
              sm:h-7 
              sm:w-7 
              transition-transform 
              duration-300 
              ${isCollapsed ? "rotate-180" : ""}
            `}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      </div>

      {/* Menu */}
      <Menu
        className="bg-[#0E382F] text-white pt-16 sm:pt-20"
        menuItemStyles={{
          button: ({ active }) => ({
            backgroundColor: active ? "#0A2922" : "transparent",
            color: active ? "#ef9b28" : "#ffffff",
            borderRadius: "10px",
            margin: "4px 8px",
            padding: "10px 12px",
            fontSize: window.innerWidth < 640 ? "14px" : "16px",

            "&:hover": {
              backgroundColor: "#0A2922",
              color: "#ef9b28",
            },

            transition: "all 0.2s ease",
          }),

          icon: ({ active }) => ({
            color: active ? "#ef9b28" : "inherit",

            "&:hover": {
              color: "#ef9b28",
            },
          }),
        }}
      >

        {/* Manager */}
        {loginData?.userGroup === "Manager" ? (
          <>
            <MenuItem
              active={location.pathname === "/dashboard"}
              icon={
                <LuLayoutDashboard className="text-lg sm:text-xl transition-colors" />
              }
              component={<Link to="/dashboard" />}
            >
              Home
            </MenuItem>

            <MenuItem
              active={location.pathname === "/dashboard/user-list"}
              icon={
                <LuUsers className="text-lg sm:text-xl transition-colors" />
              }
              component={<Link to="/dashboard/user-list" />}
            >
              Users
            </MenuItem>

            <MenuItem
              active={location.pathname === "/dashboard/project-list"}
              icon={
                <LuFolderHeart className="text-lg sm:text-xl transition-colors" />
              }
              component={<Link to="/dashboard/project-list" />}
            >
              Projects
            </MenuItem>

            <MenuItem
              active={location.pathname === "/dashboard/task-list"}
              icon={
                <HiOutlineClipboardList className="text-lg sm:text-xl transition-colors" />
              }
              component={<Link to="/dashboard/task-list" />}
            >
              Tasks
            </MenuItem>
          </>
        ) : (
          <>
            {/* Employee */}
            <MenuItem
              active={location.pathname === "/dashboard"}
              icon={
                <LuLayoutDashboard className="text-lg sm:text-xl transition-colors" />
              }
              component={<Link to="/dashboard" />}
            >
              Home
            </MenuItem>

            <MenuItem
              active={location.pathname === "/dashboard/project-list"}
              icon={
                <LuFolderHeart className="text-lg sm:text-xl transition-colors" />
              }
              component={<Link to="/dashboard/project-list" />}
            >
              Projects
            </MenuItem>

            <MenuItem
              active={location.pathname === "/dashboard/task-list"}
              icon={
                <HiOutlineClipboardList className="text-lg sm:text-xl transition-colors" />
              }
              component={<Link to="/dashboard/task-list" />}
            >
              Tasks
            </MenuItem>
          </>
        )}
      </Menu>
    </Sidebar>
  </div>
);
}
