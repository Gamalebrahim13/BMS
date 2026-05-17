import React, { useEffect, useState } from "react";
import CrudHeader from "../../../Shared/Components/CrudHeader/CrudHeader";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
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
import { GetAllTasks } from "../../../../api/module/task";

import { MdOutlineUnfoldMore } from "react-icons/md";
import { toast } from "react-toastify";

export default function TaskList() {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

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

      <div className="overflow-x-auto shadow-md mx-10 rounded-lg bg-white">
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
                        {/* overlay */}
                        <div
                          className="fixed inset-0 z-[60] bg-transparent"
                          onClick={() => setOpenMenuId(null)}></div>

                        {/* dropdown */}
                        <div className="fixed right-20 bottom-26 w-40 bg-white mt-10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl z-[9999] p-2">
                          <div className="flex flex-col gap-1.5">
                            {/* View */}
                            <button
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-green-50 transition-all group"
                              onClick={() => setOpenMenuId(null)}>
                              <div className="p-1.5 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                                <HiOutlineEye
                                  size={18}
                                  className="text-green-600"
                                />
                              </div>
                              <span className="text-sm font-semibold text-gray-700 group-hover:text-green-600">
                                View
                              </span>
                            </button>

                            {/* Edit */}
                            <button
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-yellow-50 transition-all group"
                              onClick={() => setOpenMenuId(null)}>
                              <div className="p-1.5 bg-yellow-50 rounded-lg group-hover:bg-yellow-100 transition-colors">
                                <HiOutlinePencilAlt
                                  size={18}
                                  className="text-yellow-500"
                                />
                              </div>
                              <span className="text-sm font-semibold text-gray-700 group-hover:text-yellow-600">
                                Edit
                              </span>
                            </button>

                            {/* Delete */}
                            <button
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 transition-all group"
                              onClick={() => setOpenMenuId(null)}>
                              <div className="p-1.5 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                                <HiOutlineTrash
                                  size={18}
                                  className="text-red-600"
                                />
                              </div>
                              <span className="text-sm font-semibold text-gray-700 group-hover:text-red-600">
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
