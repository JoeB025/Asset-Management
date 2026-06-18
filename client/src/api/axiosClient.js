import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});



// REQUEST INTERCEPTOR
// Adds JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



// RESPONSE INTERCEPTOR
// Handles expired/invalid tokens globally
api.interceptors.response.use(
  (response) => response,
  (error) => {

    const status = error.response?.status;

    // If token expired or invalid
    if (status === 401) {

      // clear stored auth
      localStorage.removeItem("token");
      // force full reset to login page
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;