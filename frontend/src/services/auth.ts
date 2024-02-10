// auth.ts
import axios from "axios";

interface LoginResponse {
  token: string;
}

const API_URI = import.meta.env.VITE_BACKEND_API;

export const authenticate = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URI}/auth`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (userDetails: {
  email: string;
  password: string;
  [key: string]: any;
}): Promise<any> => {
  try {
    const response = await axios.post(`${API_URI}/register`, userDetails);
    return response.data;
  } catch (error) {
    throw error;
  }
};
