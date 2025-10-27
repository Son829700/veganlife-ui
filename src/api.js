import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080", 
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  // Không gắn token nếu gọi auth/token
  if (token && !config.url.includes("/auth/token")) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default API;


