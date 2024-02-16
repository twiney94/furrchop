import { createContext, useContext, useMemo, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { httpCall } from "../services/http";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import ChopperType from "../types/chopper";
import EmployeeType from "../types/employeType";

export interface Booking {
  id: number;
  beginDateTime: string; // ou Date si vous convertissez les chaînes de date en objets Date
  endDateTime: string; // ou Date
  service: Service;
  comment: string;
  status: string;
  shop: ChopperType;
  employee : EmployeeType;
}


export interface Service {
  description: string;
  duration: number;
  id: string;
  name: string;
  price: number;
}

export interface Reviews {
  id: number;
  entityId: number;
  userId: number;
  rating: number;
  comment: string;
  createdAt: Date;
}

interface BookingsContextType {
  bookings: Booking[] | null;
  reviews: Reviews[] | null;
  loading: boolean;
  error: string | null;
  selectedService: Service | null;
  selectedShop: any;
  shopSchedule: any;
  getReviewBookings: () => Promise<void>;
  getUnreviewBookings: () => Promise<void>;
  fetchBookings: () => Promise<void>;
  createBooking: (bookingDetails: any) => Promise<void>;
  createReviewBooking: (id: number, reviewDetails: any) => Promise<void>;
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
}

const defaultContextValue: {
  updateBooking: () => Promise<void>;
  selectedService: null;
  setSelectedService: () => void;
  getShop: () => Promise<void>;
  loading: boolean;
  error: null;
  getSchedule: () => Promise<void>;
  shopSchedule: null;
  fetchBookings: () => Promise<void>;
  setShopSchedule: () => void;
  getReviewBookings: () => Promise<void>;
  getUnreviewBookings: () => Promise<void>;
  createReviewBooking: () => Promise<void>;
  getServices: () => Promise<any[]>;
  setSelectedShop: () => void;
  bookings: null;
  reviews: null;
  selectedShop: null;
  createBooking: () => Promise<void>
} = {
  reviews: null,
  bookings: null,
  loading: false,
  error: null,
  selectedService: null,
  selectedShop: null,
  shopSchedule: null,
  getReviewBookings: async () => {},
  getUnreviewBookings: async () => {},
  fetchBookings: async () => {},
  createBooking: async () => {},
  createReviewBooking: async () => {},
  updateBooking: async () => {},
  getServices: async () => [],
  getShop: async () => {},
  getSchedule: async () => {},
  setSelectedService: () => {},
  setSelectedShop: () => {},
  setShopSchedule: () => {},
};

const BookingsContext = createContext<BookingsContextType>(defaultContextValue);

export const ReviewProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [reviews, setReviews] = useState<Reviews[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedShop, setSelectedShop] = useState<any | null>(null);
  const [shopSchedule, setShopSchedule] = useState<any | null>(null);

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
  


  const getReviewBookings = async () => {
    setLoading(true);
    try {
      const response = await httpCall("GET", "reviews", {});
      setReviews(response.data["hydra:member"]);
    } catch (error) {
      setError("Failed to fetch reviews.");
      toast({
        title: "Error",
        description: "Failed to fetch reviews.",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const getUnreviewBookings = async () => {
    setLoading(true);
    try {
      const response = await httpCall("GET", "unreviewed-bookings", {});
      console.log(response, 'paul');
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

  const createReviewBooking = async (id:number, reviewDetails: {
    bookings: string;
    comment: string;
    rating: number;
  }) => {
    setLoading(true);
    try {
      await httpCall("POST", `reviews`, reviewDetails);
      toast({
        title: "Success",
        description: "Booking updated successfully.",
        status: "success",
      });
      getUnreviewBookings(); // Refresh the list
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
      const body = {
        startDate: beginDate,
        endDate: endDate,
      };

      console.log(body);
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

  const value = useMemo(
    () => ({
      reviews,
      bookings,
      loading,
      error,
      selectedService,
      selectedShop,
      shopSchedule,
      getReviewBookings,
      getUnreviewBookings,
      fetchBookings,
      createBooking,
      updateBooking,
      getServices,
      createReviewBooking,
      getShop,
      setSelectedService,
      setSelectedShop,
      setShopSchedule,
      getSchedule,
    }),
    [bookings, loading, error, selectedService, selectedShop, shopSchedule]
  );

  return (
    <BookingsContext.Provider value={value}>
      {children}
    </BookingsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useReviewCard = (): BookingsContextType => {
  return useContext(BookingsContext);
};
