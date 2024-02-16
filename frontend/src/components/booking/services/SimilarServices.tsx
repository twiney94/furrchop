import axios from 'axios';
import { Box, Text, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface SimilarServicesProps {
  serviceId: string;
}

const SimilarServices: React.FC<SimilarServicesProps> = ({ serviceId }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [similarServices, setSimilarServices] = useState<string[]>([]);

  useEffect(() => {
    const fetchSimilarServices = async () => {
      try {
        const response = await axios.get<string[]>(`/service/${serviceId}/suggest`);
        setSimilarServices(response.data);
      } catch (error) {
        console.error('Error fetching similar services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarServices();
  }, [serviceId]);

  return (
    <Box>
      <Text fontWeight="bold" mb="4">Services similaires :</Text>
      {loading ? (
        <Spinner size="md" color="blue.500" />
      ) : (
        similarServices.map((similarServiceId) => (
          <Box key={similarServiceId} mb="2">
            <Text>{similarServiceId}</Text>
            {/* Ajouter plus de détails sur chaque service */}
          </Box>
        ))
      )}
    </Box>
  );
};

export default SimilarServices;