import { Button, Card, Heading, Text, Flex } from "@chakra-ui/react";

export interface Service {
  shop: string;
  name: string;
  description: string;
  price: number; // In cents
  duration: number;
}

export const ServiceCard = ({ service }: { service: Service }) => {
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
        <Button colorScheme="brand" variant="solid" size="sm">
          Book
        </Button>
      </Flex>
    </Card>
  );
};

export default ServiceCard;
