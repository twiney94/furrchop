import {
  Grid,
  Box,
  Heading,
  Card,
  Text,
  Icon,
  Flex,
  GridItem,
} from "@chakra-ui/react";
import { MdLocationOn } from "react-icons/md";
import Services from "../components/booking/services/Services";
import { Service, useBookings } from "../hooks/useBookings";
import { useEffect } from "react";
import ServiceCard from "../components/booking/services/ServiceCard";
import { BookingCalendar } from "../components/booking/BookingCalendar";
import { useNavigate } from "react-router-dom";

const BookingPage = ({ mode }: { mode: string }) => {
  const { getShop, selectedShop, setSelectedShop, selectedService } =
    useBookings();
  const shopId = window.location.pathname.split("/")[2];
  const navigate = useNavigate();

  useEffect(() => {
    const getShopInfos = async () => {
      if (!selectedShop) setSelectedShop(await getShop(shopId));
    };
    getShopInfos();
  }, []);

  if (mode === "landing") {
    if (!selectedShop) return <div>Loading...</div>;

    return (
      <Box display={"flex"} justifyContent={"center"}>
        <Card w={"70%"} p={8} textAlign="left">
          <Heading as="h1" size="md" fontWeight={500}>
            {selectedShop.name}
          </Heading>
          <Text
            fontSize="md"
            display={"flex"}
            gap={2}
            mb={8}
            textDecoration={"underline"}
            color={"gray.500"}
          >
            <Icon as={MdLocationOn} />
            {selectedShop.address}
          </Text>
          <Card
            mb={8}
            p={32}
            textAlign={"center"}
            bgGradient={"linear(to-r, brand.500, brand.900)"}
          >
            <Text fontSize="3xl" fontWeight={500} color={"white"}>
              {selectedShop.name}
            </Text>
          </Card>
          <Text mb={4} color={"gray.400"}>
            Book immediatly your appointment at {selectedShop.name}
          </Text>
          <Heading as="h1" size="md" fontWeight={500}>
            Shop's Services
          </Heading>
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            <GridItem colSpan={2}>
              <Services shopId={shopId} />
            </GridItem>
            <GridItem colSpan={1}>
              <Card w={"100%"} h={"400px"} p={8} textAlign="left" />
            </GridItem>
          </Grid>
        </Card>
      </Box>
    );
  } else {
    if (!selectedService) {
      navigate(`/book/${shopId}`);
      return;
    }

    return (
      <Box display={"flex"} justifyContent={"center"}>
        <Card w={"70%"} p={8} textAlign="left">
          <Heading as="h1" size="md" fontWeight={500}>
            {selectedShop.name}
          </Heading>
          <Text
            fontSize="md"
            display={"flex"}
            gap={2}
            mb={8}
            textDecoration={"underline"}
            color={"gray.500"}
          >
            <Icon as={MdLocationOn} />
            {selectedShop.address}
          </Text>
          <Flex gap={4} mb={8} direction={"column"}>
            <Heading as="h1" size="md" color={"brand.300"} fontWeight={500}>
              1. Selected service
            </Heading>
            <ServiceCard
              service={selectedService as Service}
              mode="confirmation"
            />
            <Heading as="h1" size="md" color={"brand.300"} fontWeight={500}>
              2. Pick a date
            </Heading>
            <BookingCalendar shopId={shopId} />
          </Flex>
        </Card>
      </Box>
    );
  }
};

export default BookingPage;
