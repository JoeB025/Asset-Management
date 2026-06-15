import api from "./axiosClient";

export const login = async (emailAddress, password) => {
  const response = await api.post("/auth/login", {
    emailAddress,
    password,
  });

  return response.data;
};