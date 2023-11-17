import api from "../api";

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error,'wuihfishui');
    return Promise.reject(error);
  }
);

export default api;
