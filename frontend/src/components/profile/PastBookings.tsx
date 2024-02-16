import { Card, Heading, Stack, Button, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BookingCard } from "../common/BookingCard";
import { useBookings } from "../../hooks/useBookings";
import type { Booking } from "../../types/schedule";

export const PastBookings = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const bookingsPerPage = 3; // Adjust the number of bookings per page as needed
  const { fetchBookings, bookings, cancelBooking, handleRescheduleBooking } =
    useBookings();

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = (bookingId: number) => {
    cancelBooking(bookingId);
  };

  const reschedule = (bookingId: number, serviceId: string, shopId: number) => {
    handleRescheduleBooking(bookingId, serviceId, shopId);
  };

  const sortedBookings: Booking[] = bookings?.sort((a, b) => {
    if (a.status === "validated" && b.status === "canceled") {
      return -1;
    } else if (a.status === "canceled" && b.status === "validated") {
      return 1;
    } else {
      return (
        new Date(b.beginDateTime).getTime() -
        new Date(a.beginDateTime).getTime()
      );
    }
  }) ?? [];

  const currentBookings: Booking[] =
    sortedBookings && sortedBookings.length > 0
      ? sortedBookings.slice(
          (currentPage - 1) * bookingsPerPage,
          currentPage * bookingsPerPage
        )
      : [];

  const totalPages = sortedBookings
    ? Math.ceil(sortedBookings.length / bookingsPerPage)
    : 0;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  return (
    <Card p={8} h={"100%"} maxH={"100%"}>
      <Heading as="h1" size="lg" textAlign="left" mb={8} fontWeight={500}>
        My Bookings
      </Heading>
      <Stack spacing={4}>
        {currentBookings.map((booking: Booking, index) => (
          <BookingCard
            key={index}
            booking={booking}
            onCancel={() => handleCancelBooking(booking.id)}
            onReschedule={reschedule}
          />
        ))}
      </Stack>
      <Box display="flex" justifyContent="center" mt={4}>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            mx={1}
            colorScheme="brand"
            onClick={() => paginate(index + 1)}
            isActive={currentPage === index + 1}
          >
            {index + 1}
          </Button>
        ))}
      </Box>
    </Card>
  );
};
