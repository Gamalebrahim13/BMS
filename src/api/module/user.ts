import axiosClient from "../axiosClient";


export type Project = {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  modificationDate: string;
};

export type UserTask = {
  id: number;
  title: string;
  description: string;
  status: string;
  creationDate: string;
  modificationDate: string;
  project: Project;
};

export type user = {
  id: number;
  userName: string;
  imagePath: string | null;
  email: string;
  country: string;
  phoneNumber: string;
  isActivated: boolean;
  task: UserTask[]; 
};

export type userResponse = {
  pageNumber: number;
  pageSize: number;
  data: user[];
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
};
export const GetAllUsersByMangers = async () => {
  const response = await axiosClient.get("/Users/Manager");
  return response.data;
};
export const GetUserById = async (id: string) => {
  const response = await axiosClient.get(`/Users/${id}`);
  return response.data;
};
// export const DeleteTaskById = async (id: string) => {
//   const response = await axiosClient.delete(
//     `/Task/${id}`
//   );

//   return response.data;
// };
