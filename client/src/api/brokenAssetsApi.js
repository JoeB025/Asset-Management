import api from "./axiosClient";

export const getBroken = async () => {
  const response = await api.get("/broken");
  return response.data;
};


// you have not put a service in for broken yet so it will just fire to the dashboard for now 

// you can either create a new service or just add it to the inventory service... sleep on it 