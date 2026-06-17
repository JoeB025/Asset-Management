import api from "./axiosClient";

export const exportInventory = async () => {
  const response = await api.get("/exports/inventory", { responseType: "blob" });
  return response.data;
};









export const exportAvailableInventory = async () => {
  const response = await api.get("/exports/inventory/available", { responseType: "blob" });
  return response.data;
};


// export const exportAvailableInventory = async (assetTypeId) => {
//   const response = await api.get("/exports/inventory/available",
//     {
//       params: {
//         assetTypeId: assetTypeId || null
//       },
//       responseType: "blob"
//     }
//   );
//   return response.data;
// };