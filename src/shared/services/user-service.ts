import api from "@/lib/api";

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await api.post(`/auth/register`, data);

  return response.data;
};
