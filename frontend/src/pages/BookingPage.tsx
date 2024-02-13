import { Box, Heading, Card, Text, Icon } from "@chakra-ui/react";
import { MdLocationOn } from "react-icons/md";
import Services from "../components/booking/services/Services";
import { useBookings } from "../hooks/useBookings";
import { useEffect, useState } from "react";

const BookingPage = () => {
  const shopId = window.location.pathname.split("/")[2];
  const { getShop } = useBookings();
  const [ shopInfos, setShopInfos ] = useState<any>({}); // Update the type of shopInfos to any

  useEffect(() => {
    const getShopInfos = async () => {
      setShopInfos(await getShop(shopId));
    }
    getShopInfos();
    console.log(shopInfos)
  }, [shopId]);

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Card w={"70%"} p={8} textAlign="left">
        <Heading as="h1" size="md" fontWeight={500}>
          {shopInfos.name}
        </Heading>
        <Text fontSize="md" display={"flex"} gap={2} mb={8} textDecoration={"underline"} color={"gray.500"}>
          <Icon as={MdLocationOn} />{shopInfos.address}
        </Text>
        <Card mb={8} p={32} textAlign={"center"} bgGradient={"linear(to-r, brand.500, brand.900)"}>
          <Text fontSize="3xl" fontWeight={500} color={"white"}>
            {shopInfos.name}
          </Text>
        </Card>
        <Text mb={4} color={"gray.400"}>Book immediatly your appointment at {shopInfos.name}</Text>
        <Services shopId={shopId} />
      </Card>
    </Box>
  );
};

export default BookingPage;
