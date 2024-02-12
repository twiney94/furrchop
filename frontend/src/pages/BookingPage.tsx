import { Box, Heading, Card, Text, Icon } from "@chakra-ui/react";
import { MdLocationOn } from "react-icons/md";
import Services from "../components/booking/services/Services";

const BookingPage = () => {
  const shopId = window.location.pathname.split("/")[2];

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Card w={"70%"} p={8} textAlign="left">
        <Heading as="h1" size="md" fontWeight={500}>
          Los Santos - Paris 11
        </Heading>
        <Text fontSize="md" display={"flex"} gap={2} mb={8} textDecoration={"underline"} color={"gray.500"}>
          <Icon as={MdLocationOn} /> 106 Av. de la République
        </Text>
        <Services shopId={shopId} />
      </Card>
    </Box>
  );
};

export default BookingPage;
