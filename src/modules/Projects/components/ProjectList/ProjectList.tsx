import { useEffect, useState } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { IoFilterSharp, IoSearchOutline } from "react-icons/io5";
import { DeleteProject, GetProjects } from "../../../../api/module/project";
import { getProjectStatus } from "../../../../api/utils/projectStatus";
import { useNavigate } from "react-router-dom";
import CrudHeader from "../../../Shared/Components/CrudHeader/CrudHeader";
import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalBody,
} from "flowbite-react";

import { BsThreeDotsVertical } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import {
  HiOutlineEye,
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiOutlineExclamationCircle,
} from "react-icons/hi";

import { MdOutlineUnfoldMore } from "react-icons/md";

export default function ProjectList() {
  const navigation = useNavigate();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [projects, setProjects] = useState<any[]>([]);

  const handleViewProject = (project: any) => {
    setSelectedProject(project);
    setOpenViewModal(true);
  };

  const getProjectsData = async () => {
    try {
      const response = await GetProjects({
        pageNumber: 1,
        pageSize: 10,
      });
  console.log(response)
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

  return (
    <>
      <CrudHeader
        title="Projects"
        buttonText="Add New Project"
        onButtonClick={() => navigation("/dashboard/project-data")}
      />

      {/* Delete Modal */}
      <Modal
        show={openDeleteModal}
        size="lg"
        popup
        onClose={() => setOpenDeleteModal(false)}
      >
        <ModalBody className="bg-white text-gray-900 rounded-lg p-6 shadow-lg">
          <div className="text-center py-6">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-secondary" />

            <h3 className="mb-3 text-xl font-medium">
              Are you sure you want to delete this project?
            </h3>

            <div className="flex justify-center gap-4">
              <button
                className="bg-gray-200 px-6 py-2.5 rounded-xl"
                onClick={() => setOpenDeleteModal(false)}
              >
                Cancel
              </button>

              <button
                className="bg-red-600 text-white px-6 py-2.5 rounded-xl"
                onClick={async () => {
                  if (!selectedProjectId) return;
                  await DeleteProject(selectedProjectId);
                  setOpenDeleteModal(false);
                  getProjectsData();
                }}
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
    <h2 className="text-2xl font-bold text-[#315951] mb-6 border-b pb-3">
      Project Details
    </h2>

    {/* TWO COLUMNS (3 + 3) */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative">

      {/* LEFT SIDE */}
      <div className="space-y-4">
        <p>
          <b>Title:</b> {selectedProject?.title}
        </p>

        <p>
          <b>Status:</b>{" "}
          {getProjectStatus(selectedProject?.task)}
        </p>

        <p>
          <b>Tasks:</b> {selectedProject?.task?.length || 0}
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="space-y-4">
        <p>
          <b>Date:</b>{" "}
          {selectedProject?.creationDate
            ? new Date(selectedProject.creationDate).toLocaleDateString()
            : "-"}
        </p>

        <p>
          <b>ID:</b> {selectedProject?.id}
        </p>

        <p>
          <b>Description:</b> {selectedProject?.description || "-"}
        </p>
      </div>

      {/* divider line */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-200 -translate-x-1/2"></div>
    </div>

    <div className="mt-6 flex justify-end">
      <button
        onClick={() => setOpenViewModal(false)}
        className="px-6 py-2 bg-[#315951] text-white rounded-lg"
      >
        Close
      </button>
    </div>
  </ModalBody>
</Modal>

      {/* Table */}
      <div className="overflow-x-auto shadow-md mx-10 bg-white">
        <div className="flex items-center gap-2">
          {/* Filteration */}
          <div className="m-4 relative w-64">
            <input
              placeholder="Search By Fleets"
              className="w-full bg-transparent rounded-full border border-[#26385A40] px-10 py-2  pr-10 outline-none placeholder:text-[#AAAAAA]"
            />
            <FiSearch
              size={18}
              className="absolute left-3 top-1/2    -translate-y-1/2 text-gray-500"
            />
          </div>
          <button className="bg-transparent rounded-full px-6 py-2 border border-[#26385A40] flex items-center gap-3">
            <IoFilterSharp size={18} /> Filter
          </button>
        </div>

        <Table>
          <TableHead className="bg-[#315951E5] text-white">
            <TableRow>
              <TableHeadCell>
                <div className="flex items-center gap-2">
                  Title <MdOutlineUnfoldMore />
                </div>
              </TableHeadCell>

              <TableHeadCell>
                <div className="flex items-center gap-2">
                  Status <MdOutlineUnfoldMore />
                </div>
              </TableHeadCell>

              <TableHeadCell>Num Users</TableHeadCell>

              <TableHeadCell>
                <div className="flex items-center gap-2">
                  Num tasks <MdOutlineUnfoldMore />
                </div>
              </TableHeadCell>

              <TableHeadCell>
                <div className="flex items-center gap-2">
                  Date Created <MdOutlineUnfoldMore />
                </div>
              </TableHeadCell>

              <TableHeadCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {projects?.map((project) => (
              <TableRow
                key={project.id}
                className="odd:bg-white even:bg-[#F5F5F5]"
              >
                <TableCell>{project.title}</TableCell>

                <TableCell>
                  {getProjectStatus(project.task)}
                </TableCell>

                <TableCell />

                <TableCell>{project.task?.length || 0}</TableCell>

                <TableCell>
                  {new Date(project.creationDate).toLocaleDateString()}
                </TableCell>

                <TableCell className="relative">
                  <div className="flex justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMenu(project.id);
                      }}
                    >
                      <BsThreeDotsVertical size={25} />
                    </button>

                   {openMenuId === project.id && (
                    <>
                      <div
                        className="fixed inset-0 z-[60] bg-transparent"
                        onClick={() => setOpenMenuId(null)}
                      ></div>

                      <div className="fixed right-20 bottom-30 mt-10 w-32 bg-[#3159517c] shadow-[0_10px_30px_rgba(0,0,0,0.2)] rounded-xl z-[9999] p-1.5">
                        <div className="flex flex-col gap-0.5">

                          {/* View */}
                          <button
                            onClick={() => {
                              handleViewProject(project);
                              setOpenMenuId(null);
                            }}
                            className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-green-50 transition-all group text-white"
                          >
                            <div className="p-1 bg-green-50 rounded-md group-hover:bg-green-100 transition-colors">
                              <HiOutlineEye size={14} className="text-green-600" />
                            </div>
                            <span className="text-xs font-semibold text-gray-700 group-hover:text-green-600">
                              View
                            </span>
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() => {
                              navigation(`/dashboard/project-data/${project.id}`);
                            }}
                            className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-yellow-50 transition-all group text-white"
                          >
                            <div className="p-1 bg-yellow-50 rounded-md group-hover:bg-yellow-100 transition-colors">
                              <HiOutlinePencilAlt size={14} className="text-yellow-500" />
                            </div>
                            <span className="text-xs font-semibold text-gray-700 group-hover:text-yellow-600">
                              Edit
                            </span>
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => {
                              setSelectedProjectId(project.id);
                              setOpenDeleteModal(true);
                              setOpenMenuId(null);
                            }}
                            className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-red-50 transition-all group"
                          >
                            <div className="p-1 bg-red-50 rounded-md group-hover:bg-red-100 transition-colors">
                              <HiOutlineTrash size={14} className="text-red-600" />
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
      </div>
    </>
  );
}