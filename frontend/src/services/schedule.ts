/* eslint-disable @typescript-eslint/no-explicit-any */

import { HydraPaginateResp } from "../types/Fetch";
import { httpCall } from "./http";

export const fetchSchedules = async () => {
  const response = await httpCall("GET", "schedules", {});
  if (response.data) {
    return response.data as HydraPaginateResp<any>; 
  }
}

export const createSchedule = async (scheduleDetails: any) => {
  return await httpCall("POST", "schedules", scheduleDetails);
};

export const updateSchedule = async (id: string, scheduleDetails: any) => {
  return await httpCall("PUT", `schedules/${id}`, scheduleDetails);
};

export const deleteSchedule = async (id: string) => {
  return await httpCall("DELETE", `schedules/${id}`, {});
};
