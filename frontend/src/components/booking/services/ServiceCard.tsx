import { Box, Card, Heading, Text } from "@chakra-ui/react";

export interface Service {
  shop: string;
  name: string;
  description: string;
  price: number;
  duration: number;
}

export const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <Card display={"flex"} direction={"row"} justify={"space-between"} alignItems={"center"} p={4}>
      <Heading as="h2" size="sm" fontWeight={500}>
        {service.name}
      </Heading>
      <Text fontSize="md" display={"flex"} gap={2} color={"gray.500"}>
        {service.duration} minutes - {service.price}€
      </Text>
    </Card>
  );
};

export default ServiceCard;