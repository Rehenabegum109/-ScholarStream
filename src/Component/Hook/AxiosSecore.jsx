import axios from "axios";
import { getAuth } from "firebase/auth";

const AxiosSecure = axios.create({
  baseURL: "http://localhost:3000", 
});

// Request interceptor
AxiosSecure.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default AxiosSecure;
