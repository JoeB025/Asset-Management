import api from "./axiosClient";

export const getAssetTypes = async () => {
  const response = await api.get("/asset-types");
  return response.data;
};

export const createAssetType = async (name) => {
  const response = await api.post("/asset-types", {
    Name: name,
  });

  return response.data;
};

export const updateAssetType = async (id, data) => {
  const response = await api.put(`/asset-types/${id}`, data);
  return response.data;
};

export const deleteAssetType = async (id) => {
  const response = await api.delete(`/asset-types/${id}`);
  return response.data;
};