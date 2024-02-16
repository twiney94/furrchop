import {
  Box,
  Card,
  Heading,
  Button,
  Stack,
} from "@chakra-ui/react";
import { SetStateAction, useEffect, useState } from "react";
import { useReviewCard } from "../../hooks/useReviewCard";
import { AlreadyReviewCard } from "../common/AlreadyReviewCard.";

const AlreadyReview = () => {
  const { getReviewBookings, reviews} = useReviewCard();

  useEffect(()  => {    
    getReviewBookings()
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3; // Adjust the number of bookings per page as needed
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews?.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  console.log(reviews);
  // Change page
  const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber);

  // Total pages
  const totalPages = Math.ceil(reviews?.length ?? 0 / reviewsPerPage);


  return (
    <Card p={8} h={"100%"}>
      <Heading as="h1" size="lg" textAlign="left" mb={8} fontWeight={500}>
        Already reviews
      </Heading>
      <Stack spacing={4}>
        {currentReviews?.map((_review, index) => (
          <AlreadyReviewCard key={index}  reviews={_review} /> // Render BookingCard for each booking
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

export default AlreadyReview;
