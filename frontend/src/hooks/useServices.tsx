import { createContext, useContext, useMemo, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import * as furrService from '../services/service';

interface ServicesContextType {
  services: any[];
  loading: boolean;
  error: string | null;
  fetchServices: () => Promise<void>;
  createService: (serviceDetails: any) => Promise<void>;
  updateService: (id: string, serviceDetails: any) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
}

const defaultContextValue: ServicesContextType = {
  services: [],
  loading: false,
  error: null,
  fetchServices: async () => {},
  createService: async () => {},
  updateService: async () => {},
  deleteService: async () => {},
};

const ServicesContext = createContext<ServicesContextType>(defaultContextValue);

export const ServicesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await furrService.fetchServices();

      setServices(response!['hydra:member']);
    } catch (error) {
      console.error('Failed to fetch services:', error);
      setError('Failed to fetch services.');
      toast({
        title: 'Error',
        description: 'Failed to fetch services.',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };
  const createService = async (serviceDetails: any) => {
    setLoading(true);
    try {
      await furrService.createService(serviceDetails);
      toast({
        title: 'Service created successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      await fetchServices();
    } catch (error) {
      console.error('Failed to create service:', error);
      setError('Failed to create service.');
      toast({
        title: 'Error',
        description: 'Failed to create service.',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };
  const updateService = async (id: string, serviceDetails: any) => {
    setLoading(true);
    try {
      await furrService.updateService(id, serviceDetails);
      toast({
        title: 'Service updated successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      await fetchServices();
    } catch (error) {
      console.error('Failed to update service:', error);
      setError('Failed to update service.');
      toast({
        title: 'Error',
        description: 'Failed to update service.',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };
  const deleteService = async (id: string) => {
    setLoading(true);
    try {
      await furrService.deleteService(id);
      toast({
        title: 'Service deleted successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      await fetchServices();
    } catch (error) {
      console.error('Failed to delete service:', error);
      setError('Failed to delete service.');
      toast({
        title: 'Error',
        description: 'Failed to delete service.',
        status: 'error',
      });
    }
  };

  const value = useMemo(
    () => ({
      services,
      loading,
      error,
      fetchServices,
      createService,
      updateService,
      deleteService,
    }),
    [services, loading, error]
  );

  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
};
