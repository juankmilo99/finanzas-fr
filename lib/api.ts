import axios from "axios";

// Base URL de la API en Render
const API_URL = "https://finanzas-bc.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Permite manejar cookies
});

// Interceptor para adjuntar el token en cada solicitud
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
