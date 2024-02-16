import { 
  Card,
  CardBody,
  CardFooter,
  Stack, 
  Text, 
  Heading,
  } from "@chakra-ui/react";
import { FC } from "react";
import { Service } from "../../hooks/useBookings";
import ButtonModal  from "../UI/buttonModal";
import ChopperType from "../../types/chopper";
import EmployeeType from "../../types/employeType";
type WaitReviewCardProps = {
  booking: Booking
}

interface Booking {
  id: number;
  beginDateTime: string; // ou Date si vous convertissez les chaînes de date en objets Date
  endDateTime: string; // ou Date
  service: Service;
  comment: string;
  status: string;
  shop: ChopperType;
  employee : EmployeeType;
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
