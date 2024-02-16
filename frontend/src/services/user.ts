/* eslint-disable @typescript-eslint/no-explicit-any */
// import { HydraPaginateResp } from "../types/Fetch";
import { httpCall } from "./http";

export const fetchUsers = async () => {
  const response = await httpCall("GET", "users", {});
  if (response.data) {
    return response.data as any; 
  }
}

export const createUser = async (userDetails: any) => {
  return await httpCall("POST", "register", userDetails);
};

export const updateUser = async (id: string, userDetails: any) => {
  return await httpCall("PUT", `users/${id}`, userDetails);
};

export const deleteUser = async (id: string) => {
  return await httpCall("DELETE", `users/${id}`, {});
};
