import { Box, Heading, Button } from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';
import MyCalendar from '../components/Booking/MyCalendar';

const BookingPage = () => {
  const logout = useAuth().logout;

  return (
    <>
      <Box>
        <Heading as="h1" size="2xl" textAlign="center" mb={8}>
          <Button colorScheme="purple" onClick={() => logout()}>
            Logout
          </Button>
          Book
        </Heading>
      </Box>
      <Box>
        <Heading as="h2" size="xl" mb={4}>
          Book a chop
        </Heading>
        <MyCalendar />
      </Box>
    </>
  );
};

export default BookingPage;
