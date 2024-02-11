import { Card, Heading } from "@chakra-ui/react";

export const PastBookings = () => {
  return (
    <Card p={8} h={"100%"}>
      <Heading as="h1" size="lg" textAlign="left" mb={8} fontWeight={500}>
        My past bookings
      </Heading>
    </Card>
  );
};
