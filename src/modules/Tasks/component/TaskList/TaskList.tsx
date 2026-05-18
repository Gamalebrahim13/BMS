import { useEffect, useState } from "react";
import CrudHeader from "../../../Shared/Components/CrudHeader/CrudHeader";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
import { Modal, ModalBody } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { MdDescription } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";
import { MdDateRange } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaEarthAmericas } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { BsRadioactive } from "react-icons/bs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

import {
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiOutlineEye,
} from "react-icons/hi";
import {
  DeleteTaskById,
  GetAllTasks,
  GetTaskById,
} from "../../../../api/module/task";

import { MdOutlineUnfoldMore } from "react-icons/md";
import { toast } from "react-toastify";

export default function TaskList() {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const [openModal, setOpenModal] = useState(false);
  type Task = {
    id: number;
    title: string;
    description: string;
    status: string;
    creationDate: string;
    employee?: {
      id: number;
      userName: string;
    };
    project?: {
      id: number;
      title: string;
    };
  };
  type TasksResponse = {
    pageNumber: number;
    pageSize: number;
    data: Task[];
    totalNumberOfRecords: number;
    totalNumberOfPages: number;
  };

  // Get Task
  const [tasksList, setTasksList] = useState<TasksResponse | null>(null);
  const navigate = useNavigate();
  const getTasksList = async () => {
    try {
      const response = await GetAllTasks();
      console.log(response);
      setTasksList(response);
    } catch (error) {
      toast.error("Unable to fetch data from API");
    }
  };

  // Delete Task
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const handleDelete = async () => {
    try {
      const response = await DeleteTaskById(selectedTaskId!.toString());
      setOpenModal(false);
      getTasksList();
      toast.success("Task deleted successfully");
    } catch (error: any) {
      const errors = error?.response?.data?.additionalInfo?.errors;

      if (errors) {
        Object.values(errors).forEach((messages: any) => {
          if (Array.isArray(messages)) {
            messages.forEach((msg: string) => {
              toast.error(msg);
            });
          }
        });
      } else {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    }
  };
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // View Task Detaiks
  const getTask = async (id: number) => {
    try {
      const response = await GetTaskById(id.toString());
      const taskData = response?.data ?? response;
      console.log(taskData);
      setSelectedTask(taskData);
      setOpenViewModal(true);
    } catch (error) {
      toast.error("Unable to fetch data from API");
    }
  };

  useEffect(() => {
    getTasksList();
  }, []);
  return (
    <>
      <CrudHeader
        title="Tasks"
        buttonText="Add New Task"
        onButtonClick={() => navigate("/dashboard/task-data")}
      />

      {/* Delet Modal */}
      <Modal
        show={openModal}
        size="lg"
        popup
        onClose={() => setOpenModal(false)}>
        <ModalBody className="bg-white text-gray-900 rounded-lg p-6 shadow-lg">
          <div className="mb-4">
            <div className="text-center py-6">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-secondary" />

              <h3 className="mb-3 text-xl font-medium text-gray-900">
                Are you sure you want to delete this task ?
              </h3>
            </div>

            <div className="flex justify-center gap-4">
              <button
                className="bg-gray-200 text-secondary border border-secondary text-gray-900 px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-300 transition-colors"
                onClick={() => setOpenModal(false)}>
                Cancel
              </button>

              <button
                className="bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-red-700 transition-colors"
                onClick={handleDelete}>
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
        <ModalBody className="bg-white rounded-xl p-8">
          {/* Title */}
          <h2 className="text-2xl font-bold text-[#315951] mb-8 border-b pb-4">
            Task Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-100 -translate-x-1/2"></div>

            {/* الجانب الأيسر: Task Info */}
            <div className="space-y-5">
              <h3 className="text-[#315951] font-bold text-lg mb-4">
                Task Info
              </h3>

              <div className="flex items-center gap-3">
                <MdEditSquare size={18} className="text-[#315951]" />
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">Title: </span>
                  <span className="text-[#315951] font-bold">
                    {selectedTask?.title}
                  </span>
                </p>
              </div>

              <div className="flex items-start gap-3">
                <MdDescription size={18} className="text-[#315951]" />
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">
                    Description:{" "}
                  </span>
                  <span className="text-[#315951] font-bold">
                    {selectedTask?.description}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <GrStatusGood size={18} className="text-[#315951]" />
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">Status: </span>
                  <span className="text-[#315951] font-bold">
                    {selectedTask?.status}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <MdDateRange size={18} className="text-[#315951]" />
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">Created: </span>
                  <span className="text-[#315951] font-bold">
                    {selectedTask?.creationDate
                      ? new Date(selectedTask.creationDate).toLocaleDateString(
                          "en-GB",
                        )
                      : "-"}
                  </span>
                </p>
              </div>
            </div>

            {/* الجانب الأيمن: Employee Info */}
            <div className="space-y-5">
              <h3 className="text-[#315951] font-bold text-lg mb-4">
                Employee Info
              </h3>

              <div className="flex items-center gap-3">
                <FaUser size={16} className="text-[#315951]" />
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">
                    User Name:{" "}
                  </span>
                  <span className="text-[#315951] font-bold">
                    {selectedTask?.employee?.userName || "-"}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <MdEmail size={16} className="text-[#315951]" />
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">Email: </span>
                  <span className="text-[#315951] font-bold  break-all">
                    {(selectedTask?.employee as any)?.email || "-"}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <FaEarthAmericas size={16} className="text-[#315951]" />
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">Country: </span>{" "}
                  <span className="text-[#315951] font-bold">
                    {(selectedTask?.employee as any)?.country || "-"}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <BsRadioactive size={16} className="text-[#315951]" />
                <span className="font-semibold text-gray-700">
                  Is Avticvated:
                </span>

                <p className="text-sm">
                  <span className="text-[#315951] font-bold">
                    {(selectedTask?.employee as any)?.isActivated === true
                      ? "Active"
                      : (selectedTask?.employee as any)?.isActivated === false
                        ? "Inactive"
                        : "-"}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <MdVerified size={16} className="text-[#315951]" />
                <span className="font-semibold text-gray-700">isVerified:</span>

                <p className="text-sm">
                  <span className="text-[#315951] font-bold">
                    {(selectedTask?.employee as any)?.isVerified === true
                      ? "Verified"
                      : (selectedTask?.employee as any)?.isVerified === false
                        ? "InVerified"
                        : "-"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t flex justify-end">
            <button
              onClick={() => setOpenViewModal(false)}
              className="px-6 py-2 bg-[#315951] text-white rounded-lg font-medium hover:bg-[#25443d] transition-colors">
              Close
            </button>
          </div>
        </ModalBody>
      </Modal>

      {/* Table Wrapper */}
      <div className="overflow-x-auto shadow-md mx-10 rounded-lg bg-white">
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

        {/* Table */}
        <Table className="border-collapse rounded-0      ">
          <TableHead className="bg-[#315951E5] text-white">
            <TableRow>
              <TableHeadCell className="border-r border-black/20">
                <div className="flex items-center gap-2 cursor-pointer">
                  Title
                  <MdOutlineUnfoldMore size={20} />
                </div>
              </TableHeadCell>

              <TableHeadCell className="border-r border-black/20">
                <div className="flex items-center gap-2 cursor-pointer text-md">
                  Status
                  <MdOutlineUnfoldMore size={20} />
                </div>
              </TableHeadCell>

              <TableHeadCell className="border-r border-black/20">
                <div className="flex items-center gap-2 cursor-pointer px-3 py-1">
                  User
                  <MdOutlineUnfoldMore size={20} />
                </div>
              </TableHeadCell>

              <TableHeadCell className="border-r border-black/20">
                <div className="flex items-center gap-2 cursor-pointer">
                  Project
                  <MdOutlineUnfoldMore size={20} />
                </div>
              </TableHeadCell>

              <TableHeadCell className="border-r border-black/20">
                <div className="flex items-center gap-2 cursor-pointer">
                  Created Date
                  <MdOutlineUnfoldMore size={20} />
                </div>
              </TableHeadCell>

              <TableHeadCell></TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y-0">
            {tasksList?.data?.map((task) => (
              <TableRow
                key={task.id}
                className="odd:bg-white even:bg-[#F5F5F5] border-none">
                <TableCell className="whitespace-nowrap font-medium text-black border-none">
                  {task.title}
                </TableCell>

                <TableCell className="text-black border-none text-lg">
                  {task.status}
                </TableCell>

                <TableCell className="text-black  border-none text-lg">
                  {task.employee?.userName || "No User"}
                </TableCell>

                <TableCell className="text-black border-none text-lg">
                  {task.project?.title || "No Project"}
                </TableCell>

                <TableCell className="text-black border-none text-lg">
                  {new Date(task.creationDate).toLocaleDateString("en-GB")}
                </TableCell>

                <TableCell className="relative border-none text-lg">
                  <div className="flex justify-center">
                    <button
                      onClick={() => toggleMenu(task.id)} //
                      className="text-[#315951E5] hover:bg-gray-100 p-1 rounded-full transition-colors">
                      <BsThreeDotsVertical size={25} />
                    </button>

                    {openMenuId === task.id && (
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
                                getTask(task.id);
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
                              onClick={() => setOpenMenuId(null)}>
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
                              className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-red-50 transition-all group"
                              onClick={() => {
                                setSelectedTaskId(task.id);
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
      </div>
    </>
  );
}
