import { Tasks } from "@/components/table-tasks";
import api from "@/lib/api";

export const authenticate = async (body: {
  email: string;
  password: string;
}) => {
  const response = await api.post<{ access_token: string }>(
    "/auth/login",
    body
  );

  return response.data;
};

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
