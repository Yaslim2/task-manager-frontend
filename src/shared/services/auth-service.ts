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
