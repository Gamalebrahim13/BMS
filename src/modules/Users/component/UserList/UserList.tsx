import React, { useEffect, useState } from 'react'
import CrudHeader from '../../../Shared/Components/CrudHeader/CrudHeader'
import { Modal, ModalBody, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { MdEmail, MdOutlinePowerSettingsNew, MdOutlineUnfoldMore, MdPhone } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { HiOutlineEye } from 'react-icons/hi';
import { GetAllUsersByMangers, GetUserById, ToggleUserActivation, type user, type userResponse } from '../../../../api/module/user';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { FaEarthAmericas } from 'react-icons/fa6';
import NoData from '../../../Shared/Components/NoData/NotData';
import Pagination from '../../../Shared/Components/Pagination/Pagination';
import Filter from '../../../Shared/Components/Filter/Filter';
import { useAuth } from '../../../../context/AuthContext';
import NotFound from '../../../Shared/Components/NotFound/NotFound';

export default function UserList() {
  const { loginData } = useAuth();

  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<user | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [usersList, setUsersList] = useState<userResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const getUsersList = async (page: number, searchWord: string) => {
    setLoading(true);
    try {
      const response = await GetAllUsersByMangers({
        pageNumber: page,
        pageSize: pageSize, 
        userName: searchWord 
      });
      setUsersList(response); 
    } catch (error) {
      toast.error("Something went wrong"); 
    } finally {
      setLoading(false)
    }
  };

  const getUser = async (id: number) => {
    try {
      const response = await GetUserById(id.toString());
      const userData = response?.data ?? response;
      setSelectedUser(userData);
      setOpenViewModal(true);
    } catch (error) {
       toast.error("Something went wrong");
    }
  };

  const handleToggleActivation = async (id: number) => {
    try {
      await ToggleUserActivation(id);
      toast.success("User status updated successfully");
      setOpenMenuId(null); 
      getUsersList(currentPage, debouncedSearch);
    } catch (error) {
      toast.error("Failed to update user status");
    }
  };

  useEffect(() => {
    getUsersList(currentPage, debouncedSearch);
  }, [currentPage, pageSize, debouncedSearch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchValue);
      setCurrentPage(1);
    }, 500); 

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);
  
  if (loginData?.userGroup !== "Manager") {
    return <NotFound />;
  }

  return (
    <>
      <CrudHeader title="Users" />

      {/* View Modal */}
      <Modal
        show={openViewModal}
        size="2xl"
        onClose={() => setOpenViewModal(false)}
      >
        <ModalBody className="bg-white dark:bg-[#161619] rounded-xl p-4 sm:p-6 md:p-8 relative border dark:border-zinc-800">
          
          {/* User Image */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-[#315951]/20 dark:border-zinc-800 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-zinc-900 shadow-md">
              {selectedUser?.imagePath ? (
                <img
                  src={`https://upskilling-egypt.com:3003/${selectedUser.imagePath}`}
                  alt={selectedUser?.userName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUser size={40} className="text-[#315951]/60 dark:text-zinc-500" />
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-[#315951] dark:text-zinc-100 mt-3 text-center break-words">
              {selectedUser?.userName || "User Profile"}
            </h2>

            <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1">
              ID: #{selectedUser?.id}
            </p>
          </div>

          <div className="border-b dark:border-zinc-800 pb-2 mb-6"></div>

          {/* User Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-100 dark:bg-zinc-800 -translate-x-1/2"></div>

            {/* Left */}
            <div className="space-y-5">
              <h3 className="text-[#315951] dark:text-zinc-200 font-bold text-lg mb-4">
                Account Info
              </h3>

              <div className="flex items-start gap-3">
                <FaUser size={16} className="text-[#315951] dark:text-zinc-400 mt-1" />
                <p className="text-sm break-words text-gray-900 dark:text-zinc-300">
                  <span className="font-semibold text-gray-700 dark:text-zinc-500">
                    Username:
                  </span>{" "}
                  <span className="text-[#315951] dark:text-zinc-100 font-bold">
                    {selectedUser?.userName || "-"}
                  </span>
                </p>
              </div>

              <div className="flex items-start gap-3">
                <MdEmail size={18} className="text-[#315951] dark:text-zinc-400 mt-1" />
                <p className="text-sm break-all text-gray-900 dark:text-zinc-300">
                  <span className="font-semibold text-gray-700 dark:text-zinc-500">
                    Email:
                  </span>{" "}
                  <span className="text-[#315951] dark:text-zinc-100 font-bold">
                    {selectedUser?.email || "-"}
                  </span>
                </p>
              </div>

              <div className="flex items-start gap-3">
                <MdPhone size={18} className="text-[#315951] dark:text-zinc-400 mt-1" />
                <p className="text-sm break-words text-gray-900 dark:text-zinc-300">
                  <span className="font-semibold text-gray-700 dark:text-zinc-500">
                    Phone:
                  </span>{" "}
                  <span className="text-[#315951] dark:text-zinc-100 font-bold">
                    {selectedUser?.phoneNumber || "-"}
                  </span>
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-5">
              <h3 className="text-[#315951] dark:text-zinc-200 font-bold text-lg mb-4">
                Status & Location
              </h3>

              <div className="flex items-start gap-3">
                <FaEarthAmericas size={16} className="text-[#315951] dark:text-zinc-400 mt-1" />
                <p className="text-sm break-words text-gray-900 dark:text-zinc-300">
                  <span className="font-semibold text-gray-700 dark:text-zinc-500">
                    Country:
                  </span>{" "}
                  <span className="text-[#315951] dark:text-zinc-100 font-bold">
                    {selectedUser?.country || "-"}
                  </span>
                </p>
              </div>

              <div className="flex items-start gap-3">
                <MdOutlinePowerSettingsNew size={18} className="text-[#315951] dark:text-zinc-400 mt-1" />
                <p className="text-sm">
                  <span className="font-semibold text-gray-700 dark:text-zinc-500">
                    Status:
                  </span>{" "}
                  <span className={`font-bold ${selectedUser?.isActivated ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
                    {selectedUser?.isActivated ? "Active" : "Inactive"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="mt-8 sm:mt-10 pt-6 border-t dark:border-zinc-800 flex justify-center sm:justify-end">
            <button
              onClick={() => setOpenViewModal(false)}
              className="w-full sm:w-auto px-6 py-2 bg-[#315951] dark:bg-zinc-800 text-white dark:text-zinc-100 rounded-lg font-medium hover:bg-[#25443d] dark:hover:bg-zinc-700 transition-colors border dark:border-zinc-700"
            >
              Close
            </button>
          </div>
        </ModalBody>
      </Modal>

      {/* Table Container */}
      <div className="shadow-md mx-2 sm:mx-4 md:mx-8 lg:mx-10 rounded-lg bg-white dark:bg-[#161619] border dark:border-zinc-800 transition-colors duration-300">
        
        {/* الـ Filter مع كلاسات الـ Zinc */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 dark:text-zinc-200 [&_input]:dark:bg-[#161619] [&_input]:dark:border-zinc-800 [&_input]:dark:text-zinc-100 [&_input]:dark:placeholder-zinc-500">
          <Filter
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            placeholder="Search By Username"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="loader"></div>
          </div>
        ) : usersList?.data && usersList.data.length > 0 ? (
          <>
            {/* Responsive Table */}
            <div className="max-h-[500px] overflow-y-auto">
              <Table className="min-w-[900px] border-collapse">
                
                {/* تم تثبيت الـ bg-[#315951E5] للـ Head وفي الدارك بياخد نفس الدرجة الزيتية dark:bg-[#315951] لكل Cell صراحةً */}
                <TableHead className="bg-[#315951E5] text-white">
                  <TableRow>
                    <TableHeadCell className="bg-[#315951E5] dark:bg-[#315951] text-white dark:text-white border-b dark:border-zinc-800">User Name</TableHeadCell>
                    <TableHeadCell className="bg-[#315951E5] dark:bg-[#315951] text-white dark:text-white border-b dark:border-zinc-800">Status</TableHeadCell>
                    <TableHeadCell className="bg-[#315951E5] dark:bg-[#315951] text-white dark:text-white border-b dark:border-zinc-800">Phone Number</TableHeadCell>
                    <TableHeadCell className="bg-[#315951E5] dark:bg-[#315951] text-white dark:text-white border-b dark:border-zinc-800">Email</TableHeadCell>
                    <TableHeadCell className="bg-[#315951E5] dark:bg-[#315951] text-white dark:text-white border-b dark:border-zinc-800">Date Created</TableHeadCell>
                    <TableHeadCell className="bg-[#315951E5] dark:bg-[#315951] border-b dark:border-zinc-800"></TableHeadCell>
                  </TableRow>
                </TableHead>

                <TableBody className="divide-y-0">
                  {usersList.data.map((user) => (
                    <TableRow
                      key={user.id}
                      className="odd:bg-white even:bg-[#F5F5F5] dark:odd:bg-[#161619] dark:even:bg-zinc-900/40 border-none transition-colors duration-200"
                    >
                      <TableCell className="font-medium text-black dark:text-zinc-100">
                        {user.userName}
                      </TableCell>

                      <TableCell>
                        <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold inline-block ${user.isActivated ? "bg-[#009247] text-white" : "bg-[#922E25B2]/70 text-white"}`}>
                          {user.isActivated ? "Active" : "Not Active"}
                        </span>
                      </TableCell>

                      <TableCell className="text-black dark:text-zinc-300 text-sm sm:text-base">
                        {user.phoneNumber}
                      </TableCell>

                      <TableCell className="text-black dark:text-zinc-300 text-sm sm:text-base break-all">
                        {user.email}
                      </TableCell>

                      <TableCell className="text-black dark:text-zinc-300 text-sm sm:text-base">
                        {user.task?.[0]?.creationDate || "N/A"}
                      </TableCell>

                      <TableCell className="relative">
                        <div className="flex justify-center">
                          <button
                            onClick={() => toggleMenu(user.id)}
                            className="text-[#315951E5] dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 p-1 rounded-full transition-colors"
                          >
                            <BsThreeDotsVertical size={22} />
                          </button>

                          {openMenuId === user.id && (
                            <>
                              <div
                                className="fixed inset-0 z-[60]"
                                onClick={() => setOpenMenuId(null)}
                              ></div>

                              <div className="absolute right-0 top-10 w-36 bg-[#315951ee] dark:bg-[#161619] shadow-xl rounded-xl z-[9999] p-2 border dark:border-zinc-800">
                                <div className="flex flex-col gap-1">
                                  <button
                                    className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-green-50 dark:hover:bg-zinc-800 transition-all"
                                    onClick={() => {
                                      getUser(user.id);
                                      setOpenMenuId(null);
                                    }}
                                  >
                                    <HiOutlineEye size={15} className="text-green-600 bg-white dark:bg-zinc-900 p-0.5 rounded border dark:border-zinc-800" />
                                    <span className="text-xs font-semibold text-white dark:text-zinc-200">View</span>
                                  </button>

                                  <button
                                    className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/10 dark:hover:bg-zinc-800 transition-all"
                                    onClick={() => handleToggleActivation(user.id)}
                                  >
                                    <MdOutlinePowerSettingsNew size={15} className={user.isActivated ? "text-red-500" : "text-green-500"} />
                                    <span className="text-xs font-semibold text-white dark:text-zinc-200">
                                      {user.isActivated ? "Block" : "Activate"}
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

            {/* Pagination Container */}
            <div className="p-3 sm:p-4 bg-white dark:bg-[#161619] rounded-b-lg dark:text-zinc-200 dark:[&_button]:text-zinc-200 dark:[&_button]:bg-zinc-900 dark:[&_button]:border-zinc-800">
              <Pagination
                currentPage={usersList?.pageNumber || 1}
                totalRecords={usersList?.totalNumberOfRecords || 0}
                pageSize={usersList?.pageSize || 10}
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