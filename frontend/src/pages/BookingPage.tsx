import { Box, Heading, Button } from "@chakra-ui/react";
import { useAuth } from "../hooks/useAuth";

const BookingPage = () => {

  const logout = useAuth().logout;

  return (
    <Box>
      <Heading as="h1" size="2xl" textAlign="center" mb={8}>
        <Button colorScheme="purple" onClick={() => logout()}>
          Logout
        </Button>
        Book
      </Heading>
    </Box>
  );
};

export default BookingPage;
