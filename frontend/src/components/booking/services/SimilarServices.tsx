import axios from 'axios';
import { Box, Text, Spinner } from '@chakra-ui/react';

const SimilarServices = ({ serviceId }) => {
  const [loading, setLoading] = useState(true);
  const [similarServices, setSimilarServices] = useState([]);

  useEffect(() => {
    const fetchSimilarServices = async () => {
      try {
        const response = await axios.get(`/service/${serviceId}/suggest`);
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
            {/* Vous pouvez ajouter plus de détails sur chaque service ici */}
          </Box>
        ))
      )}
    </Box>
  );
};

export default SimilarServices;
