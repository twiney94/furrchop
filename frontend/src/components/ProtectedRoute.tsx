import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};

export const UnloggedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (user) {
    // user is authenticated
    return <Navigate to="/" />;
  }
  return children;
};

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin }: { isAdmin: boolean } = useAuth();
  if (!isAdmin) {
    // user is not an admin
    return <Navigate to="/" />;
  }
  return children;
};
