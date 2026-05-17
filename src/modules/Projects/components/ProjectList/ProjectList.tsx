import { useEffect, useState } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { DeleteProject, GetProjects } from "../../../../api/module/project";
import { getProjectStatus } from "../../../../api/utils/projectStatus";
import { useNavigate } from "react-router-dom";
export default function ProjectList() {

    const navigation = useNavigate();
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
   const [projects, setProjects] = useState<any[]>([]);
  const getProjectsData = async () => {
  try {
    const response = await GetProjects({
      pageNumber: 1,
      pageSize: 10,
    });

    console.log(response.data);

    setProjects(response.data);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  getProjectsData();
}, []);
  
useEffect(() => {
  const handleClickOutside = () => {
    setOpenMenuId(null);
  };

  document.addEventListener("click", handleClickOutside);

  return () => {
    document.removeEventListener("click", handleClickOutside);
  };
}, []);


const toggleMenu = (id: number) => {
  setOpenMenuId(openMenuId === id ? null : id);
};
const handleDelete = async (id: number) => {
  alert(" delete")
  await DeleteProject(id);
  getProjectsData(); // refresh
};


  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      {/* Search */}
      <div className="p-4">
        <div className="relative w-[250px]">
          <IoSearchOutline className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 text-lg" />

          <input
            type="text"
            placeholder="Search By Title"
            className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-4 outline-none focus:border-[#315951]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#315951] text-white">
            <tr>
              <th className="py-4 px-5 text-left font-medium">Title</th>
              <th className="py-4 px-5 text-left font-medium">Status</th>
              <th className="py-4 px-5 text-left font-medium">Num Users</th>
              <th className="py-4 px-5 text-left font-medium">Num Tasks</th>
              <th className="py-4 px-5 text-left font-medium">
                Date Created
              </th>
              <th className="py-4 px-5"></th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project, index) => (
              <tr
                key={project.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-[#F9F9F9]" : "bg-white"
                }`}
              >
                <td className="py-4 px-5 text-gray-700">
                  {project.title}
                </td>

                <td className="py-4 px-5">
                  <span className="bg-[#315951] text-white text-sm px-4 py-1 rounded-full">
                    {getProjectStatus(project.task)}
                  </span>
                </td>

                <td className="py-4 px-5 text-gray-600">
                  {project.users}
                </td>

                <td className="py-4 px-5 text-gray-600">
                 {project.task?.length || 0}
                </td>

                <td className="py-4 px-5 text-gray-600">
                  {new Date(project.creationDate).toLocaleDateString()}
                </td>

                <td className="py-4 px-5 text-center relative">
                                      <div className="relative flex justify-center">
                    <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMenu(project.id);
                    }}
                    className="text-[#315951] text-lg"
                  >
                    <FaEllipsisVertical />
                  </button>

                      {openMenuId === project.id && (
                        <div className="absolute right-0 top-6 bg-white shadow-lg rounded-lg w-32 z-50 border">
                          
                          <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full text-sm">
                            👁 View
                          </button>

                          <button onClick={() => navigation("/dashboard/project-data")} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full text-sm">
                            ✏️ Edit
                          </button>

                          <button onClick={() => handleDelete(project.id)} className="flex items-center gap-2 px-3 py-2 hover:bg-red-100 text-red-600 w-full text-sm">
                            🗑 Delete
                          </button>

                        </div>
                      )}
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-5 text-sm text-gray-500">
        <div>
          Showing
          <span className="mx-2 border px-3 py-1 rounded-full">10</span>
          of 102 Results
        </div>

        <div className="flex items-center gap-5">
          <span>Page 1 of 10</span>

          <div className="flex items-center gap-3 text-xl">
            <button>{`<`}</button>
            <button>{`>`}</button>
          </div>
        </div>
      </div>
    </div>
  );
}