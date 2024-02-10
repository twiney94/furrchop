import axios from "axios";

const API_URI = import.meta.env.VITE_BACKEND_API;

export const httpCall = (
  method: Method,
  endpoint: string,
  data: any,
  headers?: any
) => {
  // Initialize headers if not provided
  if (!headers) {
    headers = {};
  }

  // Set content type to 'application/ld+json' if not already set
  if (!headers["Content-Type"]) {
    headers["Content-Type"] = "application/ld+json";
  }

  // Add authorization header if a token exists
  const token = localStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = {
    url: `${API_URI}/${endpoint}`,
    method,
    headers,
    data,
  };

  return axios(options);
};

type Method = "GET" | "POST" | "PUT" | "DELETE";
