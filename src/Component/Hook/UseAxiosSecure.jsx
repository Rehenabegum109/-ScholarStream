// AxiosSecure.js
import axios from 'axios';
import { useNavigate } from 'react-router';
import { UseAuth } from './AuthProvider';

const useAxiosSecure = () => {
  const { user, logOut } = UseAuth();
  const navigate = useNavigate();

  const axiosInstance = axios.create({ baseURL: 'http://localhost:3000' });

  axiosInstance.interceptors.request.use(config => {
    if (user?.accessToken) config.headers.Authorization = `Bearer ${user.accessToken}`;
    return config;
  });

  axiosInstance.interceptors.response.use(
    res => res,
    err => {
      if (err.response?.status === 401 || err.response?.status === 403) {
        logOut().then(() => navigate('/login'));
      }
      return Promise.reject(err);
    }
  );

  return axiosInstance;
};

export default useAxiosSecure;
