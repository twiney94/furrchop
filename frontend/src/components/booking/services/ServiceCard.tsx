import { Button, Card, Heading, Text, Flex, Link } from "@chakra-ui/react";
import type { Service } from "../../../hooks/useBookings";
import { useNavigate } from "react-router-dom";
import { useBookings } from "../../../hooks/useBookings";


export const ServiceCard = ({ service, mode }: { service: Service, mode?: "confirmation" }) => {
  const navigate = useNavigate();
  const { setSelectedService } = useBookings();

  const setServiceAndNavigate = (service: Service, cancel?: string) => () => {
    setSelectedService(service);
    if (cancel) {
      navigate(`/book/`);
      return;
    }
    navigate(`/booking/${service.id}`);
  }

  return (
    <Card
      display={"flex"}
      direction={"row"}
      justify={"space-between"}
      alignItems={"center"}
      p={4}
    >
      <Heading as="h2" size="sm" fontWeight={500}>
        {service?.name}
      </Heading>
      <Flex gap={8} alignItems={"center"}>
        <Text fontSize="md" display={"flex"} gap={2} color={"gray.500"}>
          {service.duration} minutes - {service.price / 100} €
        </Text>
        {mode === undefined && (
          <Button colorScheme="brand" variant="solid" size="sm" onClick={setServiceAndNavigate(service)}>
            Book
          </Button>
        )}
        {mode === "confirmation" && (
          <Link colorScheme="brand" variant="solid" size="sm" onClick={setServiceAndNavigate(service)}>
            Delete
          </Link>
        )}
      </Flex>
    </Card>
  );
};

export default ServiceCard;
