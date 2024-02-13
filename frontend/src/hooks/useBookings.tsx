import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { httpCall } from "../services/http";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

interface Booking {
  id: string;
  // Define other booking properties
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
  fetchBookings: () => Promise<void>;
  createBooking: (bookingDetails: any) => Promise<void>;
  updateBooking: (id: string, bookingDetails: any) => Promise<void>;
  getServices: (shopId: string) => Promise<Service[]>;
  getShop: (shopId: string) => Promise<void>;
  setSelectedService: (service: Service) => void;
  setSelectedShop: (shop: any) => void; 
}

const defaultContextValue: BookingsContextType = {
  bookings: null,
  loading: false,
  error: null,
  selectedService: null,
  selectedShop: null,
  fetchBookings: async () => {},
  createBooking: async () => {},
  updateBooking: async () => {},
  getServices: async () => [],
  getShop: async () => {},
  setSelectedService: () => {},
  setSelectedShop: () => {}
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
      (response);
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

  const value = useMemo(
    () => ({
      bookings,
      loading,
      error,
      selectedService,
      selectedShop,
      fetchBookings,
      createBooking,
      updateBooking,
      getServices,
      getShop,
      setSelectedService,
      setSelectedShop
    }),
    [bookings, loading, error]
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
