import { createContext, useContext, useMemo, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { httpCall } from '../services/http';

interface KPIContextType {
  kpiData: unknown;
  shopKpiData: unknown;
  bookingKpiData: unknown;
  loading: boolean;
  error: string | null;
  fetchUserKPIs: () => Promise<void>;
  fetchBookingKPIs: () => Promise<void>;
  fetchShopsKPIs: () => Promise<void>;
  fetchEmployeesKPIs: () => Promise<void>;
}

const defaultContextValue: KPIContextType = {
  kpiData: {},
  shopKpiData: {},
  bookingKpiData: {},
  loading: false,
  error: null,
  fetchUserKPIs: async () => {},
  fetchBookingKPIs: async () => {},
  fetchShopsKPIs: async () => {},
  fetchEmployeesKPIs: async () => {},
};

const KPIContext = createContext<KPIContextType>(defaultContextValue);

export const KPIProvider = ({ children }: { children: React.ReactNode }) => {
  const [kpiData, setKpiData] = useState<any>({});
  const [shopKpiData, setShopKpiData] = useState<any>({});
  const [bookingKpiData, setBookingKpiData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const fetchUserKPIs = async () => {
    setLoading(true);
    try {
      const response = await httpCall('GET', '/user-kpis', {});
      if (response.data) {
        const mockData = {
          totalUsers: response.data.total,
          activeUsers: response.data.active,
          inactiveUsers: response.data.inactive,
          activeChange: 5,
          inactiveChange: 2,
        };
        setKpiData(mockData);
      }
    } catch (error) {
      console.error('Failed to fetch user KPIs:', error);
      setError('Failed to fetch user KPIs.');
      toast({
        title: 'Error',
        description: 'Failed to fetch user KPIs.',
        status: 'error',
      });
    }
    setLoading(false);
  };

  const fetchBookingKPIs = async () => {
    setLoading(true);
    try {
      const response = await httpCall('GET', 'booking-kpis', {});

      if (response.data) {
        const mockData = {
          totalBookings: response.data.total,
          todayBookings: response.data.today,
          yesterdayBookings: response.data.yesterday,
          weeklyBookings: response.data.last_week,
          monthlyBookings: response.data.last_month,
          dailyChange: 5,
          yersterdayChange: 2,
          weeklyChange: -2,
          monthlyChange: 10,
        };
        setBookingKpiData(mockData);
      }
    } catch (error) {
      console.error('Failed to fetch booking KPIs:', error);
      setError('Failed to fetch booking KPIs.');
      toast({
        title: 'Error',
        description: 'Failed to fetch booking KPIs.',
        status: 'error',
      });
    }
    setLoading(false);
  };

  const fetchShopsKPIs = async () => {
    setLoading(true);
    try {
      const response = await httpCall('GET', 'shop-kpis', {});

      if (response.data) {
        const mockData = {
          totalShops: response.data.total_shops,
          newShop: response.data.new_shops,
          activeShops: response.data.hot_shops,
          inactiveShops: response.data.cold_shops,
          activeChange: 2,
        };
        setShopKpiData(mockData);
      }
    } catch (error) {
      console.error('Failed to fetch shop KPIs:', error);
      setError('Failed to fetch shop KPIs.');
      toast({
        title: 'Error',
        description: 'Failed to fetch shop KPIs.',
        status: 'error',
      });
    }
    setLoading(false);
  };

  const fetchEmployeesKPIs = async () => {
    setLoading(true);
    try {
      // Simulate fetching data
      const response = await httpCall('GET', '/employee-kpis', {});

      if (response.data) {
        const mockData = {
          totalEmployees: response.data.total,
          todayEmployees: response.data.today,
          yesterdayEmployees: response.data.yesterday,
          weeklyEmployees: response.data.last_week,
          monthlyEmployees: response.data.last_month,
          dailyChange: 5,
          yersterdayChange: 2,
          weeklyChange: -2,
          monthlyChange: 10,
        };
        setKpiData(mockData);
      }
    } catch (error) {
      console.error('Failed to fetch employee KPIs:', error);
      setError('Failed to fetch employee KPIs.');
      toast({
        title: 'Error',
        description: 'Failed to fetch employee KPIs.',
        status: 'error',
      });
    }
    setLoading(false);
  };

  const value = useMemo(
    () => ({
      kpiData,
      shopKpiData,
      bookingKpiData,
      loading,
      error,
      fetchUserKPIs,
      fetchBookingKPIs,
      fetchShopsKPIs,
      fetchEmployeesKPIs,
    }),
    [kpiData, shopKpiData, bookingKpiData, loading, error]
  );

  return <KPIContext.Provider value={value}>{children}</KPIContext.Provider>;
};

export const useKPI = () => {
  const context = useContext(KPIContext);
  if (!context) {
    throw new Error('useKPI must be used within KPIProvider');
  }
  return context;
};
