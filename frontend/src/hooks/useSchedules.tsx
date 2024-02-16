import { createContext, useContext, useMemo, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import * as scheduleService from '../services/schedule';

interface SchedulesContextType {
  schedules: any[];
  loading: boolean;
  error: string | null;
  fetchSchedules: () => Promise<void>;
  createSchedule: (scheduleDetails: any) => Promise<void>;
  updateSchedule: (id: string, scheduleDetails: any) => Promise<void>;
  deleteSchedule: (id: string) => Promise<void>;
}

const defaultContextValue: SchedulesContextType = {
  schedules: [],
  loading: false,
  error: null,
  fetchSchedules: async () => {},
  createSchedule: async () => {},
  updateSchedule: async () => {},
  deleteSchedule: async () => {},
};

const SchedulesContext =
  createContext<SchedulesContextType>(defaultContextValue);

export const SchedulesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const response = await scheduleService.fetchSchedules();

      setSchedules(response!['hydra:member']);
    } catch (error) {
      console.error('Failed to fetch schedules:', error);
      setError('Failed to fetch schedules.');
      toast({
        title: 'Error',
        description: 'Failed to fetch schedules.',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };
  const createSchedule = async (scheduleDetails: any) => {
    setLoading(true);
    try {
      await scheduleService.createSchedule(scheduleDetails);
      toast({
        title: 'Schedule created successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      fetchSchedules();
    } catch (error) {
      console.error('Failed to create schedule:', error);
      setError('Failed to create schedule.');
      toast({
        title: 'Error',
        description: 'Failed to create schedule.',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };
  const updateSchedule = async (id: string, scheduleDetails: any) => {
    setLoading(true);
    try {
      await scheduleService.updateSchedule(id, scheduleDetails);
      toast({
        title: 'Schedule updated successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      fetchSchedules();
    } catch (error) {
      console.error('Failed to update schedule:', error);
      setError('Failed to update schedule.');
      toast({
        title: 'Error',
        description: 'Failed to update schedule.',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };
  const deleteSchedule = async (id: string) => {
    setLoading(true);
    try {
      await scheduleService.deleteSchedule(id);
      toast({
        title: 'Schedule deleted successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      fetchSchedules();
    } catch (error) {
      console.error('Failed to delete schedule:', error);
      setError('Failed to delete schedule.');
      toast({
        title: 'Error',
        description: 'Failed to delete schedule.',
        status: 'error',
      });
    }
  };

  const value = useMemo(
    () => ({
      schedules,
      loading,
      error,
      fetchSchedules,
      createSchedule,
      updateSchedule,
      deleteSchedule,
    }),
    [schedules, loading, error]
  );

  return (
    <SchedulesContext.Provider value={value}>
      {children}
    </SchedulesContext.Provider>
  );
};

export const useSchedules = () => {
  const context = useContext(SchedulesContext);
  if (!context) {
    throw new Error('useSchedules must be used within a SchedulesProvider');
  }
  return context;
};
