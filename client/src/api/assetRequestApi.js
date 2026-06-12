import api from "./axiosClient";

export const getAssetRequests = async () => {
  const response = await api.get("/assetRequests");
  return response.data;
};

export const getAssetRequestById = async (id) => {
  const response = await api.get(`/assetRequests/${id}`);
  return response.data;
};

export const createAssetRequest = async (request) => {
  const response = await api.post("/assetRequests",request);
  return response.data;
};

export const completeAssetRequest = async (id) => {
  const response = await api.put(`/assetRequests/${id}/complete`);
  return response.data;
};

export const deleteAssetRequest = async (id) => {
  const response = await api.delete(`/assetRequests/${id}`);
  return response.data;
};