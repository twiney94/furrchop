/* eslint-disable no-useless-catch */
// auth.ts
import { httpCall } from "./http";

interface LoginResponse {
  token: string;
}

export const authenticate = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await httpCall("POST", "auth", {
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
    console.log(userDetails);
    const response = await httpCall("POST", "register", userDetails);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const activateAccount = async (): Promise<any> => {
  const urlParams = window.location.pathname;
  const token = urlParams.split("/")[2];
  const decodedToken = atob(token);
  try {
    const response = await httpCall("POST", "activate", {
      uuid: decodedToken,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
