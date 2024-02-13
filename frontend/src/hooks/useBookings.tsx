import { createContext, useContext, useMemo, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { httpCall } from '../services/http';

// Define types for clarity and TypeScript support
interface Booking {
  id: string;
  // Define other booking properties
}

interface BookingsContextType {
  bookings: Booking[] | null;
  loading: boolean;
  error: string | null;
  fetchBookings: () => Promise<void>;
  createBooking: (bookingDetails: any) => Promise<void>;
  updateBooking: (id: string, bookingDetails: any) => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
}

const defaultContextValue: BookingsContextType = {
  bookings: null,
  loading: false,
  error: null,
  fetchBookings: async () => {},
  createBooking: async () => {},
  updateBooking: async () => {},
  deleteBooking: async () => {},
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

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await httpCall('GET', 'bookings', {});
      setBookings(response.data);
    } catch (error) {
      setError('Failed to fetch bookings.');
      toast({
        title: 'Error',
        description: 'Failed to fetch bookings.',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async (bookingDetails: any) => {
    setLoading(true);
    try {
      await httpCall('POST', 'bookings', bookingDetails);
      toast({
        title: 'Success',
        description: 'Booking created successfully.',
        status: 'success',
      });
      fetchBookings(); // Refresh the list
    } catch (error) {
      setError('Failed to create booking.');
      toast({
        title: 'Error',
        description: 'Failed to create booking.',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateBooking = async (id: string, bookingDetails: any) => {
    setLoading(true);
    try {
      await httpCall('PUT', `bookings/${id}`, bookingDetails);
      toast({
        title: 'Success',
        description: 'Booking updated successfully.',
        status: 'success',
      });
      fetchBookings(); // Refresh the list
    } catch (error) {
      setError('Failed to update booking.');
      toast({
        title: 'Error',
        description: 'Failed to update booking.',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (id: string) => {
    setLoading(true);
    try {
      await httpCall('DELETE', `bookings/${id}`, {});
      toast({
        title: 'Success',
        description: 'Booking deleted successfully.',
        status: 'success',
      });
      fetchBookings(); // Refresh the list
    } catch (error) {
      setError('Failed to delete booking.');
      toast({
        title: 'Error',
        description: 'Failed to delete booking.',
        status: 'error',
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
      fetchBookings,
      createBooking,
      updateBooking,
      deleteBooking,
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
