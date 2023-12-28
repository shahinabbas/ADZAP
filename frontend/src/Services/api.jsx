import axios from "axios";
import { logoutUser } from "../Redux/userActions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const api = axios.create();

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      handleLogout();
    }
    return Promise.reject(error);
  }
);

const handleLogout = () => {
  const navigate = useNavigate(); // Move useNavigate inside a component
  const dispatch = useDispatch();
  localStorage.clear();
  dispatch(logoutUser());
  navigate("/");
};

export default api;
