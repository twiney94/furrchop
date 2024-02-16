import { createContext, useContext, useMemo, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import * as userService from '../services/user';
import { User } from '../types/user';

interface UsersContextType {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  createUser: (userDetails: any) => Promise<void>;
  updateUser: (id: string, userDetails: any) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

const defaultContextValue: UsersContextType = {
  users: [],
  loading: false,
  error: null,
  fetchUsers: async () => {},
  createUser: async () => {},
  updateUser: async () => {},
  deleteUser: async () => {},
};

const UsersContext = createContext<UsersContextType>(defaultContextValue);

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await userService.fetchUsers();
      // console.log(response);us
      setUsers(response); // Add type assertion to ensure response is not undefined
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setError('Failed to fetch users.');
      toast({
        title: 'Error',
        description: 'Failed to fetch users.',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userDetails: any) => {
    setLoading(true);
    try {
      await userService.createUser(userDetails);
      toast({
        title: 'Success',
        description: 'User created successfully.',
        status: 'success',
      });
      fetchUsers(); // Refresh the list
    } catch (error) {
      setError('Failed to create user.');
      toast({
        title: 'Error',
        description: 'Failed to create user.',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: string, userDetails: any) => {
    setLoading(true);
    try {
      await userService.updateUser(id, userDetails);
      toast({
        title: 'Success',
        description: 'User updated successfully.',
        status: 'success',
      });
    } catch (error) {
      setError('Failed to update user.');
      toast({
        title: 'Error',
        description: 'Failed to update user.',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    setLoading(true);
    try {
      await userService.deleteUser(id);
      toast({
        title: 'Success',
        description: 'User deleted successfully.',
        status: 'success',
      });
      fetchUsers();
    } catch (error) {
      setError('Failed to delete user.');
      toast({
        title: 'Error',
        description: 'Failed to delete user.',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      users,
      loading,
      error,
      fetchUsers,
      createUser,
      updateUser,
      deleteUser,
    }),
    [users, loading, error]
  );

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};

export const useUsers = (): UsersContextType => {
  return useContext(UsersContext);
};
