import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Text,
  Image,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { Booking } from "../../types/schedule";
import { ConfirmationDialog } from "./ConfirmationDialog";

interface BookingCardProps {
  booking: Booking;
  onCancel: () => void;
  onReschedule: (bookingId: number, serviceId: string, shopId: number) => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onCancel,
  onReschedule,
}) => {
  // Thursday, August 19, 2021
  const humanReadableDateTime = new Date(
    booking.beginDateTime
  ).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const europeanHours = new Date(booking.beginDateTime).toLocaleTimeString(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCancelBooking = () => {
    onCancel();
    onClose();
  };

  const handleRescheduleBooking = () => {
    onReschedule(booking.id, booking.service["@id"], booking.shop.id);
  };

  const cardFooter = () => {
    if (booking.status === "validated") {
      return (
        <CardFooter display={"flex"} justify={"space-between"}>
          <Button
            variant="outline"
            colorScheme="brand"
            onClick={handleRescheduleBooking}
          >
            Reschedule
          </Button>
          <Button variant="solid" colorScheme="red" onClick={onOpen}>
            Cancel
          </Button>
        </CardFooter>
      );
    } else {
      return (
        <CardFooter display={"flex"} justify={"space-between"}>
          <Button
            variant="solid"
            colorScheme="brand"
            onClick={handleRescheduleBooking}
          >
            Reschedule
          </Button>
          <Text display={"flex"} alignItems={"center"}>
            This booking has been cancelled.
          </Text>
        </CardFooter>
      );
    }
  };
  if (booking) {
    return (
      <>
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          background={booking.status === "validated" ? "white" : "gray.100"}
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src="https://live.staticflickr.com/754/21616753858_086bd43ee2_z.jpg"
            alt="Cute Dog"
          />

          <Stack className="w-full">
            <CardBody
              display={"flex"}
              flexDirection={"column"}
              alignItems={"baseline"}
            >
              <Heading size="md" fontWeight={500}>
                {humanReadableDateTime} - {europeanHours}
              </Heading>

              <Text>
                {booking.shop.name} - {booking.shop.address}
              </Text>

              <Text>
                {booking.service.name} - {booking.service.price / 100}€
              </Text>
            </CardBody>

            {cardFooter()}
          </Stack>
        </Card>
        <ConfirmationDialog
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={handleCancelBooking}
          title="Cancel your booking"
          message={`Are you sure you want to delete your booking with ${booking.shop.name} on ${humanReadableDateTime} at ${europeanHours}? This action cannot be undone.`}
        />
      </>
    );
  } else {
    return (
      <Card>
        <CardBody>
          <Text>Loading...</Text>
        </CardBody>
      </Card>
    )
  }
};
