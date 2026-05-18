import React, { useEffect, useState } from "react";
import CrudHeader from "../../../Shared/Components/CrudHeader/CrudHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
  CreateTask,
  GetTaskById,
  UpdateTaskById,
} from "../../../../api/module/task";
import { GetProjects } from "../../../../api/module/project";
import { GetAllUsersByMangers } from "../../../../api/module/user";

import { toast } from "react-toastify";

export default function TaskData() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = !!id;

  const [projectsList, setProjectsList] = useState([]);
  const [usersList, setUsersList] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Get Projects
  const getProjects = async () => {
    try {
      const response = await GetProjects({
        pageNumber: 1,
        pageSize: 100,
      });
      setProjectsList(response.data);
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

  // Get Users
  const getUsers = async () => {
    try {
      const response = await GetAllUsersByMangers();
      setUsersList(response.data);
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

  // Get Task by id
  const getTaskDetails = async () => {
    try {
      const response = await GetTaskById(id!);

      reset({
        title: response.title,
        description: response.description,
        employeeId: response.employee?.id,
        projectId: response.project?.id,
      });
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

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        title: data.title,
        description: data.description,
        employeeId: Number(data.employeeId),
        projectId: Number(data.projectId),
      };

      if (isEditMode) {
        await UpdateTaskById(id!, payload);
        toast.success("Task updated successfully");
      } else {
        await CreateTask(payload);
        toast.success("Task created successfully");
      }

      navigate("/dashboard/task-list");
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

  useEffect(() => {
    getProjects();
    getUsers();

    if (isEditMode) {
      getTaskDetails();
    }
  }, [id]);

  return (
    <>
      <CrudHeader
        title={isEditMode ? "Update Task" : "Add New Task"}
        linkText="View All Tasks"
        linkPath="/dashboard/task-list"
      />

      <div className="flex justify-center items-center mt-10 rounded-lg overflow-hidden">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-2xl bg-white shadow-md p-6 space-y-5">
          {/* TITLE */}
          <div>
            <label className="block mb-2 text-[#4F4F4F] font-medium">
              Title
            </label>

            <input
              {...register("title", {
                required: "Title is required",
              })}
              type="text"
              placeholder="Enter task title"
              className="w-full border border-[#ECECEC] px-4 py-2 outline-none rounded-xl"
            />

            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message as string}
              </p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block mb-2 text-[#4F4F4F] font-medium">
              Description
            </label>

            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              rows={4}
              placeholder="Enter description"
              className="w-full border border-[#ECECEC] px-4 py-2 outline-none rounded-xl"
            />

            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message as string}
              </p>
            )}
          </div>

          {/* PROJECT & USER */}
          <div className="grid grid-cols-2 gap-4">
            {/* PROJECT */}
            <div>
              <label className="block mb-2 font-medium text-[#4F4F4F]">
                Project
              </label>

              <select
                {...register("projectId", {
                  required: "Project is required",
                })}
                className="w-full border border-[#ECECEC] px-4 py-2 outline-none rounded-xl">
                <option value="">Select Project</option>

                {Array.isArray(projectsList) &&
                  projectsList.map((project: any) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
              </select>

              {errors.projectId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.projectId.message as string}
                </p>
              )}
            </div>

            {/* USER */}
            <div>
              <label className="block mb-2 font-medium text-[#4F4F4F]">
                User
              </label>

              <select
                {...register("employeeId", {
                  required: "User is required",
                })}
                className="w-full border border-[#ECECEC] px-4 py-2 outline-none rounded-xl">
                <option value="">Select User</option>
                {Array.isArray(usersList) &&
                  usersList.map((user: any) => (
                    <option key={user.id} value={user.id}>
                      {user.userName}
                    </option>
                  ))}
              </select>

              {errors.employeeId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.employeeId.message as string}
                </p>
              )}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="border-t border-[#ECECEC] pt-4 mt-5 flex justify-between items-center">
            <button
              type="button"
              onClick={() => navigate("/dashboard/task-list")}
              className="px-6 py-2 border border-[#ECECEC] text-[#4F4F4F] rounded-xl">
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-full">
              {isEditMode ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
