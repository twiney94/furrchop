import { Flex, Heading, Text } from "@chakra-ui/react";
import ServiceCard from "./ServiceCard";
import { useBookings } from "../../../hooks/useBookings";
import { useEffect, useState } from "react";
import type { Service } from "./ServiceCard";

export const Services = ({ shopId }: { shopId: string }) => {
  const { getServices, loading } = useBookings();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    console.log('Effect running with shopId:', shopId); // Diagnostic: Confirm effect runs and shopId is correct
    const fetchServices = async () => {
      if (!getServices) {
        console.error("getServices function is not available");
        return;
      }

      try {
        const fetchedServices = await getServices(shopId);
        if (Array.isArray(fetchedServices)) {
          setServices(fetchedServices);
        } else {
          console.error("fetchedServices is not an array", fetchedServices);
          setServices([]); // Default to an empty array if the fetched result isn't an array
        }
      } catch (error) {
        console.error("Failed to fetch services", error);
        setServices([]); // Default to an empty array on error
      }
    };

    if (shopId) { // Ensure shopId is not empty or undefined
      fetchServices();
    } else {
      console.error("shopId is undefined or empty");
    }
  }, [shopId]);

  return (
    <Flex direction="column" gap={4}>
      <Heading as="h1" size="md" fontWeight={500}>
        Shop's Services
      </Heading>
      {loading ? (
        <Text>Loading...</Text>
      ) : services.length > 0 ? (
        services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))
      ) : (
        <Text>No services available</Text>
      )}
    </Flex>
  );
};

export default Services;
