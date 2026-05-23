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
  MdVerified,
} from "react-icons/md";

import { toast } from "react-toastify";
import NoData from "../../../Shared/Components/NoData/NotData";
import Pagination from "../../../Shared/Components/Pagination/Pagination";
import Filter from "../../../Shared/Components/Filter/Filter";

import {
  GetProjects,
  DeleteProject,
  GetProjectById,
} from "../../../../api/module/project";

import { FaUser } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { GrStatusGood } from "react-icons/gr";

export default function ProjectList() {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [projectsList, setProjectsList] = useState<any>(null);

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );

  const [selectedProject, setSelectedProject] = useState<any>(null);

  const [openModal, setOpenModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  // ================= Get Projects =================

  const getProjectsList = async () => {
    try {
      const response = await GetProjects({
        pageNumber: currentPage,
        pageSize: pageSize,
        title: debouncedSearch,
      });

      

      setProjectsList(response);
    } catch (error: any) {
      console.log("Get Projects Error:", error);

      toast.error(
        error?.response?.data?.message || "Failed to fetch projects"
      );
    }
  };

  // ================= Delete Project =================

  const handleDeleteProject = async () => {
    try {
      await DeleteProject(selectedProjectId!);

      toast.success("Project deleted successfully");

      setOpenModal(false);

      getProjectsList();
    } catch (error: any) {
      console.log("Delete Error:", error);

      toast.error(
        error?.response?.data?.message || "Failed to delete project"
      );
    }
  };

  // ================= View Project =================

  const getProject = async (id: number) => {
    try {
      const response = await GetProjectById(id);

      // console.log("Single Project Response:", response);

      setSelectedProject(response);
      setOpenViewModal(true);
    } catch (error: any) {
      console.log("Get Project Error:", error);

      toast.error(
        error?.response?.data?.message || "Unable to fetch data from API"
      );
    }
  };

  // ================= useEffect =================

  useEffect(() => {
    getProjectsList();
  }, [currentPage, pageSize, debouncedSearch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  return (
    <>
      <CrudHeader
        title="Projects"
        buttonText="Add New Project"
        onButtonClick={() => navigate("/dashboard/project-data")}
      />

      {/* Delete Modal */}

      <Modal
        show={openModal}
        size="lg"
        popup
        onClose={() => setOpenModal(false)}
      >
        <ModalBody className="bg-white text-gray-900 rounded-lg p-6 shadow-lg">
          <div className="mb-4">
            <div className="text-center py-6">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-secondary" />

              <h3 className="mb-3 text-xl font-medium text-gray-900">
                Are you sure you want to delete this project?
              </h3>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <button
                className="bg-gray-200 border border-secondary text-gray-900 px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-300 transition-colors"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>

              <button
                className="bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-red-700 transition-colors"
                onClick={handleDeleteProject}
              >
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
  onClose={() => setOpenViewModal(false)}
>
  <ModalBody className="bg-white rounded-xl p-8">

    {/* Title */}
    <h2 className="text-2xl font-bold text-[#315951] mb-8 border-b pb-4">
      Project Details
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative">

      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-100 -translate-x-1/2"></div>

      {/* LEFT SIDE */}
      <div className="space-y-5">

        <div className="flex items-center gap-3">
          <MdEditSquare size={18} className="text-[#315951]" />
          <p className="text-sm">
            <span className="font-semibold text-gray-700">Title:</span>{" "}
            <span className="text-[#315951] font-bold">
              {selectedProject?.title || "-"}
            </span>
          </p>
        </div>

        <div className="flex items-start gap-3">
          <MdDescription size={18} className="text-[#315951]" />
          <p className="text-sm">
            <span className="font-semibold text-gray-700">Description:</span>{" "}
            <span className="text-[#315951] font-bold">
              {selectedProject?.description || "-"}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <MdDateRange size={18} className="text-[#315951]" />
          <p className="text-sm">
            <span className="font-semibold text-gray-700">Created:</span>{" "}
            <span className="text-[#315951] font-bold">
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
          <FaUser size={16} className="text-[#315951]" />
          <p className="text-sm">
            <span className="font-semibold text-gray-700">Project ID:</span>{" "}
            <span className="text-[#315951] font-bold">
              {selectedProject?.id || "-"}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <MdEmail size={16} className="text-[#315951]" />
          <p className="text-sm">
            <span className="font-semibold text-gray-700">Modified Date:</span>{" "}
            <span className="text-[#315951] font-bold">
              {selectedProject?.modificationDate
                ? new Date(selectedProject.modificationDate).toLocaleDateString("en-GB")
                : "-"}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <FaEarthAmericas size={16} className="text-[#315951]" />
          <p className="text-sm">
            <span className="font-semibold text-gray-700">Tasks:</span>{" "}
            <span className="text-[#315951] font-bold">
              {selectedProject?.task?.length ?? 0}
            </span>
          </p>
        </div>

      </div>

    </div>

    {/* Footer */}
    <div className="mt-10 pt-6 border-t flex justify-end">
      <button
        onClick={() => setOpenViewModal(false)}
        className="px-6 py-2 bg-[#315951] text-white rounded-lg font-medium hover:bg-[#25443d] transition-colors"
      >
        Close
      </button>
    </div>

  </ModalBody>
</Modal>

      {/* Table Wrapper */}

      <div className="overflow-x-auto shadow-md mx-10 rounded-lg bg-white">
        <div className="flex items-center gap-2">
          {/* Filteration */}

          <Filter
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            placeholder="Search By Title"
          />
        </div>

        {projectsList?.data?.length > 0 ? (
          <>
            <Table className="border-collapse rounded-0">
              <TableHead className="bg-[#315951E5] text-white">
                <TableRow>
                  <TableHeadCell className="border-r border-black/20">
                    <div className="flex items-center gap-2 cursor-pointer">
                      Title
                      <MdOutlineUnfoldMore size={20} />
                    </div>
                  </TableHeadCell>

                  <TableHeadCell className="border-r border-black/20">
                    <div className="flex items-center gap-2 cursor-pointer">
                      Status
                      <MdOutlineUnfoldMore size={20} />
                    </div>
                  </TableHeadCell>

                  <TableHeadCell className="border-r border-black/20">
                    <div className="flex items-center gap-2 cursor-pointer">
                      Num Users
                      <MdOutlineUnfoldMore size={20} />
                    </div>
                  </TableHeadCell>

                  <TableHeadCell className="border-r border-black/20">
                    <div className="flex items-center gap-2 cursor-pointer">
                      Num Tasks
                      <MdOutlineUnfoldMore size={20} />
                    </div>
                  </TableHeadCell>

                  <TableHeadCell className="border-r border-black/20">
                    <div className="flex items-center gap-2 cursor-pointer">
                      Date Created
                      <MdOutlineUnfoldMore size={20} />
                    </div>
                  </TableHeadCell>

                  <TableHeadCell></TableHeadCell>
                </TableRow>
              </TableHead>

              <TableBody className="divide-y-0">
                {projectsList?.data?.map((project: any) => (
                  <TableRow
                    key={project.id}
                    className="odd:bg-white even:bg-[#F5F5F5] border-none"
                  >
                    <TableCell>{project?.title || "-"}</TableCell>

                    <TableCell>{project?.status || "-"}</TableCell>

                    <TableCell>
                      {project?.usersCount ||
                        project?.numUsers ||
                        project?.employeeCount ||
                        0}
                    </TableCell>

                    <TableCell>
                     {project?.task?.length || 0}
                    </TableCell>

                    <TableCell>
                      {project?.creationDate
                        ? new Date(
                            project.creationDate
                          ).toLocaleDateString("en-GB")
                        : "-"}
                    </TableCell>

                    <TableCell className="relative">
                      <div className="flex justify-center relative">
                        <button
                          onClick={() => toggleMenu(project.id)}
                          className="text-[#315951E5]"
                        >
                          <BsThreeDotsVertical size={25} />
                        </button>

                        {openMenuId === project.id && (
                            <>
                            <div
                              className="fixed inset-0 z-[60] bg-transparent"
                              onClick={() => setOpenMenuId(null)}></div>

                            <div className="fixed right-20 bottom-30 mt-10 w-32 bg-[#3159517c] shadow-[0_10px_30px_rgba(0,0,0,0.2)] rounded-xl z-[9999] p-1.5 ">
                              <div className="flex flex-col gap-0.5">
                                {/* View */}
                                <button
                                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-green-50 transition-all group text-white"
                                  onClick={() => {
                                    getProject(project.id);
                                    // console.log(project);
                                    setOpenViewModal(true);
                                    setOpenMenuId(null);
                                  }}>
                                  <div className="p-1 bg-green-50 rounded-md group-hover:bg-green-100 transition-colors">
                                    <HiOutlineEye
                                      size={14}
                                      className="text-green-600"
                                    />
                                  </div>
                                  <span className="text-xs font-semibold text-gray-700 group-hover:text-green-600">
                                    View
                                  </span>
                                </button>

                                {/* Edit */}
                                <button
                                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-yellow-50 transition-all group text-white"
                                  onClick={() => {
                                    setOpenMenuId(null);
                                    navigate(`/dashboard/project-data/${project.id}`);
                                  }}>
                                  <div className="p-1 bg-yellow-50 rounded-md group-hover:bg-yellow-100 transition-colors">
                                    <HiOutlinePencilAlt
                                      size={14}
                                      className="text-yellow-500"
                                    />
                                  </div>
                                  <span className="text-xs font-semibold text-gray-700 group-hover:text-yellow-600">
                                    Edit
                                  </span>
                                </button>

                                {/* Delete */}
                                <button
                                  className="flex items-center gap-2 text-white px-2 py-1.5 rounded-lg hover:bg-red-50 transition-all group"
                                  onClick={() => {
                                    setSelectedProjectId(project.id);
                                    setOpenModal(true);
                                    setOpenMenuId(null);
                                  }}>
                                  <div className="p-1 bg-red-50 rounded-md group-hover:bg-red-100 transition-colors">
                                    <HiOutlineTrash
                                      size={14}
                                      className="text-red-600"
                                    />
                                  </div>

                                  <span className="text-xs font-semibold text-gray-700 group-hover:text-red-600">
                                    Delete
                                  </span>
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

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
          </>
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
}