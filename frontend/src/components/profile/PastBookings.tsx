import { Card, Heading, Stack, Button, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BookingCard } from "../common/BookingCard";
import { useBookings } from "../../hooks/useBookings";
import type { Booking } from "../../types/schedule";

export const PastBookings = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const bookingsPerPage = 3; // Adjust the number of bookings per page as needed
  const { fetchBookings, bookings } = useBookings();

  useEffect(() => {
    fetchBookings();
  }, []);

  const currentBookings: Booking[] =
    bookings && bookings.length > 0
      ? bookings.slice(
          (currentPage - 1) * bookingsPerPage,
          currentPage * bookingsPerPage
        )
      : [];

  const totalPages = bookings
    ? Math.ceil(bookings.length / bookingsPerPage)
    : 0;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  console.log(bookings);

  return (
    <Card p={8} h={"100%"} maxH={"100%"}>
      <Heading as="h1" size="lg" textAlign="left" mb={8} fontWeight={500}>
        My Past Bookings
      </Heading>
      <Stack spacing={4}>
        {currentBookings.map((booking: Booking, index) => (
          <BookingCard key={index} booking={booking} index={index} />
        ))}
      </Stack>
      <Box display="flex" justifyContent="center" mt={4}>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            mx={1}
            colorScheme="teal"
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
