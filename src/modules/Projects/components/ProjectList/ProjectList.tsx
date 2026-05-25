  import { useEffect, useState } from "react";
import CrudHeader from "../../../Shared/Components/CrudHeader/CrudHeader";
import { useNavigate } from "react-router-dom";
import { BsRadioactive, BsThreeDotsVertical } from "react-icons/bs";
import { Modal, ModalBody } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiOutlineEye,
} from "react-icons/hi";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

import {
  MdDateRange,
  MdDescription,
  MdEditSquare,
  MdEmail,
  MdOutlineUnfoldMore,
} from "react-icons/md";

import { toast } from "react-toastify";
import NoData from "../../../Shared/Components/NoData/NotData";
import Pagination from "../../../Shared/Components/Pagination/Pagination";
import Filter from "../../../Shared/Components/Filter/Filter";

import {
  GetProjects,
  DeleteProject,
  GetProjectById,
  GetProjectEmployee,
} from "../../../../api/module/project";

import { FaUser } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { useAuth } from "../../../../context/AuthContext";

export default function ProjectList() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const { loginData } = useAuth();
  const isManager = loginData?.userGroup === "Manager";

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [projectsList, setProjectsList] = useState<any>(null);

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null,
  );

  const [selectedProject, setSelectedProject] = useState<any>(null);

  const [openModal, setOpenModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const getProjectsList = async () => {
    if (!loginData?.userGroup) return;
    try {
      setIsLoading(true);

      const params = {
        pageNumber: currentPage,
        pageSize,
        title: debouncedSearch || undefined,
      };

      const response = isManager
        ? await GetProjects(params)
        : await GetProjectEmployee(params);
      console.log(response);
      setProjectsList(response);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch projects");
    } {
      setIsLoading(false);
    }
  };

  const handleDeleteProject = async () => {
    try {
      await DeleteProject(selectedProjectId!);
      toast.success("Project deleted successfully");
      setOpenModal(false);
      getProjectsList();
    } catch (error: any) {
      console.log("Delete Error:", error);
      toast.error(error?.response?.data?.message || "Failed to delete project");
    }
  };

  const getProject = async (id: number) => {
    try {
      const response = await GetProjectById(id);
      setSelectedProject(response);
      setOpenViewModal(true);
    } catch (error: any) {
      console.log("Get Project Error:", error);
      toast.error(
        error?.response?.data?.message || "Unable to fetch data from API",
      );
      setSelectedProject(null);
    }
  };

  useEffect(() => {
    if (!loginData?.userGroup) return;
    getProjectsList();
  }, [currentPage, pageSize, debouncedSearch, loginData?.userGroup]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchValue);
      setCurrentPage(1);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  return (
    <>
      <CrudHeader
        title="Projects"
        buttonText={isManager ? "Add New Project" : undefined}
        onButtonClick={
          isManager ? () => navigate("/dashboard/project-data") : undefined
        }
      />

      {/* Delete Modal */}
      <Modal
        show={openModal}
        size="lg"
        popup
        onClose={() => setOpenModal(false)}>
        {/* دعم الدارك مود لخلفية الـ Delete Modal */}
        <ModalBody className="bg-white dark:bg-[#161619] text-gray-900 dark:text-zinc-100 rounded-lg p-6 shadow-lg transition-colors duration-300">
          <div className="mb-4">
            <div className="text-center py-6">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-500 dark:text-red-400" />
              <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-zinc-200">
                Are you sure you want to delete this project?
              </h3>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <button
                className="bg-gray-200 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-zinc-300 px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-300 dark:hover:bg-zinc-700 transition-colors"
                onClick={() => setOpenModal(false)}>
                Cancel
              </button>

              <button
                className="bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-red-700 transition-colors"
                onClick={handleDeleteProject}>
                Delete
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {/* View Modal */}
      <Modal
        show={openViewModal}
        size="2xl"
        onClose={() => setOpenViewModal(false)}>
        {/* دعم الدارك مود لخلفية الـ View Modal */}
        <ModalBody className="bg-white dark:bg-[#161619] rounded-xl p-8 transition-colors duration-300">
          {/* Title */}
          <h2 className="text-2xl font-bold text-[#315951] dark:text-[#41756a] mb-8 border-b dark:border-zinc-800 pb-4">
            Project Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-100 dark:bg-zinc-800 -translate-x-1/2"></div>

            {/* LEFT SIDE */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <MdEditSquare size={18} className="text-[#315951] dark:text-[#41756a]" />
                <p className="text-sm text-gray-600 dark:text-zinc-300">
                  <span className="font-semibold text-gray-700 dark:text-zinc-400">Title:</span>{" "}
                  <span className="text-[#315951] dark:text-[#41756a] font-bold">
                    {selectedProject?.title || "-"}
                  </span>
                </p>
              </div>

              <div className="flex items-start gap-3">
                <MdDescription size={18} className="text-[#315951] dark:text-[#41756a]" />
                <p className="text-sm text-gray-600 dark:text-zinc-300">
                  <span className="font-semibold text-gray-700 dark:text-zinc-400">
                    Description:
                  </span>{" "}
                  <span className="text-[#315951] dark:text-[#41756a] font-bold break-words">
                    {selectedProject?.description || "-"}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <MdDateRange size={18} className="text-[#315951] dark:text-[#41756a]" />
                <p className="text-sm text-gray-600 dark:text-zinc-300">
                  <span className="font-semibold text-gray-700 dark:text-zinc-400">Created:</span>{" "}
                  <span className="text-[#315951] dark:text-[#41756a] font-bold">
                    {selectedProject?.creationDate
                      ? new Date(selectedProject.creationDate).toLocaleDateString("en-GB")
                      : "-"}
                  </span>
                </p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <FaUser size={16} className="text-[#315951] dark:text-[#41756a]" />
                <p className="text-sm text-gray-600 dark:text-zinc-300">
                  <span className="font-semibold text-gray-700 dark:text-zinc-400">
                    Project ID:
                  </span>{" "}
                  <span className="text-[#315951] dark:text-[#41756a] font-bold">
                    #{selectedProject?.id || "-"}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <MdEmail size={16} className="text-[#315951] dark:text-[#41756a]" />
                <p className="text-sm text-gray-600 dark:text-zinc-300">
                  <span className="font-semibold text-gray-700 dark:text-zinc-400">
                    Modified Date:
                  </span>{" "}
                  <span className="text-[#315951] dark:text-[#41756a] font-bold">
                    {selectedProject?.modificationDate
                      ? new Date(selectedProject.modificationDate).toLocaleDateString("en-GB")
                      : "-"}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <FaEarthAmericas size={16} className="text-[#315951] dark:text-[#41756a]" />
                <p className="text-sm text-gray-600 dark:text-zinc-300">
                  <span className="font-semibold text-gray-700 dark:text-zinc-400">Tasks:</span>{" "}
                  <span className="text-[#315951] dark:text-[#41756a] font-bold">
                    {selectedProject?.task?.length ?? 0}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t dark:border-zinc-800 flex justify-end">
            <button
              onClick={() => setOpenViewModal(false)}
              className="px-6 py-2 bg-[#315951] dark:bg-[#41756a] text-white rounded-lg font-medium hover:bg-[#25443d] dark:hover:bg-[#335c53] transition-colors">
              Close
            </button>
          </div>
        </ModalBody>
      </Modal>

      {/* Table Wrapper */}
      <div className="shadow-md mx-2 sm:mx-4 md:mx-8 lg:mx-10 rounded-lg bg-white dark:bg-[#111112] border border-transparent dark:border-zinc-900/50 transition-colors duration-300">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 dark:text-zinc-200 [&_input]:dark:bg-[#161619] [&_input]:dark:border-zinc-800 [&_input]:dark:text-zinc-100 [&_input]:dark:placeholder-zinc-500">
  <Filter
    searchValue={searchValue}
    setSearchValue={setSearchValue}
    placeholder="Search By Title"
  />
</div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="loader" />
          </div>
        ) : projectsList?.data?.length > 0 ? (
          <>
            <div className="max-h-[500px] overflow-y-auto">
              <Table className="min-w-[900px] border-collapse">
                <TableHead className="bg-[#315951E5] dark:bg-[#315951] text-white">
                  <TableRow className="border-none">
                    <TableHeadCell className="dark:bg-[#315951] dark:text-zinc-100 border-r border-black/10 dark:border-zinc-800">
                      <div className="flex items-center gap-2">
                        Title
                        <MdOutlineUnfoldMore size={20} />
                      </div>
                    </TableHeadCell>

                    <TableHeadCell className="dark:bg-[#315951] dark:text-zinc-100 border-r border-black/10 dark:border-zinc-800">
                      <div className="flex items-center gap-2 cursor-pointer">
                        {isManager ? "Status" : "Description"}
                        <MdOutlineUnfoldMore size={20} />
                      </div>
                    </TableHeadCell>

                    <TableHeadCell className="dark:bg-[#315951] dark:text-zinc-100 border-r border-black/10 dark:border-zinc-800">
                      <div className="flex items-center gap-2 cursor-pointer">
                        {isManager ? "Users" : "Modification Date"}
                        <MdOutlineUnfoldMore size={20} />
                      </div>
                    </TableHeadCell>

                    <TableHeadCell className="dark:bg-[#315951] dark:text-zinc-100 border-r border-black/10 dark:border-zinc-800">
                      <div className="flex items-center gap-2 cursor-pointer">
                        Tasks
                        <MdOutlineUnfoldMore size={20} />
                      </div>
                    </TableHeadCell>

                    <TableHeadCell className="dark:bg-[#315951] dark:text-zinc-100 border-r border-black/10 dark:border-zinc-800">
                      <div className="flex items-center gap-2 cursor-pointer">
                        Created Date
                        <MdOutlineUnfoldMore size={20} />
                      </div>
                    </TableHeadCell>

                    {isManager && (
                      <TableHeadCell className="dark:bg-[#315951] border-none"></TableHeadCell>
                    )}
                  </TableRow>
                </TableHead>
                
                {/* تعديل ألوان الـ Rows التبادلية في الدارك مود */}
                <TableBody className="divide-y-0">
                  {projectsList?.data?.map((project: any) => (
                    <TableRow
                      key={project.id}
                      className="odd:bg-white odd:dark:bg-[#111112] even:bg-[#F5F5F5] even:dark:bg-[#161619] border-none transition-colors duration-200">
                      
                      {/* TITLE */}
                      <TableCell className="whitespace-nowrap font-medium text-black dark:text-zinc-200">
                        {project.title || "-"}
                      </TableCell>

                      {/* STATUS / DESCRIPTION */}
                      <TableCell className="text-black dark:text-zinc-300">
                        {isManager
                          ? project.status || "-"
                          : project.description || "-"}
                      </TableCell>

                      {/* USERS / MODIFICATION DATE */}
                      <TableCell className="text-black dark:text-zinc-300">
                        {isManager
                          ? project.numUsers || 0
                          : project.modificationDate
                            ? new Date(project.modificationDate).toLocaleDateString("en-GB")
                            : "-"}
                      </TableCell>

                      {/* TASKS */}
                      <TableCell className="text-black dark:text-zinc-300">
                        {project?.task?.length || 0}
                      </TableCell>

                      {/* CREATED DATE */}
                      <TableCell className="text-black dark:text-zinc-300">
                        {project.creationDate
                          ? new Date(project.creationDate).toLocaleDateString("en-GB")
                          : "-"}
                      </TableCell>
                      
                      {isManager && (
                        <TableCell className="relative border-none text-lg">
                          <div className="flex justify-center">
                            <button
                              onClick={() => toggleMenu(project.id)}
                              className="text-[#315951E5] dark:text-[#41756a] hover:bg-gray-100 dark:hover:bg-zinc-800 p-1 rounded-full transition-colors">
                              <BsThreeDotsVertical size={25} />
                            </button>

                            {openMenuId === project.id && (
                              <>
                                <div
                                  className="fixed inset-0 z-[60] bg-transparent"
                                  onClick={() => setOpenMenuId(null)}></div>

                                {/* الـ Action Menu المنبثقة تم ضبط ألوانها بالكامل للايت والدارك مود */}
                                <div className="absolute right-6 top-12 w-32 bg-white dark:bg-[#1c332f] shadow-[0_4px_20px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] border dark:border-transparent rounded-xl z-[9999] p-1.5">
                                  <div className="flex flex-col gap-1">
                                    {/* View */}
                                    <button
                                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-green-50 dark:hover:bg-white/5 transition-all group"
                                      onClick={() => {
                                        getProject(project.id);
                                        setOpenViewModal(true);
                                        setOpenMenuId(null);
                                      }}>
                                      <div className="p-1 bg-green-50 dark:bg-zinc-800 rounded-md">
                                        <HiOutlineEye
                                          size={14}
                                          className="text-green-600 dark:text-green-400"
                                        />
                                      </div>
                                      <span className="text-xs font-semibold text-gray-700 dark:text-zinc-200">
                                        View
                                      </span>
                                    </button>

                                    {/* Edit */}
                                    <button
                                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-yellow-50 dark:hover:bg-white/5 transition-all group"
                                      onClick={() => {
                                        setOpenMenuId(null);
                                        navigate(`/dashboard/edit-task/${project.id}`);
                                      }}>
                                      <div className="p-1 bg-yellow-50 dark:bg-zinc-800 rounded-md">
                                        <HiOutlinePencilAlt
                                          size={14}
                                          className="text-yellow-500 dark:text-yellow-400"
                                        />
                                      </div>
                                      <span className="text-xs font-semibold text-gray-700 dark:text-zinc-200">
                                        Edit
                                      </span>
                                    </button>

                                    {/* Delete */}
                                    <button
                                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-white/5 transition-all group"
                                      onClick={() => {
                                        setSelectedProjectId(project.id);
                                        setOpenModal(true);
                                        setOpenMenuId(null);
                                      }}>
                                      <div className="p-1 bg-red-50 dark:bg-zinc-800 rounded-md">
                                        <HiOutlineTrash
                                          size={14}
                                          className="text-red-600 dark:text-red-400"
                                        />
                                      </div>
                                      <span className="text-xs font-semibold text-gray-700 dark:text-zinc-200">
                                        Delete
                                      </span>
                                    </button>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Wrapper */}
            <div className="p-3 sm:p-4 bg-white dark:bg-[#111112] rounded-b-lg transition-colors">
              <Pagination
                currentPage={projectsList?.pageNumber || 1}
                totalRecords={projectsList?.totalNumberOfRecords || 0}
                pageSize={projectsList?.pageSize || 10}
                onPageChange={(page) => setCurrentPage(page)}
                onPageSizeChange={(size) => {
                  setPageSize(size);
                  setCurrentPage(1);
                }}
              />
            </div>
          </>
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
}