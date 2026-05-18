import { useEffect, useState } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { DeleteProject, GetProjects } from "../../../../api/module/project";
import { getProjectStatus } from "../../../../api/utils/projectStatus";
import { useNavigate } from "react-router-dom";
import CrudHeader from "../../../Shared/Components/Header/Header";
import  { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell } from "flowbite-react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { HiOutlineEye, HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import  { MdOutlineUnfoldMore } from "react-icons/md";
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

      <>
     <CrudHeader
            title="Projects"
            buttonText="Add New Project"
            onButtonClick={() => navigation("/dashboard/project-data")}
          />

             <div className="overflow-x-auto shadow-md mx-10  bg-white">
                    <div className="m-4 relative w-64">
                      <input
                        placeholder="Search By Fleets"
                        className="w-full bg-transparent rounded-full border border-[#26385A40] px-10 py-1 pr-10 outline-none placeholder:text-[#AAAAAA]"
                      />
            
                      <FiSearch
                        size={18}
                        className="absolute left-3 top-1/2    -translate-y-1/2 text-gray-500"
                      />
                    </div>
                    <Table className="border-collapse rounded-0      ">
                      <TableHead className="bg-[#315951E5] text-white ">
                        <TableHeadCell className="border-r border-black/20  ">
                          <div className="flex items-center gap-2 cursor-pointer px-3 py-1 ">
                            Title
                            <MdOutlineUnfoldMore size={20} />
                          </div>
                        </TableHeadCell>
            
                        <TableHeadCell className="border-r border-black/20 ">
                          <div className="flex items-center gap-2 cursor-pointer px-3 py-1">
                            Status
                            <MdOutlineUnfoldMore size={20} />
                          </div>
                        </TableHeadCell>
            
                        <TableHeadCell className="border-r border-black/20 ">
                          <div className="flex items-center gap-2 cursor-pointer px-3 py-1">
                           Num Users
                            <MdOutlineUnfoldMore size={20} />
                          </div>
                        </TableHeadCell>
            
                        <TableHeadCell className="border-r border-black/20 ">
                          <div className="flex items-center gap-2 cursor-pointer px-3 py-1">
                            Num tasks
                            <MdOutlineUnfoldMore size={20} />
                          </div>
                        </TableHeadCell>
            
                        <TableHeadCell className="border-r  border-black/20  px-3 py-1">
                          <div className="flex items-center gap-2 cursor-pointer">
                            Date Created
                            <MdOutlineUnfoldMore size={20} />
                          </div>
                        </TableHeadCell>
            
                        <TableHeadCell>
                          <span className="sr-only">Edit</span>
                        </TableHeadCell>
                      </TableHead>
                      <TableBody className="divide-y-0">
                        {projects?.map((project) => ( 


                          <TableRow
                            key={project.id}
                            className="odd:bg-white even:bg-[#F5F5F5] border-none">
                            <TableCell className="whitespace-nowrap font-medium text-black border-none">
                              {project.title}
                            </TableCell>
            
                            <TableCell className="text-black border-none">
                              {getProjectStatus(project.task)}
                            </TableCell>
            
                            <TableCell className="text-black border-none">
                             
                            </TableCell>
            
                            <TableCell className="text-black border-none">
                              {project.task?.length || 0}
                            </TableCell>
            
                            <TableCell className="text-black border-none">
                              {new Date(project.creationDate).toLocaleDateString()}
                            </TableCell>
            
                            <TableCell className="relative border-none">
                              <div className="flex justify-center">
                               <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleMenu(project.id);
                                }}
                                className="text-[#315951E5] hover:bg-gray-100 p-1 rounded-full transition-colors"
                              >
                                <BsThreeDotsVertical size={25} />
                              </button>
            
                                {openMenuId === project.id && (
                                  <>
                                    <div
                                      className="fixed inset-0 z-10"
                                      onClick={() => setOpenMenuId(null)}></div>
            
                                    <div className="absolute right-0 mt-8 w-32 bg-white border border-gray-200 shadow-lg rounded-md z-20 py-2">
                                      <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <HiOutlineEye className="text-blue-500" />
                                      </button>
                                      <button 
                                       onClick={() =>
                                       {
                                        
                                        navigation(`/dashboard/project-data/${project.id}`)
                                       }
  
}
                                          className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <HiOutlinePencilAlt className="text-green-500" />
                                      </button>
                                      <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                        <HiOutlineTrash />
                                      </button>
                                    </div>
                                  </>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
     
    </>
  );
}






