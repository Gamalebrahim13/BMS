import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Icons
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
import { 
  HiOutlineEye, 
  HiOutlinePencilAlt, 
  HiOutlineTrash, 
  HiOutlineExclamationCircle 
} from "react-icons/hi";
import { MdOutlineUnfoldMore } from "react-icons/md";

// API & Utils
import { DeleteProject, GetProjects } from "../../../../api/module/project";
import { getProjectStatus } from "../../../../api/utils/projectStatus";

// Components
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

export default function ProjectList() {
  const navigation = useNavigate();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [projects, setProjects] = useState<any[]>([]);

  // ================= FUNCTIONS =================

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
      // بناءً على رد الـ API بتاعك، بنستخدم .data لو هو Object فيه Pagination
      setProjects(response.data || response || []);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching projects");
    }
  };

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  // ================= EFFECTS =================

  useEffect(() => {
    getProjectsData();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <CrudHeader
        title="Projects"
        buttonText="Add New Project"
        onButtonClick={() => navigation("/dashboard/project-data")}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        show={openDeleteModal}
        size="lg"
        popup
        onClose={() => setOpenDeleteModal(false)}
      >
        <ModalBody className="bg-white text-gray-900 rounded-lg p-6 shadow-lg">
          <div className="text-center py-6">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-500" />
            <h3 className="mb-3 text-xl font-medium">
              Are you sure you want to delete this project?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                className="bg-gray-200 px-6 py-2.5 rounded-xl hover:bg-gray-300 transition-colors"
                onClick={() => setOpenDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-6 py-2.5 rounded-xl hover:bg-red-700 transition-colors"
                onClick={async () => {
                  if (!selectedProjectId) return;
                  try {
                    await DeleteProject(selectedProjectId);
                    toast.success("Project deleted successfully");
                    setOpenDeleteModal(false);
                    getProjectsData();
                  } catch (error) {
                    toast.error("Failed to delete project");
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {/* View Project Details Modal */}
      <Modal
        show={openViewModal}
        size="2xl"
        onClose={() => setOpenViewModal(false)}
      >
        <ModalBody className="bg-white rounded-xl p-8">
          <h2 className="text-2xl font-bold text-[#315951] mb-6 border-b pb-3">
            Project Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative">
            <div className="space-y-4">
              <p><b>Title:</b> {selectedProject?.title}</p>
              <p><b>Status:</b> {getProjectStatus(selectedProject?.task)}</p>
              <p><b>Tasks:</b> {selectedProject?.task?.length || 0}</p>
            </div>
            <div className="space-y-4">
              <p><b>Date:</b> {selectedProject?.creationDate ? new Date(selectedProject.creationDate).toLocaleDateString() : "-"}</p>
              <p><b>ID:</b> {selectedProject?.id}</p>
              <p><b>Description:</b> {selectedProject?.description || "-"}</p>
            </div>
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-200 -translate-x-1/2"></div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setOpenViewModal(false)}
              className="px-6 py-2 bg-[#315951] text-white rounded-lg hover:bg-[#25443d] transition-colors"
            >
              Close
            </button>
          </div>
        </ModalBody>
      </Modal>

      {/* Table & Filters */}
      <div className="overflow-x-auto shadow-md mx-10 bg-white rounded-lg mt-5">
        <div className="flex items-center gap-2 p-4">
          <div className="relative w-64">
            <input
              placeholder="Search Projects..."
              className="w-full bg-transparent rounded-full border border-[#26385A40] px-10 py-2 pr-10 outline-none placeholder:text-[#AAAAAA]"
            />
            <FiSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
          <button className="bg-transparent rounded-full px-6 py-2 border border-[#26385A40] flex items-center gap-3 hover:bg-gray-50">
            <IoFilterSharp size={18} /> Filter
          </button>
        </div>

        <Table className="w-full text-left">
          <TableHead className="bg-[#315951E5] text-white">
            <TableHeadCell>Title <MdOutlineUnfoldMore className="inline ml-1" /></TableHeadCell>
            <TableHeadCell>Status <MdOutlineUnfoldMore className="inline ml-1" /></TableHeadCell>
            <TableHeadCell>Num Users</TableHeadCell>
            <TableHeadCell>Num Tasks <MdOutlineUnfoldMore className="inline ml-1" /></TableHeadCell>
            <TableHeadCell>Date Created <MdOutlineUnfoldMore className="inline ml-1" /></TableHeadCell>
            <TableHeadCell><span className="sr-only">Actions</span></TableHeadCell>
          </TableHead>

          <TableBody className="divide-y">
            {projects?.map((project) => (
              <TableRow key={project.id} className="odd:bg-white even:bg-[#F5F5F5] hover:bg-gray-50 transition-colors">
                <TableCell className="font-medium text-gray-900">{project.title}</TableCell>
                <TableCell>{getProjectStatus(project.task)}</TableCell>
                <TableCell>0</TableCell> {/* اتركها صفر أو اربطها بالداتا لو موجودة */}
                <TableCell>{project.task?.length || 0}</TableCell>
                <TableCell>{new Date(project.creationDate).toLocaleDateString()}</TableCell>
                <TableCell className="relative">
                  <div className="flex justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMenu(project.id);
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <BsThreeDotsVertical size={20} />
                    </button>

                    {openMenuId === project.id && (
                      <>
                        <div className="fixed inset-0 z-[60]" onClick={() => setOpenMenuId(null)}></div>
                        <div className="absolute right-0 mt-8 w-36 bg-white border border-gray-200 shadow-xl rounded-lg z-[70] py-1">
                          <button
                            onClick={() => handleViewProject(project)}
                            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <HiOutlineEye className="text-blue-500" /> View
                          </button>
                          <button
                            onClick={() => navigation(`/dashboard/project-data/${project.id}`)}
                            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <HiOutlinePencilAlt className="text-green-500" /> Edit
                          </button>
                          <button
                            onClick={() => {
                              setSelectedProjectId(project.id);
                              setOpenDeleteModal(true);
                              setOpenMenuId(null);
                            }}
                            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <HiOutlineTrash /> Delete
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