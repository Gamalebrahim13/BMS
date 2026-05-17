import React from 'react'
import CrudHeader from "../../../Shared/Components/CrudHeader/CrudHeader";
import { useNavigate } from "react-router-dom";

export default function TaskData() {
  const navigate = useNavigate();
  return (
    <>
      <CrudHeader
        title="Add a New Task"
        linkText="View All Tasks"
        linkPath="/dashboard/task-list"
        onButtonClick={() => navigate("/dashboard/task-data")}
      />

      <div className="flex justify-center items-center mt-10 rounded-lg overflow-hidden">
        <form className="w-full max-w-2xl bg-white shadow-md   p-6 space-y-5">
          {/* Title */}
          <div className="mb-3">
            <label className="block mb-2 text-[#4F4F4F] font-medium">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter task title"
              className="w-full border border-[#ECECEC] px-4 py-2 outline-none  rounded-xl placeholder:text-[#C1C1C1]"
            />
          </div>
          {/* Description */}
          <div>
            <label className="block my-2 font-medium text-[#4F4F4F]">
              Description
            </label>
            <textarea
              placeholder="Enter description"
              rows={4}
              className="w-full border border-[#ECECEC] px-4 py-2 outline-none rounded-xl placeholder:text-[#C1C1C1]"
            />
          </div>
          {/* Project & User */}
          <div className="grid grid-cols-2 gap-4">
            {/* Project */}
            <div>
              <label className="block mb-2 font-medium text-[#4F4F4F]">
                Project
              </label>
              <select className="w-full border border-[#ECECEC] px-4 py-2 outline-none rounded-xl placeholder:text-[#C1C1C1]">
                <option>Select Project</option>
                <option value="1">Project A</option>
                <option value="2">Project B</option>
              </select>
            </div>

            {/* User */}
            <div>
              <label className="block mb-2 font-medium text-[#4F4F4F]">
                User
              </label>
              <select className="w-full border border-[#ECECEC] px-4 py-2 outline-none placeholder:text-[#C1C1C1] rounded-xl ">
                <option>Select User</option>
                <option value="1">User A</option>
                <option value="2">User B</option>
              </select>
            </div>
          </div>
          {/* Button Section */}
          <div className="border-t border-[#ECECEC] pt-4 mt-5 flex justify-between items-center">
            {/* Cancel - Left */}
            <button
              type="button"
              className="px-6 py-2 border border-[#ECECEC] text-[#4F4F4F] rounded-xl">
              Cancel
            </button>

            {/* Save - Right */}
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-full">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
