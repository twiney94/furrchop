/* eslint-disable @typescript-eslint/no-explicit-any */

import { HydraPaginateResp } from "../types/Fetch";
import { httpCall } from "./http";

export const fetchShops = async () => {
  const response = await httpCall("GET", "shops", {});
  if (response.data) {
    return response.data as HydraPaginateResp<any>; 
  }
}

export const createShop = async (shopDetails: any) => {
  return await httpCall("POST", "shops", shopDetails);
};

export const updateShop = async (id: string, shopDetails: any) => {
  return await httpCall("PUT", `shops/${id}`, shopDetails);
};

export const deleteShop = async (id: string) => {
  return await httpCall("DELETE", `shops/${id}`, {});
};