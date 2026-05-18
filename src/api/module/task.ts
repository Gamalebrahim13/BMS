import axiosClient from "../axiosClient";

/* =========================
   Types
========================= */
export interface TaskCountResponse {
  toDo: number;
  inProgress: number;
  done: number;
}

export interface ProjectsResponse {
  data: any[]; 
  totalNumberOfRecords: number;
}

export const GetTasksCount = async (): Promise<TaskCountResponse> => {
  const response = await axiosClient.get("/Task/count");
  return response.data;
};
export type Task = {
  id: string;
  title: string;
  status: string;
  userCount?: number;
  taskCount?: number;
  createdAt?: string;
};

export type CreateTaskDTO = {
  title: string;
  description?: string;
};

export type UpdateTaskDTO = Partial<CreateTaskDTO>;

export type ChangeStatusDTO = {
  status: string;
};

/* =========================
   APIs
========================= */

// Create Task
export const CreateTask = async (data: CreateTaskDTO) => {
  const response = await axiosClient.post("/Task", data);
  return response.data;
};

// Get All Tasks
export const GetAllTasks = async () => {
  const response = await axiosClient.get("/Task/manager");
  return response.data;
};

// Get Task By ID
export const GetTaskById = async (id: string) => {
  const response = await axiosClient.get(`/Task/${id}`);
  return response.data;
};

// Update Task
export const UpdateTaskById = async (
  id: string,
  data: UpdateTaskDTO
) => {
  const response = await axiosClient.put(
    `/Task/${id}`,
    data
  );

  return response.data;
};

// Delete Task
export const DeleteTaskById = async (id: string) => {
  const response = await axiosClient.delete(
    `/Task/${id}`
  );

  return response.data;
};

// Change Status
export const ChangeStatus = async (
  id: string,
  data: ChangeStatusDTO
) => {
  const response = await axiosClient.put(
    `/Task/manager/${id}/change-status`,
    data
  );

  return response.data;
};