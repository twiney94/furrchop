import { 
  Card,
  CardBody,
  CardFooter,
  Stack, 
  Text, 
  Image, 
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Flex,
  Badge,
  } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { useReviewCard } from "../../hooks/useReviewCard";
import { Booking } from "../../hooks/useBookings";
import ButtonModal  from "../UI/buttonModal";
type WaitReviewCardProps = {
  showImage?: boolean;
  booking: Booking
}


export const WaitReviewCard:FC<WaitReviewCardProps> = ({showImage=true, booking}) => {
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


