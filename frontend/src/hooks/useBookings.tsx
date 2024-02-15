import { createContext, useContext, useMemo, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { httpCall } from "../services/http";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import type { SelectedDate, Booking } from "../types/schedule";

export interface Service {
  description: string;
  duration: number;
  id: string;
  name: string;
  price: number;
}

interface BookingsContextType {
  bookings: Booking[] | null;
  loading: boolean;
  error: string | null;
  selectedService: Service | null;
  selectedShop: any;
  shopSchedule: any;
  selectedDate: SelectedDate;
  selectedBooking: Booking | null;
  fetchBookings: () => Promise<void>;
  createBooking: () => Promise<void>;
  editBooking: () => Promise<void>;
  getServices: (shopId: string) => Promise<Service[]>;
  getShop: (shopId: string) => Promise<void>;
  getSchedule: (
    shopId: string,
    beginDate: string,
    endDate: string
  ) => Promise<void>;
  setSelectedService: (service: Service | null) => void;
  setSelectedShop: (shop: any) => void;
  setSelectedBooking: (booking: Booking | null) => void;
  setShopSchedule: (schedule: any) => void;
  setSelectedDate: (selectedDate: SelectedDate) => void;
  cancelBooking: (id: number) => Promise<void>;
  handleRescheduleBooking: (
    id: number,
    serviceIRI: string,
    shopId: number
  ) => Promise<void>;
  reset: () => void;
}

const defaultContextValue: BookingsContextType = {
  bookings: null,
  loading: false,
  error: null,
  selectedService: null,
  selectedShop: null,
  shopSchedule: null,
  selectedDate: { date: null, formatted: "", employee: { id: "" } },
  selectedBooking: null,
  fetchBookings: async () => {},
  createBooking: async () => {},
  editBooking: async () => {},
  getServices: async () => [],
  getShop: async () => {},
  getSchedule: async () => {},
  setSelectedService: () => {},
  handleRescheduleBooking: async () => {},
  setSelectedShop: () => {},
  setShopSchedule: () => {},
  setSelectedDate: () => {},
  setSelectedBooking: () => {},
  cancelBooking: async () => {},
  reset: () => {},
};

const BookingsContext = createContext<BookingsContextType>(defaultContextValue);

export const BookingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedShop, setSelectedShop] = useState<any | null>(null);
  const [shopSchedule, setShopSchedule] = useState<any | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    date: null,
    formatted: "",
    employee: { id: "" },
  });

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await httpCall("GET", "bookings", {});
      if (response.data["hydra:member"]) {
        const bookings: Booking[] = response.data["hydra:member"].map(
          (bookingData: any): Booking => {
            return {
              id: bookingData.id,
              beginDateTime: bookingData.beginDateTime,
              endDateTime: bookingData.endDateTime,
              shop: bookingData.shop,
              employee: bookingData.employee,
              service: bookingData.service,
              status: bookingData.status,
              user: bookingData.user,
              comment: bookingData.comment ? bookingData.comment : "",
            };
          }
        );

        setBookings(bookings);
      } else setBookings(response.data);
    } catch (error) {
      setError("Failed to fetch bookings.");
      toast({
        title: "Error",
        description: "Failed to fetch bookings.",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id: number) => {
    setLoading(true);
    try {
      await httpCall("PATCH", `bookings/${id}/cancel`, {});
      toast({
        title: "Booking Cancelled",
        description: "Your booking was successfully cancelled.",
        status: "success",
      });
      fetchBookings();
    } catch (error) {
      setError("Failed to cancel booking.");
      toast({
        title: "Error",
        description: "Failed to cancel booking.",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async () => {
    if (
      !selectedService ||
      !selectedDate.date ||
      !selectedShop ||
      !selectedDate.employee
    ) {
      toast({
        title: "Missing Information",
        description: "Please select a service, date, and shop.",
        status: "error",
      });
      return;
    }
    const bookingStart = new Date(selectedDate.date);
    const bookingEnd = new Date(
      bookingStart.getTime() + selectedService.duration * 60000
    );

    const bookingDetails = {
      shop: `/shops/${selectedShop.id}`,
      employee: `/employees/${selectedDate.employee.id}`, // Assuming employee ID is stored in selectedDate
      service: `/services/${selectedService.id}`,
      beginDateTime: bookingStart.toISOString(),
      endDateTime: bookingEnd.toISOString(),
    };

    setLoading(true);
    try {
      const response = await httpCall("POST", "bookings", bookingDetails);
      setBookings([...(bookings || []), response.data]); // Update local state
      toast({
        title: "Booking Created",
        description: "Your booking was successfully created.",
        status: "success",
      });
      fetchBookings();
      navigate("/profile");
    } catch (error) {
      setError("Failed to create booking.");
      toast({
        title: "Error",
        description: "Failed to create booking. Please try again.",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const editBooking = async () => {
    if (
      !selectedBooking ||
      !selectedService ||
      !selectedDate.date ||
      !selectedDate.employee
    ) {
      toast({
        title: "Error",
        description: "No booking selected.",
        status: "error",
      });
      return;
    } else {
      const bookingStart = new Date(selectedDate.date);
      const bookingEnd = new Date(
        bookingStart.getTime() + selectedService.duration * 60000
      );

      if (
        new Date(selectedBooking.beginDateTime).getTime() <
          new Date().getTime() ||
        selectedBooking.status === "canceled"
      ) {
        await createBooking();
        return;
      } else {
        await httpCall("PATCH", `bookings/${selectedBooking.id}`, {
          beginDateTime: bookingStart,
          endDateTime: bookingEnd,
          employee: `/employees/${selectedDate.employee.id}`,
        });
        toast({
          title: "Booking Updated",
          description: "Your booking was successfully updated.",
          status: "success",
        });
        fetchBookings();
        navigate("/profile");
        return;
      }
    }
  };

  const handleRescheduleBooking = async (
    id: number,
    serviceIRI: string,
    shopId: number
  ) => {
    setLoading(true);
    try {
      const booking = await httpCall("GET", `bookings/${id}`, {});
      const serviceId = serviceIRI.split("/").pop();
      const service = await httpCall("GET", `services/${serviceId}`, {});
      const shop = await httpCall("GET", `shops/${shopId}`, {});
      setSelectedService(service.data);
      setSelectedShop(shop.data);
      setSelectedBooking(booking.data);
      navigate(`/booking/${shop.data.id}`);
      console.log("Rescheduling booking with ID:", id);
    } catch (error) {
      setError("Failed to reschedule booking.");
      toast({
        title: "Error",
        description: "Failed to reschedule booking.",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const getServices = async (shopId: string) => {
    setLoading(true);
    ("Getting services");
    try {
      const response: AxiosResponse<any, any> = await httpCall(
        "GET",
        `services?shop.id=${shopId}`,
        {}
      );
      response;
      // Accessing the hydra:member property which contains the array of services
      if (
        response &&
        response.data?.["hydra:member"] &&
        Array.isArray(response.data?.["hydra:member"])
      ) {
        return response.data?.["hydra:member"];
      } else {
        console.error(
          "Response from services endpoint does not contain hydra:member as an array:",
          response
        );
        return [];
      }
    } catch (error) {
      console.error("Failed to fetch services.", error);
      toast({
        title: "Error",
        description: "Failed to fetch services.",
        status: "error",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getShop = async (shopId: string) => {
    setLoading(true);
    try {
      const response = await httpCall("GET", `shops/${shopId}`, {});
      return response.data;
    } catch (error) {
      setError("Failed to fetch shop.");
      navigate("/"); // Redirect to home page
      toast({
        title: "Error",
        description: "Failed to fetch shop.",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const getSchedule = async (
    shopId: string,
    beginDate: string,
    endDate: string
  ) => {
    setLoading(true);
    try {
      const response = await httpCall(
        "GET",
        `shops/${shopId}/schedules?startDate=${beginDate}&endDate=${endDate}`,
        {}
      );
      setShopSchedule(response.data);
      return response.data;
    } catch (error) {
      setError("Failed to fetch schedule.");
      toast({
        title: "Error",
        description: "Failed to fetch schedule.",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setSelectedService(null);
    setShopSchedule(null);
    setSelectedDate({ date: null, formatted: "" });
    setSelectedBooking(null);
  };

  const value = useMemo(
    () => ({
      bookings,
      loading,
      error,
      selectedService,
      selectedBooking,
      selectedShop,
      shopSchedule,
      selectedDate,
      fetchBookings,
      createBooking,
      editBooking,
      getServices,
      getShop,
      setSelectedService,
      setSelectedBooking,
      setSelectedShop,
      setShopSchedule,
      getSchedule,
      setSelectedDate,
      cancelBooking,
      handleRescheduleBooking,
      reset,
    }),
    [
      bookings,
      loading,
      error,
      selectedService,
      selectedShop,
      selectedBooking,
      shopSchedule,
      selectedDate,
    ]
  );

  return (
    <BookingsContext.Provider value={value}>
      {children}
    </BookingsContext.Provider>
  );
};

export const useBookings = (): BookingsContextType => {
  return useContext(BookingsContext);
};
