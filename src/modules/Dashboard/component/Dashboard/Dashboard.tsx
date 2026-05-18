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
    try {
      setLoading(true);
      const [tasksCountData, projectsData, usersData] = await Promise.all([
        GetTasksCount(),
        GetProjects({ pageNumber: 1, pageSize: 10 }),
        GetUsersCount()
      ]);

      setTaskCounts(tasksCountData);
      setTotalProjects(projectsData?.totalNumberOfRecords || 0);
      setUserCounts(usersData);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Something went wrong while fetching data!";
  toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const totalTasks = taskCounts ? (taskCounts.toDo + taskCounts.inProgress + taskCounts.done) : 0;
  const progressValue = taskCounts ? taskCounts.done : 0;
  useEffect(() => {
    fetchDashboardData()
  }, [])
  return (
    <>
      <div className="px-5 pb-8">
        <div className="relative w-full h-[320px] rounded-2xl overflow-hidden mb-6">
          <img
            src={headerBg}
            alt="Header"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center">
            <div className="pl-10 text-white max-w-xl">
              <h1 className="text-4xl font-bold mb-3">
                Welcome {loginData?.userName}
              </h1>
              <p className="text-lg text-gray-200">
                You can add project and assign tasks to your team.
              </p>
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-5">
          <div className="bg-white p-6 rounded-3xl">
            <div className="flex items-start gap-3 mb-6 relative pl-3">
              <div className="absolute left-0 top-0 w-[4px] h-full bg-[#FF9F43] rounded-full"></div>
              <div>
                <h2 className="text-xl font-bold text-[#1F2937]">Tasks</h2>
                <p className="text-sm text-gray-400 mt-0.5">Lorem ipsum dolor sit amet,consecteture</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-[#EBEAF8] p-5 rounded-2xl flex flex-col justify-between min-h-[140px]">
                <div className="bg-[#D1CFF3] w-11 h-11 rounded-2xl flex items-center justify-center text-[#5F51E8]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#6F7881] font-medium text-sm">Progress</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {loading ? "..." : `$  ${progressValue}`}
                  </h3>
                </div>
              </div>

              <div className="bg-[#F7F9D5]/60 p-5 rounded-2xl flex flex-col justify-between min-h-[140px]">
                <div className="bg-[#E9ECAC] w-11 h-11 rounded-2xl flex items-center justify-center text-[#7A7E26]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 font-medium text-sm">Tasks Number</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {loading ? "..." : totalTasks}
                  </h3>
                </div>
              </div>

              <div className="bg-[#FCE5EE] p-5 rounded-2xl flex flex-col justify-between min-h-[140px]">
                <div className="bg-[#F9C3D6] w-11 h-11 rounded-2xl flex items-center justify-center text-[#D81B60]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 font-medium text-sm">Projects Number</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {loading ? "..." : totalProjects}
                  </h3>
                </div>
              </div>
            </div>
            <TaskDonutChart
              series={[taskCounts?.inProgress || 0, totalTasks || 0, totalProjects || 0]}
              labels={["In Progress", "totalTasks", "totalProjects"]}
              colors={["#7bc4ff", "#81e0a6", "#ffd66b"]}
            />
          </div>


          <div className="bg-white p-6 rounded-3xl">

            <div className="flex items-start gap-3 mb-6 relative pl-3">
              <div className="absolute left-0 top-0 w-[4px] h-full bg-[#FF9F43] rounded-full"></div>
              <div>
                <h2 className="text-xl font-bold text-[#1F2937]">Users</h2>
                <p className="text-sm text-gray-400 mt-0.5">Lorem ipsum dolor sit amet,consecteture</p>
              </div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-[#EBEAF8] p-5 rounded-2xl flex flex-col justify-between min-h-[140px]">
                <div className="bg-[#D1CFF3] w-11 h-11 rounded-2xl flex items-center justify-center text-[#5F51E8]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 font-medium text-sm">active</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {loading ? "..." : `$ ${userCounts?.activatedEmployeeCount || 0}`}
                  </h3>
                </div>
              </div>

              <div className="bg-[#F7F9D5]/60 p-5 rounded-2xl flex flex-col justify-between min-h-[140px]">
                <div className="bg-[#E9ECAC] w-11 h-11 rounded-2xl flex items-center justify-center text-[#7A7E26]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 font-medium text-sm">inactive</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {loading ? "..." : userCounts?.deactivatedEmployeeCount || 0} </h3>
                </div>
              </div>
            </div>

            <TaskDonutChart
              series={[userCounts?.activatedEmployeeCount || 0, userCounts?.deactivatedEmployeeCount || 0]}
              labels={["Active", "Inactive"]}
              colors={["#7bc4ff", "#ffd66b"]}
            />
          </div>

        </div>
      </div>
    </>
  )
}
