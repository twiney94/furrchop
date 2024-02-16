import {
  Box,
  Card,
  Heading,
  Button,
  Stack,
} from "@chakra-ui/react";
import { SetStateAction, useEffect, useState } from "react";
import { WaitReviewCard } from "../common/WaitReviewCard.";
import { useReviewCard } from "../../hooks/useReviewCard";


const WaitReview = () => {
  // return (
  //   <Card p={8} h={"100%"}>
  //     <Heading as="h1" size="lg" textAlign="left" mb={8} fontWeight={500}>
  //       Waiting reviews
  //     </Heading>
  //   </Card>
  // );
  const { getUnreviewBookings, bookings} = useReviewCard();

  useEffect(()  => {    
    getUnreviewBookings()
  }, []);



  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 3; // Adjust the number of bookings per page as needed

  // Calculate the current bookings to display
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings?.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  // Change page
  const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber);

  // Total pages
  const totalPages = Math.ceil(bookings?.length ?? 0 / bookingsPerPage);
  return (
    <Card p={8} h={"100%"} maxH={"100%"}>
      <Heading as="h1" size="lg" textAlign="left" mb={8} fontWeight={500}>
      Waiting reviews
      </Heading>
      <Stack spacing={4}>
        {currentBookings?.map((_booking, index) => (
          <WaitReviewCard key={index}  booking={_booking} /> // Render BookingCard for each booking
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
