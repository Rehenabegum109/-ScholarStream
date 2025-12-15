import axios from 'axios';

const AxiosSecure = axios.create({
  baseURL: `https://scholarships-server-kappa.vercel.app`,
});

export default AxiosSecure;
