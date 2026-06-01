// import CrudHeader from "../../../Shared/Components/CrudHeader/CrudHeader";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import CrudHeader from "../../../Shared/Components/CrudHeader/CrudHeader";
import {
  AddProject,
  UpdateProject,
  GetProjectById,
} from "../../../../api/module/project";
import  { toast } from "react-toastify";



 type ProjectData = {
  title: string;
  description: string;
   
};

export default function ProjectData() {
  const navigate = useNavigate();

  const { id } = useParams();

  const isEditMode = Boolean(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectData>();

  
const getProjectDetails = async () => {
    try {
      const response = await GetProjectById(Number(id!));

      reset({
        title: response.title,
        description: response.description,
       
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
         
       };
 
       
 
       if (isEditMode) {
         await UpdateProject(Number(id!), payload);
         toast.success("Project updated successfully");
       } else {
         await AddProject(payload);
         toast.success("Project created successfully");
       }
 
       navigate("/dashboard/project-list");
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
    if (isEditMode) {
      getProjectDetails();
    }
  }, []);


  return (
    <>
      <CrudHeader
        title={isEditMode ? "Edit Project" : "Add a New Project"}
        linkText="View All Projects"
        linkPath="/dashboard/project-list"
      />

      <div className="flex justify-center items-center mt-10 rounded-lg overflow-hidden">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-2xl bg-white shadow-md p-6 space-y-5"
        >
          
          <div className="mb-3">
            <label className="block mb-2 text-[#4F4F4F] font-medium">
              Title
            </label>

            <input
              type="text"
              placeholder="Enter project title"
              {...register("title", {
                required: "Title is required",
              })}
              className="w-full border border-[#ECECEC] px-4 py-2 outline-none rounded-xl placeholder:text-[#C1C1C1]"
            />

            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          
          <div>
            <label className="block my-2 font-medium text-[#4F4F4F]">
              Description
            </label>

            <textarea
              placeholder="Enter description"
              rows={4}
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full border border-[#ECECEC] px-4 py-2 outline-none rounded-xl placeholder:text-[#C1C1C1]"
            />

            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="border-t border-[#ECECEC] pt-4 mt-5 flex justify-between items-center">
            
            <button
              type="button"
              onClick={() => navigate("/dashboard/project-list")}
              className="px-6 py-2 border border-[#ECECEC] text-[#4F4F4F] rounded-xl"
            >
              Cancel
            </button>

            
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-full"
            >
              {isEditMode ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}



