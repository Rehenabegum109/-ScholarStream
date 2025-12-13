// // AxiosSecure.js
// import axios from 'axios';
// import { useNavigate } from 'react-router';
// import { UseAuth } from './AuthProvider';

// const useAxiosSecure = () => {
//   const { user, logOut } = UseAuth();
//   const navigate = useNavigate();

//   const axiosInstance = axios.create({ baseURL: 'http://localhost:3000' });

//   axiosInstance.interceptors.request.use(config => {
//     if (user?.accessToken) config.headers.Authorization = `Bearer ${user.accessToken}`;
//     return config;
//   });

//   axiosInstance.interceptors.response.use(
//     res => res,
//     err => {
//       if (err.response?.status === 401 || err.response?.status === 403) {
//         logOut().then(() => navigate('/login'));
//       }
//       return Promise.reject(err);
//     }
//   );

//   return axiosInstance;
// };

// export default useAxiosSecure;



// AxiosSecure.js
import axios from 'axios';
import { useNavigate } from 'react-router';
import { UseAuth } from './AuthProvider';


const useAxiosSecure = () => {
  const { user, logOut } = UseAuth();
  const navigate = useNavigate();

  const axiosInstance = axios.create({ baseURL: 'http://localhost:3000' });

  // Request interceptor: attach token
  axiosInstance.interceptors.request.use(async (config) => {
    if (user) {
      try {
        const token = await user.getIdToken(true); // force refresh
        config.headers.Authorization = `Bearer ${token}`;
      } catch (err) {
        console.error('Failed to get token:', err);
      }
    }
    return config;
  });

  let isRefreshing = false;

  // Response interceptor: handle 401/403
  axiosInstance.interceptors.response.use(
    (res) => res,
    async (err) => {
      if ((err.response?.status === 401 || err.response?.status === 403) && !isRefreshing) {
        isRefreshing = true;
        try {
          await user?.getIdToken(true); // refresh token
          isRefreshing = false;
          return axiosInstance(err.config); // retry original request
        } catch {
          await logOut();
          navigate('/login');
        }
      }
      return Promise.reject(err);
    }
  );

  return axiosInstance;
};

export default useAxiosSecure;
