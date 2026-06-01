import React, { useState } from 'react'
import { HiOutlineClipboardList } from 'react-icons/hi'
import { LuFolderHeart, LuLayoutDashboard, LuUsers } from 'react-icons/lu'
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext'
import { FiMenu } from 'react-icons/fi'

export default function SidBar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation();
  const { loginData } = useAuth();
  const [toggled, setToggled] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

return (
  <div className="bg-[#0E382F] dark:bg-[#161619] h-full min-h-screen flex flex-col transition-colors duration-300">
    
    {/* زر المنيو للموبايل */}
    <button  
      className="fixed top-4 left-4 z-[9999] bg-[#ef9b28] hover:bg-[#d8871e] p-3 rounded-lg text-white md:hidden transition-colors shadow-md flex items-center justify-center"
      onClick={() => setToggled(true)}
    >
      <FiMenu className="text-xl" />
    </button>

    <Sidebar
      collapsed={isCollapsed}
      toggled={toggled}
      onBackdropClick={() => setToggled(false)}
      breakPoint="md"
      backgroundColor="transparent" 
      rootStyles={{
        border: "none",
        height: "100vh",
        zIndex: 999,
        // الـ البلور هنا مركز على جسم المنيو نفسه فقط في الموبايل
        "& .ps-sidebar-container": {
          background: "rgba(14, 56, 47, 0.4) !important", 
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        },
        ".dark & .ps-sidebar-container": {
          background: "rgba(22, 22, 25, 0.5) !important", 
        },
        // الـ Backdrop الخلفية مفيهاش بلور، مجرد لون شفاف خفيف
        "& .ps-sidebar-backdrop": {
          backgroundColor: "rgba(0, 0, 0, 0.4) !important",
          backdropFilter: "none !important",
          WebkitBackdropFilter: "none !important",
        }
      }}
    >
      
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
            borderBottomRightRadius: "0px",
            borderTopRightRadius: "0px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 sm:h-7 sm:w-7 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      </div>

      {/* التعديل هنا: أضفنا onClick عشان يقفل المنيو علطول في الموبايل أول ما تضغط على أي لينك */}
      <Menu
        onClick={() => {
          if (window.innerWidth < 768) {
            setToggled(false);
          }
        }}
        className="bg-transparent text-white pt-16 sm:pt-20"
        menuItemStyles={{
          button: ({ active }) => {
            const isDarkMode = document.documentElement.classList.contains("dark");
            
            const activeBg = isDarkMode ? "#242529" : "#0A2922"; 
            const hoverBg = isDarkMode ? "#242529" : "#0A2922";

            return {
              backgroundColor: active ? activeBg : "transparent",
              color: active ? "#ef9b28" : "#ffffff",
              borderRadius: "10px",
              margin: "4px 8px",
              padding: "10px 12px",
              fontSize: window.innerWidth < 640 ? "14px" : "16px",

              "&:hover": {
                backgroundColor: hoverBg,
                color: "#ef9b28",
              },

              transition: "all 0.2s ease",
            };
          },

          icon: ({ active }) => ({
            color: active ? "#ef9b28" : "inherit",
            "&:hover": {
              color: "#ef9b28",
            },
          }),
        }}
      >

        {loginData?.userGroup === "Manager" ? (
          <>
            <MenuItem
              active={location.pathname === "/dashboard"}
              icon={<LuLayoutDashboard className="text-lg sm:text-xl transition-colors" />}
              component={<Link to="/dashboard" />}
            >
              Home
            </MenuItem>

            <MenuItem
              active={location.pathname === "/dashboard/user-list"}
              icon={<LuUsers className="text-lg sm:text-xl transition-colors" />}
              component={<Link to="/dashboard/user-list" />}
            >
              Users
            </MenuItem>

            <MenuItem
              active={location.pathname === "/dashboard/project-list"}
              icon={<LuFolderHeart className="text-lg sm:text-xl transition-colors" />}
              component={<Link to="/dashboard/project-list" />}
            >
              Projects
            </MenuItem>

            <MenuItem
              active={location.pathname === "/dashboard/task-list"}
              icon={<HiOutlineClipboardList className="text-lg sm:text-xl transition-colors" />}
              component={<Link to="/dashboard/task-list" />}
            >
              Tasks
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              active={location.pathname === "/dashboard"}
              icon={<LuLayoutDashboard className="text-lg sm:text-xl transition-colors" />}
              component={<Link to="/dashboard" />}
            >
              Home
            </MenuItem>

            <MenuItem
              active={location.pathname === "/dashboard/project-list"}
              icon={<LuFolderHeart className="text-lg sm:text-xl transition-colors" />}
              component={<Link to="/dashboard/project-list" />}
            >
              Projects
            </MenuItem>

            <MenuItem
              active={location.pathname === "/dashboard/task-list"}
              icon={<HiOutlineClipboardList className="text-lg sm:text-xl transition-colors" />}
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