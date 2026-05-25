import { toast } from "react-toastify";
import axiosClient from "../axiosClient";

interface GetProjectsParams {
  pageNumber: number;
  pageSize: number;
  title?: string;
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


export const GetProjectEmployee = async (
  params: GetProjectsParams
) => {
  const response = await axiosClient.get(
    "/Project/employee",
    {
      params,
    }
  );
   
  return response.data;
};
export const DeleteProject = async (id: number) => {
  try {
    const response = await axiosClient.delete(`/Project/${id}`);
    
    return response.data;
  } catch (error) {
   
    throw error;
  }
};
 

export const AddProject = async (data: {
  title: string;
  description: string;
}) => {
  try {
    const response = await axiosClient.post(`/Project`, data);
    
    return response.data;
  } catch (error) {

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
        

    return response.data;
  } catch (error) {
  
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
