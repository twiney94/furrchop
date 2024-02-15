/* eslint-disable @typescript-eslint/no-explicit-any */

import { HydraPaginateResp } from "../types/Fetch";
import { httpCall } from "./http";

export const fetchServices = async () => {
  const response = await httpCall("GET", "services", {});
  if (response.data) {
    return response.data as HydraPaginateResp<any>; 
  }
}

export const createService = async (serviceDetails: any) => {
  return await httpCall("POST", "services", serviceDetails);
};

export const updateService = async (id: string, serviceDetails: any) => {
  return await httpCall("PUT", `services/${id}`, serviceDetails);
};

export const deleteService = async (id: string) => {
  return await httpCall("DELETE", `services/${id}`, {});
};
