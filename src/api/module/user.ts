import axiosClient from "../axiosClient";
export const GetCurrentUser = async () => {
  const response = await axiosClient.get("/Users/currentUser");
  return response.data;
};

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
export type UserFilters = {
  userName?: string;
  email?: string;
  country?: string;
  groups?: number[]; // مصفوفة أرقام كما في الصورة
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
export interface UserCountResponse {
  activatedEmployeeCount: number;
  deactivatedEmployeeCount: number;
}

export const GetUsersCount = async (): Promise<UserCountResponse> => {
  const response = await axiosClient.get("/Users/count");
  return response.data;
};
export const GetAllUsersByMangers = async (params: { pageNumber?: number; pageSize?: number; userName?: string } = {}) => {
  const cleanUserName = params.userName && params.userName.trim() !== "" ? params.userName.trim() : undefined;

  const response = await axiosClient.get("/Users", {
    params: {
      pageNumber: params.pageNumber || 1,
      pageSize: params.pageSize || 10,
      userName: cleanUserName // 👈 
    }
  });
  return response.data;
};
export const GetUserById = async (id: string) => {
  const response = await axiosClient.get(`/Users/${id}`);
  return response.data;
};
export const ToggleUserActivation = async (id: number) => {
  const response = await axiosClient.put(`/Users/${id}`);
  return response.data;
};
// export const DeleteTaskById = async (id: string) => {
//   const response = await axiosClient.delete(
//     `/Task/${id}`
//   );

//   return response.data;
// };
