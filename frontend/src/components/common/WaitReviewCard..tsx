import { 
  Card,
  CardBody,
  CardFooter,
  Stack, 
  Text, 
  Heading,
  } from "@chakra-ui/react";
import { FC } from "react";
import { Booking } from "../../hooks/useBookings";
import ButtonModal  from "../UI/buttonModal";
type WaitReviewCardProps = {
  booking: Booking
}


export const WaitReviewCard:FC<WaitReviewCardProps> = ({booking}) => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
  
      <Stack>
        <CardBody>
          <Heading size="md">{booking.shop.name}</Heading>

          <Text py="2">
            {booking.service.description}
          </Text>
        </CardBody>

        <CardFooter>
          <ButtonModal bookingId = {booking.id} />
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default WaitReviewCard;
