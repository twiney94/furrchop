import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';
import {
  authenticate,
  activateAccount as serviceActivateAccount,
  register as serviceRegister,
} from '../services/auth';
import { useToast } from '@chakra-ui/react';
import { jwtDecode } from 'jwt-decode';

interface Children {
  children: React.ReactNode;
}

interface ToastOptions {
  title: string;
  description?: string;
  status: 'info' | 'warning' | 'success' | 'error';
  duration?: number;
  isClosable?: boolean;
}

interface User {
  token: string;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  userFullData: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userDetails: {
    email: string;
    password: string;
    [key: string]: unknown;
  }) => Promise<void>;
  activateAccount: () => Promise<void>;
  loading: boolean;
  showToast: (options: ToastOptions) => void;
  userRole?: () => Array<string> | null;
  userId?: () => string | null;
}

const defaultContextValue: AuthContextType = {
  user: null,
  userFullData: null,
  isAdmin: false,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  loading: false,
  activateAccount: async () => {},
  showToast: () => {},
  userRole: () => null,
  userId: () => null,
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);

export const AuthProvider = ({ children }: Children) => {
  const [user, setUser] = useLocalStorage('user', null);
  const [userFullData, setUserFullData] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<any>(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (user && user.token) {
      try {
        const decodedToken: { roles?: string[] } = jwtDecode(user.token);
        const isAdminFlag =
          decodedToken.roles && decodedToken.roles.includes('ROLE_ADMIN');
        const userFullData = {
          ...decodedToken,
        };
        setUserFullData(userFullData);
        setIsAdmin(isAdminFlag);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userData = await authenticate(email, password);

      setUser(userData);
      navigate('/profile');
      showToast({
        title: 'Logged in successfully',
        status: 'success',
      });
    } catch (error) {
      console.error(error);
      showToast({
        title: 'Login failed',
        description: 'Check your credentials and try again.',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/', { replace: true });
  };

  const userId = () => {
    const jwt = user?.token;
    if (!jwt) return null;

    const payload = jwt.split('.')[1];
    const decodedPayload = atob(payload);
    const parsedPayload = JSON.parse(decodedPayload);
    return parsedPayload.username;
  };

  const userRole = () => {
    const jwt = user?.token;
    if (!jwt) return null;

    const payload = jwt.split('.')[1];
    const decodedPayload = atob(payload);
    const parsedPayload = JSON.parse(decodedPayload);
    return parsedPayload.roles;
  };

  const register = async (userDetails: {
    email: string;
    password: string;
    [key: string]: any;
  }) => {
    setLoading(true);
    try {
      await serviceRegister(userDetails);
      showToast({
        title: 'Registration Successful',
        description:
          'Your account has been created, check your email to validate the account.',
        status: 'success',
      });
      navigate('/login');
    } catch (error) {
      showToast({
        title: 'Registration Failed',
        description:
          (error as Error).message ||
          'An unexpected error occurred during registration.',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const activateAccount = async () => {
    setLoading(true);
    try {
      await serviceActivateAccount();
      showToast({
        title: 'Account Activated',
        description:
          'Your account has been successfully activated! Log in to continue.',
        status: 'success',
      });
      navigate('/login');
    } catch (error) {
      console.error(error);
      showToast({
        title: 'Activation Failed',
        description:
          (error as Error).message ||
          'An error occurred during account activation.',
        status: 'error',
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (options: ToastOptions) => {
    toast({
      position: 'top',
      ...options,
    });
  };

  const value = useMemo(
    () => ({
      user,
      isAdmin,
      userFullData,
      login,
      logout,
      register,
      activateAccount,
      loading,
      showToast,
      userRole,
      userId,
    }),
    [user, userFullData, isAdmin, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
