
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "./AuthProvider";

const useAxiosSecure = () => {
  const { user, logOut } = UseAuth();
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
  });

  // Request interceptor: attach Firebase token
  axiosInstance.interceptors.request.use(async (config) => {
    if (user) {
      try {
        const token = await user.getIdToken(true); 
        console.log("Sending token:", token);
        config.headers.Authorization = `Bearer ${token}`;
      } catch (err) {
        console.error("Failed to get token:", err);
      }
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const status = err.response?.status;

    if (status === 401) {
      
      await logOut();
      navigate("/login");
    }

    if (status === 403) {
    
      console.warn("Forbidden access");
    }

    return Promise.reject(err);
  }
);


  return axiosInstance;
};

export default useAxiosSecure;
