import api from "./axiosClient";

export const getInventory = async () => {
  const response = await api.get("/inventory");
  return response.data;
};

export const getInventoryItem = async (id) => {
  const response = await api.get(`/inventory/${id}`);
  return response.data;
};

export const createInventoryItem = async (item) => {
  const response = await api.post("/inventory", item);
  return response.data;
};

export const updateInventoryItem = async (id, item) => {
  const response = await api.put(`/inventory/${id}`, item);
  return response.data;
};

export const deleteInventoryItem = async (id) => {
  const response = await api.delete(`/inventory/${id}`);
  return response.data;
};

export const assignInventoryItem = async (data) => {
  const response = await api.post("/inventory/assign", data);
  return response.data;
};

export const getInventoryHistory = async (inventoryId) => {
  const response = await api.get(`/inventory/history?inventoryId=${inventoryId}`);
  return response.data;
};

export const getAvailableInventory = async () => {
  const response = await api.get(`/inventory/available`)
  return response.data 
}; 

export const getAvailableInventoryByAssetType = async (id) => {
  const response = await api.get(`/inventory/available/${id}`); 
  return response.data 
}

export const returnInventoryItem = async (data) => {
  const response = await api.post("/inventory/return", data )
  return response.data 
}
