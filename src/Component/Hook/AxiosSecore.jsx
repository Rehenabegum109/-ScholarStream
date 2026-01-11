import axios from 'axios';

const AxiosSecure = axios.create({
  // baseURL: `https://scholarships-server-kappa.vercel.app`,
  baseURL: `http://localhost:3000`,

});

export default AxiosSecure;
