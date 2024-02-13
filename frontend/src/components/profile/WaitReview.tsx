import {
  Box,
  SimpleGrid,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
  Card,
  Heading,
  Button,
  Stack,
} from "@chakra-ui/react";
import groomingDog from "/groomingdog.jpeg";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { SetStateAction, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { BookingCard } from "../common/BookingCard";
import { WaitReviewCard } from "../common/WaitReviewCard.";


const WaitReview = () => {
  // return (
  //   <Card p={8} h={"100%"}>
  //     <Heading as="h1" size="lg" textAlign="left" mb={8} fontWeight={500}>
  //       Waiting reviews
  //     </Heading>
  //   </Card>
  // );
  const bookings = new Array(30).fill(null).map((_, index) => ({
    id: index,
    title: `Booking ${index + 1}`,
    description: "This is a placeholder description for the booking.",
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 3; // Adjust the number of bookings per page as needed

  // Calculate the current bookings to display
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  // Change page
  const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber);

  // Total pages
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);
  return (
    <Card p={8} h={"100%"} maxH={"100%"}>
      <Heading as="h1" size="lg" textAlign="left" mb={8} fontWeight={500}>
      Waiting reviews
      </Heading>
      <Stack spacing={4}>
        {currentBookings.map((_booking, index) => (
          <WaitReviewCard key={index} showImage={false} /> // Render BookingCard for each booking
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

export default WaitReview;
