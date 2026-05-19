import { toast } from "react-toastify";
import axiosClient from "../axiosClient";

interface GetProjectsParams {
  pageNumber: number;
  pageSize: number;
}

export const GetProjects = async (
  params: GetProjectsParams
) => {
  const response = await axiosClient.get(
    "/Project/manager",
    {
      params,
    }
  );

  return response.data;
};
export const DeleteProject = async (id: number) => {
  try {
    const response = await axiosClient.delete(`/Project/${id}`);
    toast.success("Project deleted successfully");
    return response.data;
  } catch (error) {
    toast.error("Delete faild")
    throw error;
  }
};
 

export const AddProject = async (data: {
  title: string;
  description: string;
}) => {
  try {
    const response = await axiosClient.post(`/Project`, data);
     toast.success("Project Add successfully");
    return response.data;
  } catch (error) {
toast.error("Project deleted successfully");
    throw error;
  }
};


export const UpdateProject = async (
  id: number,
  data: {
    title: string;
    description: string;
  }
) => {
  try {
    const response = await axiosClient.put(`/Project/${id}`, data);
         toast.success("Project Updated successfully");

    return response.data;
  } catch (error) {
    toast.error("Update Project faild")
    throw error;
  }
};


export const GetProjectById = async (id: number) => {
  try {
    const response = await axiosClient.get(`/Project/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
