import React, { useEffect, useState } from 'react'
import CrudHeader from '../../../Shared/Components/CrudHeader/CrudHeader'
import { FiSearch } from 'react-icons/fi';
import { IoFilterSharp } from 'react-icons/io5';
import { Modal, ModalBody, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { MdEmail, MdOutlinePowerSettingsNew, MdOutlineUnfoldMore, MdPhone, MdVerified } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { HiOutlineEye, HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import { GetAllUsersByMangers, GetUserById, type user, type userResponse } from '../../../../api/module/user';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { FaEarthAmericas } from 'react-icons/fa6';

export default function UserList() {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<user | null>(null);

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };
  const [usersList, setUsersList] = useState<userResponse | null>(null);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);


  const getUsersList = async () => {
    try {
      const response = await GetAllUsersByMangers();
      console.log(response);
      setUsersList(response);
    } catch (error) {
      toast.error("Unable to fetch data from API");
    }
  };
  const getUser = async (id: number) => {
    try {
      const response = await GetUserById(id.toString());
      const userData = response?.data ?? response;
      console.log(userData);
      setSelectedUser(userData);
      setOpenViewModal(true);
    } catch (error) {
      toast.error("Unable to fetch data from API");
    }
  };
  // const handleDelete = async () => {
  //     try {
  //       const response = await DeleteTaskById(selectedUserId!.toString());
  //       setOpenModal(false);
  //       getTasksList();
  //       toast.success("Task deleted successfully");
  //     } catch (error: any) {
  //       const errors = error?.response?.data?.additionalInfo?.errors;
  
  //       if (errors) {
  //         Object.values(errors).forEach((messages: any) => {
  //           if (Array.isArray(messages)) {
  //             messages.forEach((msg: string) => {
  //               toast.error(msg);
  //             });
  //           }
  //         });
  //       } else {
  //         toast.error(error?.response?.data?.message || "Something went wrong");
  //       }
  //     }
  //   };
  //   const [openViewModal, setOpenViewModal] = useState(false);
  useEffect(() => {
    getUsersList();
  }, []);
  return (
    <>
      <CrudHeader
        title="Users"
      />
{/* // view Model */}
      <Modal
        show={openViewModal}
        size="2xl"
        onClose={() => setOpenViewModal(false)}
      >
        <ModalBody className="bg-white rounded-xl p-8 relative">
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="w-24 h-24 rounded-full border-4 border-[#315951]/20 flex items-center justify-center overflow-hidden bg-gray-50 shadow-md">
              {selectedUser?.imagePath ? (
                <img
                  src={`https://upskilling-egypt.com:3003/${selectedUser.imagePath}`}
                  alt={selectedUser?.userName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUser size={45} className="text-[#315951]/60" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-[#315951] mt-3">
              {selectedUser?.userName || "User Profile"}
            </h2>
            <p className="text-xs text-gray-400 mt-1">ID: #{selectedUser?.id}</p>
          </div>


          <div className="border-b pb-2 mb-6"></div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative">

            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-100 -translate-x-1/2"></div>


            <div className="space-y-5">
              <h3 className="text-[#315951] font-bold text-lg mb-4">
                Account Info
              </h3>

              <div className="flex items-center gap-3">
                <FaUser size={16} className="text-[#315951]" />
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">Username: </span>
                  <span className="text-[#315951] font-bold">
                    {selectedUser?.userName || "-"}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <MdEmail size={18} className="text-[#315951]" />
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">Email: </span>
                  <span className="text-[#315951] font-bold break-all">
                    {selectedUser?.email || "-"}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <MdPhone size={18} className="text-[#315951]" />
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">Phone: </span>
                  <span className="text-[#315951] font-bold">
                    {selectedUser?.phoneNumber || "-"}
                  </span>
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <h3 className="text-[#315951] font-bold text-lg mb-4">
                Status & Location
              </h3>

              <div className="flex items-center gap-3">
                <FaEarthAmericas size={16} className="text-[#315951]" />
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">Country: </span>
                  <span className="text-[#315951] font-bold">
                    {selectedUser?.country || "-"}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <MdOutlinePowerSettingsNew size={18} className="text-[#315951]" />
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">Status: </span>
                  <span className={`font-bold ${selectedUser?.isActivated ? 'text-green-600' : 'text-red-500'}`}>
                    {selectedUser?.isActivated ? "Active" : "Inactive"}
                  </span>
                </p>
              </div>
            </div>
          </div>
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
                  User Name
                  <MdOutlineUnfoldMore size={20} />
                </div>
              </TableHeadCell>

              <TableHeadCell className="border-r border-black/20">
                <div className="flex items-center gap-2 cursor-pointer text-md">
                  Statues
                  <MdOutlineUnfoldMore size={20} />
                </div>
              </TableHeadCell>

              <TableHeadCell className="border-r border-black/20">
                <div className="flex items-center gap-2 cursor-pointer px-3 py-1">
                  Phone Number
                  <MdOutlineUnfoldMore size={20} />
                </div>
              </TableHeadCell>

              <TableHeadCell className="border-r border-black/20">
                <div className="flex items-center gap-2 cursor-pointer">
                  Email
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
            {usersList?.data?.map((user) => (
              <TableRow
                key={user.id}
                className="odd:bg-white even:bg-[#F5F5F5] border-none">
                <TableCell className="whitespace-nowrap font-medium text-black border-none">
                  {user.userName}
                </TableCell>

                <TableCell className="text-black border-none text-lg">
  <span className={`px-5 py-2 rounded-full text-sm font-semibold inline-block ${
    user.isActivated
      ? "bg-[#009247] text-white border border-green-200"
      : "bg-[#922E25B2]/70 text-white border border-red-200"
  }`}>
    {user.isActivated ? "Active" : "Not Active"}
  </span>
</TableCell>

                <TableCell className="text-black  border-none text-lg">
                  {user.phoneNumber}
                </TableCell>

                <TableCell className="text-black border-none text-lg">
                  {user.email}
                </TableCell>

                <TableCell className="text-black border-none text-lg">
                  {user.task[0].creationDate}
                </TableCell>
                <TableCell className="relative border-none text-lg">
                  <div className="flex justify-center">
                    <button
                      onClick={() => toggleMenu(user.id)} //
                      className="text-[#315951E5] hover:bg-gray-100 p-1 rounded-full transition-colors">
                      <BsThreeDotsVertical size={25} />
                    </button>

                    {openMenuId === user.id && (
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
                                getUser(user.id);
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
                            {/* Delete */}
                            {/* <button
                              className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-red-50 transition-all group"
                              onClick={() => {
                                 setSelectedUserId(user.id);
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
                            </button> */}
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
  )
}
