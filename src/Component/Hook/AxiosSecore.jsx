import axios from 'axios';

const AxiosSecure = axios.create({
  baseURL: 'http://localhost:3000',
});

export default AxiosSecure;
