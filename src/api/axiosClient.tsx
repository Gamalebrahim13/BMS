import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://upskilling-egypt.com:3003/api/v1", // غيرها بالـ API بتاعك
  timeout: 5000,
});

// Request Interceptor
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response Interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;