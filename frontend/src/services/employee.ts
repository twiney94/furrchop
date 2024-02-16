/* eslint-disable @typescript-eslint/no-explicit-any */

import { HydraPaginateResp } from "../types/Fetch";
import { httpCall } from "./http";


export const fetchEmployees = async () => {
  const response = await httpCall("GET", "employees", {});
  if (response.data) {
    return response.data as HydraPaginateResp<any>; 
  }
}

export const createEmployee = async (employeeDetails: any) => {
  return await httpCall("POST", "employees", employeeDetails);
};

export const updateEmployee = async (id: string, employeeDetails: any) => {
  return await httpCall("PUT", `employees/${id}`, employeeDetails);
};

export const deleteEmployee = async (id: string) => {
  return await httpCall("DELETE", `employees/${id}`, {});
};

