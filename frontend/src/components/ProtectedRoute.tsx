import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user }: any = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};

export const UnloggedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user }: any = useAuth();
  if (user) {
    // user is authenticated
    return <Navigate to="/" />;
  }
  return children;
};
