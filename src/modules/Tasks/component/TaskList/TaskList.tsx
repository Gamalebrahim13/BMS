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
    employeeId: number;
    projectId: number;
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
                Users
                <MdOutlineUnfoldMore size={20} />
              </div>
            </TableHeadCell>

            <TableHeadCell className="border-r border-black/20 ">
              <div className="flex items-center gap-2 cursor-pointer px-3 py-1">
                Projects
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
            {tasksList?.data?.map((task) => (
              <TableRow
                key={task.id}
                className="odd:bg-white even:bg-[#F5F5F5] border-none">
                <TableCell className="whitespace-nowrap font-medium text-black border-none">
                  {task.title}
                </TableCell>

                <TableCell className="text-black border-none">
                  {task.status}
                </TableCell>

                <TableCell className="text-black border-none">
                  {task.employeeId}
                </TableCell>

                <TableCell className="text-black border-none">
                  {task.projectId}
                </TableCell>

                <TableCell className="text-black border-none">-</TableCell>

                <TableCell className="relative border-none">
                  <div className="flex justify-center">
                    <button
                      onClick={() => toggleMenu(task.id)} //
                      className="text-[#315951E5] hover:bg-gray-100 p-1 rounded-full transition-colors">
                      <BsThreeDotsVertical size={25} />
                    </button>

                    {openMenuId === task.id && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setOpenMenuId(null)}></div>

                        <div className="absolute right-0 mt-8 w-32 bg-white border border-gray-200 shadow-lg rounded-md z-20 py-2">
                          <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <HiOutlineEye className="text-blue-500" />
                          </button>
                          <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
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
