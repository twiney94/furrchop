import { Button, Card, Heading, Text, Flex } from "@chakra-ui/react";
import type { Service } from "../../../hooks/useBookings";
import { useNavigate } from "react-router-dom";

export const ServiceCard = ({ service }: { service: Service }) => {
  const navigate = useNavigate();

  return (
    <Card
      display={"flex"}
      direction={"row"}
      justify={"space-between"}
      alignItems={"center"}
      p={4}
    >
      <Heading as="h2" size="sm" fontWeight={500}>
        {service.name}
      </Heading>
      <Flex gap={8} alignItems={"center"}>
        <Text fontSize="md" display={"flex"} gap={2} color={"gray.500"}>
          {service.duration} minutes - {service.price / 100} €
        </Text>
        <Button colorScheme="brand" variant="solid" size="sm" onClick={() => navigate(`/booking/${service.id}`)}>
          Book
        </Button>
      </Flex>
    </Card>
  );
};

export default ServiceCard;
