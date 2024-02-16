/* eslint-disable @typescript-eslint/no-explicit-any */
import { HydraPaginateResp } from "../types/fetch";
import { httpCall } from "./http";

export const getUnreviewBookings = async () => {
   const response = await httpCall("GET", "unreviewed-bookings", {});
  if (response.status !== 200) {
    return response.data as HydraPaginateResp<any>;
  }
};
