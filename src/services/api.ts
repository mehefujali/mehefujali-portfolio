import axios from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!apiBaseUrl) {
  console.error(
    "API Error: NEXT_PUBLIC_API_BASE_URL is not defined in your .env.local file."
  );
}

const api = axios.create({
  baseURL: apiBaseUrl,
});

// Interceptor to add the token to every request
api.interceptors.request.use(
  (config) => {
    // Check if window is defined (ensures code runs only on the client-side)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
