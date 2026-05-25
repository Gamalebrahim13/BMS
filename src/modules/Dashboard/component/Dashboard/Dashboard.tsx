import { useEffect, useState } from "react";
import { GetTasksCount, type TaskCountResponse } from "../../../../api/module/task";
import headerBg from "../../../../assets/images/dashboard-header-bg.png"
import { useAuth } from "../../../../context/AuthContext";
import TaskDonutChart from "../DashboardCharts/DashboardCharts";
import { GetProjects } from "../../../../api/module/project";
import { GetUsersCount, type UserCountResponse } from "../../../../api/module/user";
import { toast } from "react-toastify";


export default function Dashboard() {
  const { loginData } = useAuth();
  const [taskCounts, setTaskCounts] = useState<TaskCountResponse | null>(null);
  const [totalProjects, setTotalProjects] = useState<number>(0);
  const [userCounts, setUserCounts] = useState<UserCountResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
const fetchDashboardData = async () => {
  if (!loginData?.userGroup) return;

  try {
    setLoading(true);

    if (loginData.userGroup === "Employee") {
      const tasksCountData = await GetTasksCount();

      setTaskCounts(tasksCountData);
      setTotalProjects(0);
      setUserCounts(null);

    } else {
      const [tasksCountData, projectsData, usersData] =
        await Promise.all([
          GetTasksCount(),
          GetProjects({ pageNumber: 1, pageSize: 10 }),
          GetUsersCount(),
        ]);

      setTaskCounts(tasksCountData);
      setTotalProjects(
        projectsData?.totalNumberOfRecords || 0
      );
      setUserCounts(usersData);
    }

  }catch (error: any) {
    console.log(error);

    const errorMessage =
      error?.response?.data?.message ||
      "Something went wrong while fetching data!";

    toast.error(errorMessage);

  } finally {
    setLoading(false);
  }
};
  const totalTasks = taskCounts ? (taskCounts.toDo + taskCounts.inProgress + taskCounts.done) : 0;
  const progressValue = taskCounts ? taskCounts.done : 0;
 useEffect(() => {
  if (loginData?.userGroup) {
    fetchDashboardData();
  }
}, [loginData]);
 return (
  <>
    <div className="px-3 sm:px-5 pb-8 mt-5">
      
      {/* Header */}
      <div className="relative w-full h-[220px] sm:h-[260px] lg:h-[320px] rounded-2xl overflow-hidden mb-6">
        <img
          src={headerBg}
          alt="Header"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex items-center">
          <div className="px-4 sm:px-8 lg:pl-10 text-white max-w-xl">
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 break-words">
              Welcome {loginData?.userName}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed">
              You can add project and assign tasks to your team.
            </p>

          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div
        className={`
          grid 
          grid-cols-1 
          gap-6 
          px-1 sm:px-3 lg:px-5
          ${
            loginData?.userGroup === "Manager"
              ? "xl:grid-cols-2"
              : "grid-cols-1"
          }
        `}
      >

        {/* Tasks Section */}
        <div className="p-4 sm:p-6 rounded-3xl">

          {/* Title */}
          <div className="flex items-start gap-3 mb-6 relative pl-3">
            <div className="absolute left-0 top-0 w-[4px] h-full bg-[#FF9F43] rounded-full"></div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#1F2937]">
                Tasks
              </h2>

              <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                Lorem ipsum dolor sit amet, consecteture
              </p>
            </div>
          </div>

          {/* Content */}
          <div
            className={`
              flex flex-col
              ${
                loginData?.userGroup === "Employee"
                  ? "xl:flex-row xl:items-center xl:justify-between gap-8"
                  : ""
              }
            `}
          >

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 flex-1">

              {/* Progress */}
              <div className="bg-[#EBEAF8] p-5 rounded-2xl flex flex-col justify-between min-h-[140px]">
                
                <div className="bg-[#D1CFF3] w-11 h-11 rounded-2xl flex items-center justify-center text-[#5F51E8]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                </div>

                <div>
                  <p className="text-[#6F7881] font-medium text-sm">
                    Progress
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-1 break-words">
                    {loading ? "..." : `$ ${progressValue}`}
                  </h3>
                </div>
              </div>

              {/* Tasks */}
              <div className="bg-[#F7F9D5]/60 p-5 rounded-2xl flex flex-col justify-between min-h-[140px]">
                
                <div className="bg-[#E9ECAC] w-11 h-11 rounded-2xl flex items-center justify-center text-[#7A7E26]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>

                <div>
                  <p className="text-gray-500 font-medium text-sm">
                    Tasks Number
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {loading ? "..." : totalTasks}
                  </h3>
                </div>
              </div>

              {/* Projects */}
              <div className="bg-[#FCE5EE] p-5 rounded-2xl flex flex-col justify-between min-h-[140px]">
                
                <div className="bg-[#F9C3D6] w-11 h-11 rounded-2xl flex items-center justify-center text-[#D81B60]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2" />
                  </svg>
                </div>

                <div>
                  <p className="text-gray-500 font-medium text-sm">
                    Projects Number
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {loading ? "..." : totalProjects}
                  </h3>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="flex justify-center items-center">
              <TaskDonutChart
                series={[
                  taskCounts?.inProgress || 0,
                  totalTasks || 0,
                  totalProjects || 0,
                ]}
                labels={[
                  "In Progress",
                  "totalTasks",
                  "totalProjects",
                ]}
                colors={["#7bc4ff", "#81e0a6", "#ffd66b"]}
              />
            </div>
          </div>
        </div>

        {/* Users Section */}
        {loginData?.userGroup === "Manager" && (
          <div className="p-4 sm:p-6 rounded-3xl">

            {/* Title */}
            <div className="flex items-start gap-3 mb-6 relative pl-3">
              <div className="absolute left-0 top-0 w-[4px] h-full bg-[#FF9F43] rounded-full"></div>

              <div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1F2937]">
                  Users
                </h2>

                <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                  Lorem ipsum dolor sit amet, consecteture
                </p>
              </div>
            </div>

            {/* User Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">

              {/* Active */}
              <div className="bg-[#EBEAF8] p-5 rounded-2xl flex flex-col justify-between min-h-[140px]">
                
                <div className="bg-[#D1CFF3] w-11 h-11 rounded-2xl flex items-center justify-center text-[#5F51E8]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>

                <div>
                  <p className="text-gray-500 font-medium text-sm">
                    Active
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {loading
                      ? "..."
                      : userCounts?.activatedEmployeeCount || 0}
                  </h3>
                </div>
              </div>

              {/* Inactive */}
              <div className="bg-[#F7F9D5]/60 p-5 rounded-2xl flex flex-col justify-between min-h-[140px]">
                
                <div className="bg-[#E9ECAC] w-11 h-11 rounded-2xl flex items-center justify-center text-[#7A7E26]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>

                <div>
                  <p className="text-gray-500 font-medium text-sm">
                    Inactive
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {loading
                      ? "..."
                      : userCounts?.deactivatedEmployeeCount || 0}
                  </h3>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="flex justify-center">
              <TaskDonutChart
                series={[
                  userCounts?.activatedEmployeeCount || 0,
                  userCounts?.deactivatedEmployeeCount || 0,
                ]}
                labels={["Active", "Inactive"]}
                colors={["#7bc4ff", "#ffd66b"]}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  </>
);
}
