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

  const isPatchOrPut = method === "PATCH";
  headers["Content-Type"] = isPatchOrPut
    ? "application/merge-patch+json"
    : headers["Content-Type"] || "application/ld+json";

  try {
    const userItem = localStorage.getItem("user");
    if (userItem) {
      const parsedUser = JSON.parse(userItem);
      if (parsedUser) {
        const { token } = parsedUser;
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
      }
    }
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
  }

  return axios({
    url: `${API_URI}/${endpoint}`,
    method,
    headers,
    data,
  }).catch((error) => {
    // Handle or log error as needed
    throw error;
  });
};

export const outsideHttpCall = (
  method: Method,
  url: string,
  data: any,
  headers?: any
) => {
  // Initialize headers if not provided
  if (!headers) {
    headers = {};
  }

  return axios({
    url,
    method,
    headers,
    data,
  }).catch((error) => {
    // Handle or log error as needed
    throw error;
  });
};

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
