import { Flex, Text } from "@chakra-ui/react";
import ServiceCard from "./ServiceCard";
import { useBookings } from "../../../hooks/useBookings";
import { useEffect, useState } from "react";
import type { Service } from "../../../hooks/useBookings";
import CustomerReview from "./customerReview/customerReview";

export const Services = ({ shopId }: { shopId: string }) => {
  const { getServices, loading } = useBookings();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
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

    if (shopId) {
      // Ensure shopId is not empty or undefined
      fetchServices();
    } else {
      console.error("shopId is undefined or empty");
    }
  }, []);

   return (
    <Flex direction="column" gap={4}>
      {loading ? (
        <Text>Loading...</Text>
      ) : services.length > 0 ? (
        services.map((service) => (
          <Flex key={service.id} direction="column" gap={2}>
            <ServiceCard service={service} />
            <CustomerReview serviceId={service.id} />
          </Flex>
        ))
      ) : (
        <Text>No services available</Text>
      )}
    </Flex>
  );
};

export default Services;
