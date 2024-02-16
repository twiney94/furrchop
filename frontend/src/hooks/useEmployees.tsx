import { createContext, useContext, useMemo, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import * as employeeService from '../services/employee';

interface EmployeesContextType {
  employees: any[];
  loading: boolean;
  error: string | null;
  fetchEmployees: () => Promise<void>;
  createEmployee: (employeeDetails: any) => Promise<void>;
  updateEmployee: (id: string, employeeDetails: any) => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;
}

const defaultContextValue: EmployeesContextType = {
  employees: [],
  loading: false,
  error: null,
  fetchEmployees: async () => {},
  createEmployee: async () => {},
  updateEmployee: async () => {},
  deleteEmployee: async () => {},
};

const EmployeesContext =
  createContext<EmployeesContextType>(defaultContextValue);

export const EmployeesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await employeeService.fetchEmployees();

      setEmployees(response!['hydra:member']);
    } catch (error) {
      console.error('Failed to fetch employees:', error);
      setError('Failed to fetch employees.');
      toast({
        title: 'Error',
        description: 'Failed to fetch employees.',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };
  const createEmployee = async (employeeDetails: any) => {
    setLoading(true);
    try {
      await employeeService.createEmployee(employeeDetails);
      toast({
        title: 'Success',
        description: 'Employee created successfully.',
        status: 'success',
      });
      fetchEmployees();
    } catch (error) {
      console.error('Failed to create employee:', error);
      setError('Failed to create employee.');
      toast({
        title: 'Error',
        description: 'Failed to create employee.',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };
  const updateEmployee = async (id: string, employeeDetails: any) => {
    setLoading(true);
    try {
      await employeeService.updateEmployee(id, employeeDetails);
      toast({
        title: 'Success',
        description: 'Employee updated successfully.',
        status: 'success',
      });
      fetchEmployees();
    } catch (error) {
      console.error('Failed to update employee:', error);
      setError('Failed to update employee.');
      toast({
        title: 'Error',
        description: 'Failed to update employee.',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };
  const deleteEmployee = async (id: string) => {
    setLoading(true);
    try {
      await employeeService.deleteEmployee(id);
      toast({
        title: 'Success',
        description: 'Employee deleted successfully.',
        status: 'success',
      });
      fetchEmployees(); // Refresh the list
    } catch (error) {
      console.error('Failed to delete employee:', error);
      setError('Failed to delete employee.');
      toast({
        title: 'Error',
        description: 'Failed to delete employee.',
        status: 'error',
      });
    }
  };

  const value = useMemo(() => {
    return {
      employees,
      loading,
      error,
      fetchEmployees,
      createEmployee,
      updateEmployee,
      deleteEmployee,
    };
  }, [employees, loading, error]);

  return (
    <EmployeesContext.Provider value={value}>
      {children}
    </EmployeesContext.Provider>
  );
};

export const useEmployees = () => {
  const context = useContext(EmployeesContext);
  if (!context) {
    throw new Error('useEmployees must be used within a EmployeesProvider');
  }
  return context;
};
