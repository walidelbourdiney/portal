import axios from "axios";

// Base URL for API requests
const BASE_URL = import.meta.env.VITE_APP_API_URL;

// Create an Axios instance with base URL
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get user language from localStorage or browser
    const userLang =
      localStorage.getItem("i18nextLng") || navigator.language || "ar";

    // Add custom headers for language and content
    config.headers["x-lang"] = userLang;
    config.headers["Accept"] = "application/json";
    config.headers["Accept-Language"] = userLang;
    config.headers["Content-Language"] = userLang;

    // Add Authorization header if token exists
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
