// import api from "./axiosClient";

// export const getUsers = async () => {
//   const response = await api.get("/users");
//   return response.data;
// };

// export const createUser = async (user) => {
//   const response = await api.post("/users", user);
//   return response.data;
// };

// export const disableUser = async (id) => {
//   const response = await api.put(`/users/${id}/disable`);
//   return response.data;
// };

// export const resetPassword = async (id, password) => {
//   const response = await api.put(`/users/${id}/reset-password`, {Password: password});
//   return response.data;
// };





import api from "./axiosClient";

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const createUser = async (user) => {
  // Ensure consistent backend payload shape
  const payload = {
    EmployeeId: user.EmployeeId,
    EmailAddress: user.EmailAddress,
    Username: user.Username, // display name only
    Password: user.Password,
    Role: user.Role,
  };

  const response = await api.post("/users", payload);
  return response.data;
};

export const disableUser = async (id) => {
  const response = await api.put(`/users/${id}/disable`);
  return response.data;
};

export const resetPassword = async (id, password) => {
  const response = await api.put(`/users/${id}/reset-password`, {
    Password: password,
  });

  return response.data;
};