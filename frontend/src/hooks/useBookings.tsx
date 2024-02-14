import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { httpCall } from "../services/http";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { ShopSchedule } from "../../types/schedule.d.ts";

interface Booking {
  id: string;
  // Define other booking properties
}

/**
 * [
    {
        "employee": {
            "id": 1,
            "name": "Juanito Rodriguez",
            "schedules": [],
            "leaves": [],
            "bookings": []
        }
    },
    {
        "employee": {
            "id": 2,
            "name": "Michelle Gonzales",
            "schedules": [],
            "leaves": [],
            "bookings": []
        }
    },
    {
        "employee": {
            "id": 3,
            "name": "Papito Munito",
            "schedules": [],
            "leaves": [],
            "bookings": []
        }
    }
]
 */
interface Schedule {
  employee: {
    id: number;
    name: string;
    schedules: any[];
    leaves: any[];
    bookings: any[];
  }[];
}

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
  selectedDate: Date | null;
  fetchBookings: () => Promise<void>;
  createBooking: (bookingDetails: any) => Promise<void>;
  updateBooking: (id: string, bookingDetails: any) => Promise<void>;
  getServices: (shopId: string) => Promise<Service[]>;
  getShop: (shopId: string) => Promise<void>;
  getSchedule: (
    shopId: string,
    beginDate: string,
    endDate: string
  ) => Promise<void>;
  setSelectedService: (service: Service | null) => void;
  setSelectedShop: (shop: any) => void;
  setShopSchedule: (schedule: any) => void;
  setSelectedDate: (date: Date | null) => void;
  reset: () => void;
}

const defaultContextValue: BookingsContextType = {
  bookings: null,
  loading: false,
  error: null,
  selectedService: null,
  selectedShop: null,
  shopSchedule: null,
  selectedDate: null,
  fetchBookings: async () => {},
  createBooking: async () => {},
  updateBooking: async () => {},
  getServices: async () => [],
  getShop: async () => {},
  getSchedule: async () => {},
  setSelectedService: () => {},
  setSelectedShop: () => {},
  setShopSchedule: () => {},
  setSelectedDate: () => {},
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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await httpCall("GET", "bookings", {});
      setBookings(response.data);
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

  const createBooking = async (bookingDetails: any) => {
    setLoading(true);
    try {
      await httpCall("POST", "bookings", bookingDetails);
      toast({
        title: "Success",
        description: "Booking created successfully.",
        status: "success",
      });
      fetchBookings(); // Refresh the list
    } catch (error) {
      setError("Failed to create booking.");
      toast({
        title: "Error",
        description: "Failed to create booking.",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateBooking = async (id: string, bookingDetails: any) => {
    setLoading(true);
    try {
      await httpCall("PUT", `bookings/${id}`, bookingDetails);
      toast({
        title: "Success",
        description: "Booking updated successfully.",
        status: "success",
      });
      fetchBookings(); // Refresh the list
    } catch (error) {
      setError("Failed to update booking.");
      toast({
        title: "Error",
        description: "Failed to update booking.",
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
    setSelectedDate(null);
  };

  const value = useMemo(
    () => ({
      bookings,
      loading,
      error,
      selectedService,
      selectedShop,
      shopSchedule,
      selectedDate,
      fetchBookings,
      createBooking,
      updateBooking,
      getServices,
      getShop,
      setSelectedService,
      setSelectedShop,
      setShopSchedule,
      getSchedule,
      setSelectedDate,
      reset
    }),
    [
      bookings,
      loading,
      error,
      selectedService,
      selectedShop,
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
