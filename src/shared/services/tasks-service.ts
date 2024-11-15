import { StatusEnum, Tasks } from "@/components/table-tasks";
import api from "@/lib/api";

export const getTasks = async (data: {
  page?: number;
  limit?: number;
  title?: string;
  status?: string;
}) => {
  const response = await api.get<{
    tasks: Tasks[];
    totalTasks: number;
    totalPages: number;
    currentPage: number;
  }>(`/tasks`, {
    params: data,
  });

  return response.data;
};

export const createTask = async (data: {
  title: string;
  description: string;
  status: StatusEnum;
}) => {
  const response = await api.post(`/tasks`, data);

  return response.data;
};
