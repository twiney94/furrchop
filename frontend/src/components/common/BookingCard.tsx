import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";
import { Booking } from "../../types/schedule";

interface BookingCardProps {
  booking: Booking;
  index: number;
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking, index }) => {
  // Thursday, August 19, 2021
  const humanReadableDateTime = new Date(booking.beginDateTime).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <Card
      key={index}
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Caffe Latte"
      />

      <Stack>
        <CardBody>
          <Heading size="md" fontWeight={500}>{humanReadableDateTime}</Heading>

          <Text>
            {booking.shop.name} - {booking.shop.address}
          </Text>
        </CardBody>

        <CardFooter display={"flex"} justify={"space-between"}>
          <Button variant="outline" colorScheme="brand">
            Reschedule
          </Button>
          <Button variant="solid" colorScheme="red">
            Cancel
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};
