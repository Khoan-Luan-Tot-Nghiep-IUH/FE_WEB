
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.response.use(
  response => response,
  error => {
    // Xử lý lỗi
    return Promise.reject(error);
  }
);

export default axiosClient;
