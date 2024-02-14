import { createContext, useContext, useMemo, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import * as shopService from '../services/shop';

interface ShopsContextType {
  shops: any[];
  loading: boolean;
  error: string | null;
  fetchShops: () => Promise<void>;
  createShop: (shopDetails: any) => Promise<void>;
  updateShop: (id: string, shopDetails: any) => Promise<void>;
  deleteShop: (id: string) => Promise<void>;
}

const defaultContextValue: ShopsContextType = {
  shops: [],
  loading: false,
  error: null,
  fetchShops: async () => {},
  createShop: async () => {},
  updateShop: async () => {},
  deleteShop: async () => {},
};

const ShopsContext = createContext<ShopsContextType>(defaultContextValue);

export const ShopsProvider = ({ children }: { children: React.ReactNode }) => {
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const fetchShops = async () => {
    setLoading(true);
    try {
      const response = await shopService.fetchShops();
      console.log('response', response);

      setShops(response!['hydra:member']);
    } catch (error) {
      console.error('Failed to fetch shops:', error);
      setError('Failed to fetch shops.');
      toast({
        title: 'Error',
        description: 'Failed to fetch shops.',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };
  const createShop = async (shopDetails: any) => {
    setLoading(true);
    try {
      await shopService.createShop(shopDetails);
      toast({
        title: 'Success',
        description: 'Shop created successfully.',
        status: 'success',
      });
      fetchShops(); // Refresh the list
    } catch (error) {
      console.error('Failed to create shop:', error);
      setError('Failed to create shop.');
      toast({
        title: 'Error',
        description: 'Failed to create shop.',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };
  const updateShop = async (id: string, shopDetails: any) => {
    setLoading(true);
    try {
      await shopService.updateShop(id, shopDetails);
      toast({
        title: 'Success',
        description: 'Shop updated successfully.',
        status: 'success',
      });
      fetchShops(); // Refresh the list
    } catch (error) {
      console.error('Failed to update shop:', error);
      setError('Failed to update shop.');
      toast({
        title: 'Error',
        description: 'Failed to update shop.',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };
  const deleteShop = async (id: string) => {
    setLoading(true);
    try {
      await shopService.deleteShop(id);
      toast({
        title: 'Success',
        description: 'Shop deleted successfully.',
        status: 'success',
      });
      fetchShops(); // Refresh the list
    } catch (error) {
      console.error('Failed to delete shop:', error);
      setError('Failed to delete shop.');
      toast({
        title: 'Error',
        description: 'Failed to delete shop.',
        status: 'error',
      });
    }
  };

  const contextValue = useMemo(() => {
    return {
      shops,
      loading,
      error,
      fetchShops,
      createShop,
      updateShop,
      deleteShop,
    };
  }, [shops, loading, error]);

  return (
    <ShopsContext.Provider value={contextValue}>
      {children}
    </ShopsContext.Provider>
  );
};

export const useShops = () => {
  const context = useContext(ShopsContext);
  if (!context) {
    throw new Error('useShops must be used within a ShopsProvider');
  }
  return context;
};
